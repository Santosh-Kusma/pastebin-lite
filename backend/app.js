import express from "express";
import cors from "cors";

import { router as apiRouter } from "./src/routes/api.routes.js";
import { router as webRouter } from "./src/routes/web.routes.js";
import { errorHandler } from "./src/middlewares/errorHandler.js";
import { NotFound } from "./src/core/apiError.js";

export const app = express();

app.set("trust proxy", true);

app.use(cors());
app.use(express.json());

app.use("/api", apiRouter);
app.use("/", webRouter);

app.use((req, res) => {
  throw new NotFound("You are in wrong path");
});

app.use(errorHandler);
