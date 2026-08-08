import multer from "multer";
import { uploadStream } from "../config/cloudinary.js";

const storage = multer.memoryStorage();

const multerUpload = multer({
  storage,
  fileFilter(req, file, cb) {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new Error("Only images are allowed"));
    }
  },
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
});

const uploadProfile = {
  single: (fieldname) => (req, res, next) => {
    multerUpload.single(fieldname)(req, res, async (err) => {
      if (err) return next(err);
      if (!req.file) return next();
      try {
        const result = await uploadStream(req.file.buffer, "profiles");
        req.file.path = result.secure_url;
        next();
      } catch (error) {
        next(error);
      }
    });
  }
};

export default uploadProfile;
