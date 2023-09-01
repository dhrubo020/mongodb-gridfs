import { Request, Response } from "express";
import { MongoS3Client } from "../gfs";
const { MONGO_URI, BUCKET_NAME } = process.env;

const uri = MONGO_URI || "mongodb://127.0.0.1:27017";
const bucketName = BUCKET_NAME || "myBucket";

const client = new MongoS3Client(uri, bucketName);
client.connect();

export async function upToBucket(req: Request, res: Response) {
	const uploaded = await client.upload({
		body: req.file.buffer,
		key: `product-${Date.now()}-${req.file.originalname
			.trim()
			.replace(" ", "-")}`,
		contentType: req.file.mimetype,
	});
	const url = `${req.protocol}://${req.headers.host}${req.baseUrl}/${uploaded.key}`;
	res.json({ url, key: uploaded.key });
}

export async function retriveFile(req: Request, res: Response) {
	const key = req.params.key;
	return await client.getFile(key, res);
}
