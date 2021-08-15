import { Body, Controller, Post, UploadedFiles, UseInterceptors, Request, Get, Query } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { PostService } from '../services/post.service';
import { UploadBadRequestException } from '../exceptions/UploadBadRequest.exception';
import { UploadPostRequestDto } from '../dtos/request/UploadPostRequest.dto';
import { GetPostByMonthResponseDto } from '../dtos/response/GetPostByMonthResponse.dto';
import { GetPostResponseDto } from '../dtos/response/GetPostResponse.dto';

@Controller('post')
export class PostController {

  constructor(
    private postService: PostService
  ) {
  }

  @Get('getPost')
  async getPost(@Request() req, @Query("date") date: Date): Promise<GetPostResponseDto>{
    return await this.postService.getPost(req.user.id, date)
  }

  @Get('getPostByMonth')
  async getPostByMonth(@Request() req, @Query("date") date: Date) : Promise<GetPostByMonthResponseDto[]>{
    return await this.postService.getPostByMonth(req.user.id, date)
  }

  @Post('uploadPost')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'images', maxCount: 10 },
  ]))
  async uploadPost(@UploadedFiles() files: Express.Multer.File[], @Body() body, @Request() req) {
    // console.log(files, body.content)
    //TODO multiform/data DTO 작성
    if (!files["images"] || !body.content) throw new UploadBadRequestException()
    const uploadPostDto: UploadPostRequestDto = {
      imageFiles: files["images"],
      userId: req.user.id,
      date: body.date,
      content: body.content,
    }
    await this.postService.uploadPost(uploadPostDto)
    return
  }
}
