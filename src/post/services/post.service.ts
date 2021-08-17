import { Injectable } from '@nestjs/common';
import { S3Service } from '../../s3/services/s3.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../repositories/post.entity';
import { Between, Repository } from 'typeorm';
import { UploadPostRequestDto } from '../dtos/request/UploadPostRequest.dto';
import { v4 as uuidv4 } from 'uuid';
import { UploadFailedException } from '../exceptions/UploadFailed.exception';
import { PostNotFoundException } from '../exceptions/PostNotFound.exception';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    private s3Service: S3Service

  ) {}

  async isWritten(userId: string, date:Date){
    const result = await this.postRepository.findOne({ user: userId, date: date })
    if(result) return { written : true}
    return { written : false }
  }

  //달별로 조회
  async getPostByMonth(userId: string, date:Date){
    const nextDate = new Date(date)
    //한달 뒤로 날짜 설정
    nextDate.setMonth(nextDate.getMonth() + 1); nextDate.setDate(nextDate.getDate() - 1)
    const res = await this.postRepository.find({ user: userId, date: Between(date, nextDate) })
    if(!res) throw new PostNotFoundException()
    const result = res.map((data)=>{
      const date = data.date.toLocaleDateString().split("/")
      return { date: `${date[2]}-${date[0]}-${date[1]}`, imgUrl: data.imageUrls[0] }
    })
    return result
  }

  //일별로 조회
  async getPost(userId:string, date:Date){
    const result = await this.postRepository.findOne({ user: userId, date: date })
    if(!result) throw new PostNotFoundException()
    const dateFilter = result.date.toLocaleDateString().split("/")
    return {content: result.content, date: `${dateFilter[2]}-${dateFilter[0]}-${dateFilter[1]}`,location:result.location, imageUrls: result.imageUrls}
  }

  async getPostedDateByYearFromNow(userId:string){
    const prevDate = new Date()
    const currentDate = new Date()
    //일년 뒤로 날짜 설정
    prevDate.setFullYear(prevDate.getFullYear() - 1); prevDate.setDate(prevDate.getDate() - currentDate.getDay()); //371을 맞추기 위해
    const res = await this.postRepository.find({ user: userId, date: Between(prevDate, currentDate) })
    return {
      postedDate: res.map((data)=>{
        const date = data.date.toLocaleDateString().split("/")
        return `${date[2]}-${date[0]}-${date[1]}`
      })
    }
  }

  //일기 업로드
  async uploadPost(postInfo: UploadPostRequestDto){
    try{
      const currentDate = new Date()
      if(new Date(postInfo.date) > currentDate) throw Error()
      const localPost = await this.postRepository.findOne({ user: postInfo.userId, date: postInfo.date})
      if(localPost) throw Error()
      const imageUrls = await this.s3Service.uploadImageToS3(postInfo.imageFiles)
      const post: Post = {
        imageUrls: imageUrls,
        content: postInfo.content,
        date: postInfo.date,
        location: postInfo.location,
        id: uuidv4(),
        user: postInfo.userId
      }
      await this.postRepository.save(post)
    }catch(e){
      throw new UploadFailedException()
    }

  }

}
