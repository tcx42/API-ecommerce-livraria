import express from "express";
import path from "node:path";
import Authentication from "../middlewares/authentication/authentication";
import openRoutes from "./open/open.routes";
import adminRoutes from "./admin/admin.routes";
import clientRoutes from "./client/client.routes";

const routes = express.Router();

routes.use("/", openRoutes);
routes.use("/admin", Authentication.authAdmin, adminRoutes);
routes.use("/client", Authentication.authClient, clientRoutes);
routes.use("/documentation", express.static(path.resolve("docs")));
routes.use("/images", express.static(path.resolve("images")));
routes.get("/health", (req, res) => {
  return res.sendStatus(200);
});

export default routes;
