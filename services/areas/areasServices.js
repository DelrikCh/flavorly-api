import models from '../../models/index.js';

const getAllAreas = async () => {
  return await models.Area.findAll();
};

export default getAllAreas;
