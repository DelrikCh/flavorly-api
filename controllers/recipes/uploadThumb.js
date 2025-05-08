import path from 'path';
import fs from 'fs/promises';

import ctrlWrapper from '../../helpers/ctrlWrapper.js';

const uploadThumb = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      message: 'No file uploaded',
    });
  }
  const { path: tempPath, originalname } = req.file;
  const { id } = req.user;
  const timestamp = Date.now();
  const filename = `${id}_${timestamp}_${originalname}`;
  const thumbPath = path.join('public', 'recipes', filename);
  await fs.rename(tempPath, thumbPath);
  res.status(200).json({
    url: thumbPath,
  });
};

export default ctrlWrapper(uploadThumb);
