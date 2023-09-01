import { Response } from "express";
import { IUploadParams, IUploadResponse } from "interfaces";
import { GridFSBucket, MongoClient } from "mongodb";

export class MongoS3Client {
	private uri: string;
	private bucketName: string;
	private client: MongoClient;
	private bucket: GridFSBucket;
	constructor(uri: string, bucketName: string) {
		this.uri = uri;
		this.bucketName = bucketName;
		this.client = new MongoClient(this.uri);
	}

	async connect(): Promise<void> {
		try {
			await this.client.connect();
			const db = this.client.db(this.bucketName);
			this.bucket = new GridFSBucket(db);
			console.log("Mongo S3 client connected!");
		} catch (error) {
			console.log(error.message);
			return null;
		}
	}

	/**
	 *
	 *
	 * @param {IUploadParams} params
	 * @return {*}  Promise<IUploadResponse> - {key: String}
	 * @memberof MongoFileService
	 */
	async upload(params: IUploadParams): Promise<IUploadResponse> {
		try {
			return new Promise((resolve, reject) => {
				const { body, key, contentType } = params;
				const uploadStream = this.bucket.openUploadStream(key, {
					metadata: {
						type: contentType,
					},
				});
				uploadStream.end(body);
				uploadStream.on("error", (error) => {
					console.log("Upload error:", error.message);
					reject(error);
				});
				uploadStream.on("finish", () => {
					console.log("Upload finished:", key);
					resolve({ key });
				});
			});
		} catch (error) {
			console.log(error.message);
			return null;
		}
	}

	/**
	 *
	 *
	 * @param {string} key - file key
	 * @param {Response} res - Express response
	 * @return {*}  Promise<Response> - Express response
	 * @memberof MongoFsClient
	 */
	async getFile(key: string, res: Response): Promise<Response> {
		try {
			return new Promise((resolve, reject) => {
				const downloadStream =
					this.bucket.openDownloadStreamByName(key);
				downloadStream.on("error", () => {
					reject({ error: "File not found" });
				});
				const data = downloadStream.pipe(res);
				resolve(data);
			});
		} catch (error) {
			console.log(error.message);
			return null;
		}
	}
}
