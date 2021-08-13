import { Injectable } from '@nestjs/common';
import { MulterModuleOptions, MulterOptionsFactory } from '@nestjs/platform-express';
import * as MulterS3 from "multer-s3"
import * as AWS from "aws-sdk"

@Injectable()
export class S3Service implements  MulterOptionsFactory{

  private s3: any;
  private FILE_LIMIT_SIZE = 3145728

  constructor() {
    this.s3 = new AWS.S3({
      accessKeyId: "AKIA6GY7IZ7BRC3PTZP2",
      secretAccessKey: "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"
    })
  }

  createMulterOptions(): Promise<MulterModuleOptions> | MulterModuleOptions {
    const bucket= "vidalog-image-storage"
    const acl = "public-read"

    const multerS3Storage = MulterS3({
      s3: this.s3,
      bucket,
      acl,
      metadata: (req, file, cb )=> {
        cb(null, {fieldName: file.fieldName})
      },
      key: (req, file, cb) => {
        cb(null, `${Date.now().toString()}-${file.originalname}`)
      }
    })

    return {
      storage: multerS3Storage,
      fileFilter: this.fileFilter,
      limits: {
        fileSize: this.FILE_LIMIT_SIZE
      }
    }
  }

  public fileFilter(req: Express.Request, file: Express.Multer.File, cb: (err: Error | null, acceptFile: boolean)=>void){
    if(file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)){
      cb(null, true)
    }else{
      cb(new Error("unsupported file"), false)
    }
  }
}
