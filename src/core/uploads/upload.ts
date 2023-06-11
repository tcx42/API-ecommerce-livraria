import multer, { memoryStorage } from "multer";
import ApiError from "../../infra/apiErrors/ApiError";

const upload = multer({
  storage: memoryStorage(),
  limits: { fileSize: 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" || file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(
        new ApiError(400, "Apenas formatos .png, .jpg e .jpeg são permitidos"),
      );
    }
  },
});
export default upload;
