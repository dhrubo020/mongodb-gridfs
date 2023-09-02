# mongo-s3-client : Simple Storage Service for Mongodb

Storing file data directly in MongoDB as a Buffer, which contains raw binary data, presents challenges when it comes to displaying that data in HTML tags. To display binary data, such as images or other files, in HTML tags, you typically need to convert it into a format that HTML can render, such as Base64 encoding, or serve the file from a URL. This conversion or serving process is essential to ensure compatibility with HTML rendering.

In many scenarios, when considering file storage solutions, cloud buckets and third-party services are common choices. However, these services may not be accessible to everyone and often come with associated costs. The mongo-s3-client package was developed to tackle this complexity without incurring additional expenses, making it particularly valuable for local development and projects with budget constraints.

The mongo-s3-client package provides a seamless solution for both uploading and retrieving files from MongoDB by leveraging MongoDB's GridFS feature. This package streamlines the process of storing and retrieving files, enhancing accessibility for developers aiming to efficiently manage their data within Node.js applications. Through the use of GridFS, it offers a robust mechanism for handling files within MongoDB, enabling developers to seamlessly integrate file storage into their projects. This integration empowers them to harness the capabilities of both MongoDB and cloud storage services like Amazon S3, all while staying cost-effective.

## Prerequisites

This project requires NodeJS (version 16.20.1 or later), NPM, Express and Mongodb

## Getting Started

## Installation

**BEFORE YOU INSTALL:** please read the [prerequisites](#prerequisites)

To install the package, run:

```sh
$ npm install mongo-s3-client
```

Or if you prefer using Yarn:

```sh
$ yarn add mongo-s3-client
```

## Usage

### Initializing the MongoS3Client the and connect with mongodb

```sh
  const uri = MONGO_URI || "mongodb://127.0.0.1:27017";
  const bucketName = BUCKET_NAME || "myBucket";

  const client = new MongoS3Client(uri, bucketName);
  client.connect();
```

### Upload file to mongodb

Example code for uploading a file

```sh
const params = {
	body: req.file.buffer, // file Buffer
	key: `my-file-key-name`, // unique file key
	contentType: req.file.mimetype, // content-type
}
const uploaded = await client.upload(params);
// console.log(uploaded)
// { key: `file-key-name` }
```

Your file url will be like `protocol://host/<baseUrl>/key` or `http://localhost:3000/<baseUrl>/my-file-key-name`
baseUrl is optional.

### Retrive file with key

Retrieving a file using the getFile() method in the mongo-s3-client package typically involves providing the file key or identifier and the request object. Below is a proper example of how to retrieve a file using this method:

```sh
async function retriveFile(req: Request, res: Response) {
	const key = req.params.key;
	return await client.getFile(key, res);
}
```
## Working example
https://github.com/dhrubo020/mongo-s3-client-example

## Authors

-   **Dhrubo** - [Dhrubo](https://github.com/dhrubo020)
