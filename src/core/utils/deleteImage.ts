import env from "../../config/envConfig";
import { storage } from "../gcp/storage";
export default async function deleteImage(fileName: string) {
  const name = fileName.split("/").pop() || "";
  await storage.bucket(env.GCLOUD_STORAGE_BUCKET).file(name).delete();
}
