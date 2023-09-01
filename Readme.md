# mongo-s3-client : Simple Storage Service for Mongodb

> The mongo-s3-client offers a seamless solution for uploading and retrieving files from MongoDB, facilitating effortless integration of file storage with your MongoDB databases. This package streamlines the process of storing and retrieving files, granting developers the flexibility to efficiently manage their data within Node.js applications.

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

Your file url will be like `protocol://host/<baseUrl>/key` or `http://localhost:3000/<api>/my-file-key-name`;
baseUrl is optional.

### Retrive file with key

Your requested file will be directly attached with the response.
To retrive a file you have to privide file key and the request object in getFile() method.
A proper example of retriving file:

```sh
async function retriveFile(req: Request, res: Response) {
	const key = req.params.key;
	return await client.getFile(key, res);
}
```

## Authors

-   **Dhrubo** - [Dhrubo](https://github.com/dhrubo020)

## License

[MIT License]
