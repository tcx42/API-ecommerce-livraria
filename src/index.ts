import env from "./config/envConfig";
import api from "./infra/api/api";

api.listen(env.PORT, () => console.log("running..."));
