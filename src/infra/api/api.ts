import express from "express";
import routes from "../../routes/routes";
import errorHandler from "../../middlewares/errors/errorHandler";
import cookieParser from "cookie-parser";
import path from "node:path";

const api = express();
api.use(cookieParser());
api.use(express.json());
api.use(routes);
api.use("/images", express.static(path.resolve("images")));
api.use(errorHandler);

export default api;
