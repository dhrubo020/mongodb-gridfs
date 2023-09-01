import { Response } from "express";

export interface IUploadParams {
	body: Buffer;
	key: string;
	contentType: string;
}

export interface IUploadResponse {
	key: string;
}

export interface IMongoS3Client {
	connect: () => void;
	upload(params: IUploadParams): () => IUploadResponse;
	getFile(key: string, res: Response): () => Response;
}
