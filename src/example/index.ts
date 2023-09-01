import express from "express";
import { router } from "./router";

const app = express();
const port = 3000;

app.use(router);

async function bootstrap() {
	try {
		app.listen(port, () => {
			console.log(`Server is running on port ${port}`);
		});
	} catch (error) {
		console.error("Error :", error);
	}
}
bootstrap();
