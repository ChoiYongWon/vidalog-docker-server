import { Injectable } from '@nestjs/common';
import * as AWS from "aws-sdk"

@Injectable()
export class S3Service {

  private s3: any;

  constructor() {
    this.s3 = new AWS.S3({
      accessKeyId: "AKIA6GY7IZ7BRC3PTZP2",
      secretAccessKey: "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"
    })

  }

  async uploadImageToS3(files: any[]){
    files.forEach((file)=>{
      let params = {
        Bucket: "vidalog-img-storage/postImage",
        ACL: "public-read",
        Body: Buffer.from(file.buffer, "binary"),
        Key: Date.now().toString()+"-"+file.originalname,
      }
      this.s3.upload(params, (err, data)=>{
        if(err) console.log(err)
        console.log(data.Location)
      })
    })
  }

}
