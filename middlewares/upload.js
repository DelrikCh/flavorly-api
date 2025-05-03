import multer from 'multer';
import path from 'path';
import HttpError from '../helpers/HttpError.js';

const uploadsDir = path.resolve('temp');
const allowedExtensions = ['jpg', 'jpeg', 'png'];

const storage = multer.diskStorage({
  destination: uploadsDir,
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()} ${Math.round(Math.random() * 1e9)}`;
    const filename = `${uniqueSuffix}-${file.originalname}`;
    cb(null, filename);
  },
});

const fileFilter = (req, file, cb) => {
  const extension = file.originalname.split('.').pop().toLowerCase();
  if (!allowedExtensions.includes(extension)) {
    return cb(HttpError(400, 'Дозволені лише .jpg, .jpeg, .png файли'));
  }
  cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

export default upload;
