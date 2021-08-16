import { Injectable } from '@nestjs/common';
import * as AWS from "aws-sdk"
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class S3Service {

  private s3: any;

  constructor() {
    this.s3 = new AWS.S3({
      accessKeyId: "AKIA6GY7IZ7BRC3PTZP2",
      secretAccessKey: "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",
      region: "ap-northeast-2"
    })

  }

  async uploadImageToS3(files: any[]): Promise<string[]>{
    const imageUrl = {};
    for(let i in files){
      let params = {
        Bucket: "vidalog-img-storage/postImage",
        ACL: "public-read",
        Body: Buffer.from(files[i].buffer, "binary"),
        Key: `${uuidv4()}.${files[i].originalname.split(".").reverse()[0]}`,
      }
      const url = await this.s3.upload(params).promise()
      imageUrl[i] = url.Location
    }
    return Object.values(imageUrl)
  }
}
