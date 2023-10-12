import express from "express";
import "dotenv/config";
import fs from "fs";
import YAML from "yaml";
import swaggerUi from "swagger-ui-express";
import router from "./routes/v1/index.js";
import { errorHandler, notFoundHandler } from "./middlewares/index.js";
import cors from "cors";

const app = new express();
const { PORT } = process.env;

app.use(cors());
app.use(express.json());

app.use("/api/v1", router);

const file = fs.readFileSync("./docs/swagger.yaml", "utf-8");
const swaggerDocument = YAML.parse(file);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Listening on port http://localhost:${PORT}`);
});
