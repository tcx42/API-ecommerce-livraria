import { storage } from "../gcp/storage";
import { format } from "util";
import env from "../../config/envConfig";
import ApiError from "../../infra/apiErrors/ApiError";

const bucket = storage.bucket(env.GCLOUD_STORAGE_BUCKET);

export default function storeImages(files: Array<Express.Multer.File>) {
  let images: string[] = [];
  if (!files) throw new ApiError(400, "Nenhuma imagem enviada.");
  for (const image of files) {
    const blob = bucket.file(image.filename);
    const blobStream = blob.createWriteStream();
    blobStream.on("error", (error) => {
      throw error;
    });
    blobStream.on("finish", () => {
      const publicUrl = format(
        `https://storage.googleapis.com/${bucket.name}/${blob.name}`,
      );
      images.push(publicUrl);
    });
    blobStream.end(image.buffer);
  }
  return images;
}
