import { Body, Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { PostService } from '../services/post.service';

@Controller('post')
export class PostController {

  constructor(
    private postService: PostService
  ) {
  }

  @Post('uploadPost')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'images', maxCount: 10 },
  ]))
  async uploadPost(@UploadedFiles() files: Express.Multer.File[], @Body() body){
      // console.log(files, body.content)
    console.log(files["images"])
    console.log("-------------------")
    await this.postService.uploadImage(files["images"])
  }
}
