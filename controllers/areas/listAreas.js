import getAllAreas from '../../services/areas/areasServices.js';

const listAreas = async (req, res, next) => {
  try {
    const areas = await getAllAreas();
    res.status(200).json(areas);
  } catch (error) {
    next(error);
  }
};

export default listAreas;
