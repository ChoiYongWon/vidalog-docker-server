import { Injectable } from '@nestjs/common';
import { S3Service } from '../../s3/services/s3.service';

@Injectable()
export class PostService {
  constructor(
    private s3Service: S3Service
  ) {}

  async uploadImage(files: any[]){
    await this.s3Service.uploadImageToS3(files)
  }

}
