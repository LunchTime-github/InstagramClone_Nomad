import AWS from "aws-sdk";

AWS.config.update({
  credentials: {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SCREAT,
  },
});

export const uploadToS3 = async (file, userId, folderName = "uploads") => {
  const { filename, createReadStream } = await file;
  const objectName = `${folderName}/${userId}-${Date.now()}-${filename}`;
  const readStream = createReadStream();
  const { Location } = await new AWS.S3()
    .upload({
      Bucket: "clone-test-upload",
      Key: objectName,
      ACL: "public-read",
      Body: readStream,
    })
    .promise();
  return Location;
};

export const deleteInS3 = async (fileUrl) => {
  const Bucket = "clone-test-upload";
  const Key = fileUrl.replace(`https://${Bucket}.s3.amazonaws.com/`, "");
  await new AWS.S3()
    .deleteObject({
      Bucket,
      Key,
    })
    .promise();
};
