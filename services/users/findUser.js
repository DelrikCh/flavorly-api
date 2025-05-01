import User from '../../models/User.js';

const findUser = (query) => User.findOne({ where: query });

export default findUser;
