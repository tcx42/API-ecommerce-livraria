import express from "express";
import routes from "../../routes/routes";
import errorHandler from "../../middlewares/errors/errorHandler";
import cookieParser from "cookie-parser";
import path from "node:path";
import cors from "cors";

const api = express();
api.use(cors({
  origin: ["http://localhost:3000", "https://bookstore-gules-xi.vercel.app", "https://bookstore-2-7fijymzsh-leonardo-tech-stack.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));
api.use(cookieParser());
api.use(express.json());
api.use(routes);
api.use("/", express.static(path.resolve("docs")));
api.use("/images", express.static(path.resolve("images")));
api.use(errorHandler);

export default api;
