import Area from '../../models/Area.js';

const getAllAreas = async () => {
  return await Area.findAll();
};

export default getAllAreas;
