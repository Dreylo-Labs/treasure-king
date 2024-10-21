
const fs = require('fs');
const S3 = require('aws-sdk/clients/s3');
require('dotenv').config();

const accessKeyId = process.env.AWS_ID;
const secretAccessKey = process.env.AWS_SECRET;

const s3 = new S3({
    accessKeyId,
    secretAccessKey,
});


async function uploadFile(file) {

    if (!file) {
        throw new Error('No file provided.');
    }

    const fileStream = fs.createReadStream(file.path);

    const uploadParams = {
        Bucket: process.env.Bucket,
        Body: fileStream,
        Key: file.filename,
    };

    try {
        const result = await s3.upload(uploadParams).promise();
        console.log('File uploaded successfully:', result);
        return result;
    } catch (error) {
        console.error('Error uploading file to S3:', error);
        throw new Error('Failed to upload file to S3');
    } finally {
        fileStream.close();
    }
}

exports.uploadFile = uploadFile;



