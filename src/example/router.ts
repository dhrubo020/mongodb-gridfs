import express from "express";
import multer from "multer";
import { retriveFile, upToBucket } from "./service.js";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/upload/v2", upload.single("file"), upToBucket);
router.get("/:key", retriveFile);

export { router };
