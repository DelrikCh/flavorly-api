import path from 'path';
import fs from 'fs/promises';

import updateAvatarService from '../../services/users/updateAvatar.js';
import ctrlWrapper from '../../helpers/ctrlWrapper.js';

const updateAvatar = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      message: 'No file uploaded',
    });
  }
  const { path: tempPath, originalname } = req.file;
  const { id } = req.user;
  const filename = `${id}_${originalname}`;
  const avatarPath = path.join('public', 'avatars', filename);
  await fs.rename(tempPath, avatarPath);
  const avatarURL = `${process.env.BASE_URL}/avatars/${filename}`;
  const updatedUser = await updateAvatarService(id, avatarURL);
  res.status(200).json({
    user: {
      id: updatedUser.id,
      avatar: updatedUser.avatar,
    },
  });
};

export default ctrlWrapper(updateAvatar);
