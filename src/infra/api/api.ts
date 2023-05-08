import express from "express";
import routes from "../../routes/routes";
import errorHandler from "../../middlewares/errors/errorHandler";

const api = express();
api.use(express.json());
api.use(routes);
api.use(errorHandler);

export default api;
