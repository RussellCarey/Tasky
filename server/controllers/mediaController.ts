import { Response, Request, NextFunction } from "express";
import { S3DataType } from "aws-sdk/clients/sagemaker";
import { IReqWithBody } from "../types/types";

const DatabaseServices = require("../services/databaseServices");

const catchAsync = require("../utils/catchAsync");
const AWS = require("aws-sdk");
const multer = require("multer");
const AppError = require("../utils/AppError");
const storage = multer.memoryStorage();
const { v4: uuidv4 } = require("uuid");

const s3Client = new AWS.S3({
  endpoint: process.env.SPACES_ENDPOINT,
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
  ACL: "public-read",
});

let uploadParams = {
  Bucket: process.env.SPACES_BUCKET,
  Key: "",
  Body: "",
  ACL: "public-read",
};

exports.uploadAll = multer({ storage: storage }).fields([{ name: "image", maxCount: 1 }]);

exports.uploadImage = catchAsync(async (req: IReqWithBody, res: Response, next: NextFunction) => {
  // Create image random name and set params for image upload..
  const imageName = `${uuidv4()}.png`;
  uploadParams.Key = imageName;
  uploadParams.Body = req.files.image[0].buffer;

  await s3Client.upload(uploadParams, (err: Error, data: any) => {
    if (err) {
      throw new AppError("Error uploading image file", 500);
    }

    // Client needs the data URLs and the image name to continue with the next step.
    res.json({
      status: "success",
      data: {
        url: data.Location,
        name: imageName,
      },
    });
  });
});

exports.deleteFileFromSpace = catchAsync(async (id: string) => {
  // Get job from the DB so we can get its info..
  const jobToDelete = await DatabaseServices.getOneJob(id);
  if (jobToDelete.rows.length === 0) return;

  // Get the image name from the data
  const imageName = jobToDelete.rows[0].image_name;

  // Delete that image.
  var params = { Bucket: "droppyspace", Key: imageName };
  s3Client.deleteObject(params, (err: Error, data: S3DataType) => {
    if (err) {
      console.log(err, err.stack);
      throw new Error();
    }
  });
});
