import fs from 'fs/promises';
import path from 'path';
import * as Jimp from 'jimp';
import HttpError from '../../helpers/HttpError.js';

const updateAvatar = async (req, res, next) => {
  if (!req.file) {
    return next(HttpError(400, 'Bad Request'));
  }

  const { path: tempPath, filename } = req.file;
  const avatarsDir = path.resolve('public', 'avatars');
  const finalPath = path.join(avatarsDir, filename);

  try {
    await fs.mkdir(avatarsDir, { recursive: true });

    const image = await Jimp.read(tempPath);
    await image.resize(250, 250).writeAsync(finalPath);
    await fs.unlink(tempPath);

    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const avatarURL = `${baseUrl}/avatars/${filename}`;

    res.status(200).json({ avatarURL });
  } catch (error) {
    await fs.unlink(tempPath).catch(() => {});
    next(HttpError(500, error.message || 'Error processing avatar'));
  }
};

export default updateAvatar;
