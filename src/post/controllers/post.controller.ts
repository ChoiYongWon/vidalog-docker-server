import { Body, Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Public } from '../../lib/decorators/public';

@Controller('post')
export class PostController {

  @Post('uploadPost')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'images', maxCount: 5 },
  ]))
  uploadPost(@UploadedFiles() files: Express.Multer.File[], @Body() body){
      console.log(files, body.content)
  }
}
