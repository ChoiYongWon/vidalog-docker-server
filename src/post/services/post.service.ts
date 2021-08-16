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

  //달별로 조회
  async getPostByMonth(userId: string, date:Date){
    const nextDate = new Date(date)
    //한달 뒤로 날짜 설정
    nextDate.setMonth(nextDate.getMonth() + 1); nextDate.setDate(nextDate.getDate() - 1)
    const res = await this.postRepository.find({ user: userId, date: Between(date, nextDate) })
    if(!res) throw new PostNotFoundException()
    const result = res.map((data)=>({ date: data.date.toLocaleDateString().split("/").join("-"), imgUrl: data.imageUrls[0] }))
    return result
  }

  //일별로 조회
  async getPost(userId:string, date:Date){
    const result = await this.postRepository.findOne({ user: userId, date: date })
    if(!result) throw new PostNotFoundException()
    return {content: result.content, date: result.date.toLocaleDateString().split("/").join("-"),location:result.location, imageUrls: result.imageUrls}
  }

  //일기 업로드
  async uploadPost(postInfo: UploadPostRequestDto){
    try{
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
