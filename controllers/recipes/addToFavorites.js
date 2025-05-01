import addUserFavorite from '../../services/recipes/addUserFavorite.js';

const addToFavorites = async (req, res, next) => {
  try {
    await addUserFavorite(req.user.id, req.params.id);

    res.status(200).json({ message: 'Added to favorites' });
  } catch (err) {
    next(err);
  }
};

export default addToFavorites;
