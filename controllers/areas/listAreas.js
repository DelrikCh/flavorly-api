import getAllAreas from '../../services/areas/areasServices.js';
import ctrlWrapper from '../../helpers/ctrlWrapper.js';

const listAreas = async (req, res) => {
  const areas = await getAllAreas();
  res.status(200).json(areas);
};

export default ctrlWrapper(listAreas);
