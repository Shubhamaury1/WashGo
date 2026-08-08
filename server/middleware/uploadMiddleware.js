import multer from "multer";
import { uploadStream } from "../config/cloudinary.js";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only images allowed"), false);
  }
};

const multerUpload = multer({
  storage,
  fileFilter,
});

export const upload = {
  single: (fieldname) => (req, res, next) => {
    multerUpload.single(fieldname)(req, res, async (err) => {
      if (err) return next(err);
      if (!req.file) return next();
      try {
        const result = await uploadStream(req.file.buffer, "vehicles");
        req.file.path = result.secure_url;
        next();
      } catch (error) {
        next(error);
      }
    });
  }
};
