import fs from 'fs/promises';
import path from 'path';
import * as Jimp from 'jimp';
import { fileURLToPath } from 'url';
import HttpError from '../../helpers/HttpError.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const updateAvatar = async (req, res, next) => {
  if (!req.file) {
    return next(HttpError(400, 'Bad Request'));
  }

  const { path: tempPath, filename } = req.file;
  const avatarsDir = path.resolve(__dirname, '../../public/avatars');

  try {
    await fs.mkdir(avatarsDir, { recursive: true });

    const finalPath = path.join(avatarsDir, filename);

    const image = await Jimp.read(tempPath);
    await image.resize(250, 250).writeAsync(finalPath);

    await fs.unlink(tempPath);

    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const avatarURL = `${baseUrl}/avatars/${filename}`;

    res.status(200).json({ avatarURL });
  } catch (error) {
    await fs.unlink(tempPath);
    next(error);
  }
};

export default updateAvatar;
