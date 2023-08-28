const express = require("express");
const multer = require("multer");
const { MongoClient, ObjectId, GridFSBucket } = require("mongodb");

const app = express();
const port = 3000;

// Configure Multer
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Set up MongoDB connection
const uri = "mongodb://localhost:27017";
const dbName = "gfs";

(async function () {
	const client = new MongoClient(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});

	try {
		await client.connect();
		console.log("Connected to MongoDB");

		const db = client.db(dbName);
		const bucket = new GridFSBucket(db); // Instantiate GridFSBucket

		// Use db and bucket for your routes
		app.post(
			"/upload/:productId",
			upload.single("image"),
			async (req, res) => {
				const productId = req.params.productId;
				const imageBuffer = req.file.buffer;

				const uploadStream = bucket.openUploadStream(
					"product-image.jpg",
					{
						metadata: {
							productId: productId,
							type: "image/jpeg",
						},
					}
				);

				uploadStream.end(imageBuffer);

				uploadStream.on("finish", () => {
					res.json({ message: "Image uploaded" });
				});

				uploadStream.on("error", (error) => {
					res.status(500).json({ error: "Image upload failed" });
				});
			}
		);

		// Define a GET route to retrieve an image by productId
		app.get("/image/:productId", (req, res) => {
			const productId = req.params.productId;

			const downloadStream = bucket.openDownloadStream(
				new ObjectId("64eca938f5128b02f73a393d")
			);
			downloadStream.pipe(res);

			downloadStream.on("error", () => {
				res.status(404).json({ error: "Image not found" });
			});
		});

		// Start the server
		app.listen(port, () => {
			console.log(`Server is running on port ${port}`);
		});
	} catch (error) {
		console.error("Error connecting to MongoDB:", error);
	}
})();
