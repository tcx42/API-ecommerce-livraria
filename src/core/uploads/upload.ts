import multer from "multer";
import path from "path";
import ApiError from "../../infra/apiErrors/ApiError";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve("images"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix);
  },
});

const upload = multer({
  storage: storage,
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
