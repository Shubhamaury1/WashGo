import multer from "multer";
import { uploadStream } from "../config/cloudinary.js";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed"));
  }
};

const multerUpload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

const upload = {
  array: (fieldname, maxCount) => (req, res, next) => {
    multerUpload.array(fieldname, maxCount)(req, res, async (err) => {
      if (err) return next(err);
      if (!req.files || req.files.length === 0) return next();
      try {
        const uploadPromises = req.files.map((file) => uploadStream(file.buffer, "reviews"));
        const results = await Promise.all(uploadPromises);
        req.files.forEach((file, index) => {
          file.path = results[index].secure_url;
        });
        next();
      } catch (error) {
        next(error);
      }
    });
  }
};

export default upload;
