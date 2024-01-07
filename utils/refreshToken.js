// refreshTokenUtils.js
// import {uuidv4} from "../configs/db.js"
import { v4 as uuidv4 } from 'uuid';
import config from '../configs/auth.js';
// const { v4: uuidv4 } = require("uuid");

export const createToken = async (db, user) => {
  const expiredAt = new Date();
  expiredAt.setSeconds(expiredAt.getSeconds() + config.jwtRefreshExpiration);

  const refreshToken = await db.refreshToken.create({
    // data: {
      token: uuidv4(),
      userId: user.id,
      expiryDate: expiredAt,
    },
  );

  return refreshToken.token;
};

export const verifyExpiration = (token) => {
  return token.expiryDate.getTime() < new Date().getTime();
};

// module.exports = {
//   createToken,
//   verifyExpiration,
// };
