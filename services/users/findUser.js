import { literal } from 'sequelize';

import User from '../../models/User.js';

const findUser = (query, ownerId) =>
  User.findOne({
    where: query,
    attributes: {
      include: [
        [
          literal(`EXISTS (
            SELECT 1 FROM "follows" AS "isFollowing"
            WHERE "isFollowing"."followingId" = "User"."id"
              AND "isFollowing"."followerId" = '${ownerId || '0'}'
          )`),
          'isFollowing',
        ],
      ],
    },
  });

export default findUser;
