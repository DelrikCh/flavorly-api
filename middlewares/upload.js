import multer from 'multer';
import path from 'path';
import HttpError from '../helpers/HttpError.js';

const uploadDir = 'temp';
const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = path.extname(file.originalname);
    const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${uniqueSuffix}`;
    cb(null, filename);
  },
});

const fileFilter = (req, file, cb) => {
  const extension = path.extname(file.originalname).toLowerCase();
  if (!allowedExtensions.includes(extension)) {
    return cb(HttpError(400, 'Bad Request'), false);
  }
  cb(null, true);
};

const limits = {
  fileSize: 5 * 1024 * 1024,
};

const upload = multer({ storage, fileFilter, limits });

export default upload;
