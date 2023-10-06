import express from "express";
import "dotenv/config";
import router from "./routes/v1/index.js";
// import user from "./handlers/v1/user.js";
import { errorHandler, notFoundHandler } from "./middlewares/index.js";

const app = new express();
const { PORT } = process.env;

app.use(express.json());

app.use("/api/v1", router);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Listening on port http://localhost:${PORT}`);
});
