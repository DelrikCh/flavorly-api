import HttpError from '../helpers/HttpError.js';
import findUser from '../services/users/findUser.js';
import { verifyToken } from '../helpers/jwt.js';

const attachUserIfExists = async (req, res, next) => {
  const { authorization } = req.headers;
  const [bearer, token] = authorization?.split(' ') || [];

  if (bearer !== 'Bearer' || !token) {
    return next();
  }

  const { payload, error } = verifyToken(token);
  if (error || !payload?.id) {
    return next();
  }

  const user = await findUser({ id: payload.id }, null);
  if (!user || user.token !== token) {
    return next();
  }

  req.user = user;
  next();
};

export default attachUserIfExists;
