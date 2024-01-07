import config from "../configs/auth.js";
import { v4 as uuidv4 } from "uuid";

export default (sequelize, Sequelize) => {
  const RefreshToken = sequelize.define("refreshToken", {
    token: {
      type: Sequelize.STRING,
    },
    expiryDate: {
      type: Sequelize.DATE,
    },
  });

  RefreshToken.createToken = async function (user) {
    let expiredAt = new Date();

    expiredAt.setSeconds(expiredAt.getSeconds() + config.jwtRefreshExpiration);

    let _token = uuidv4();

    let refreshToken = await this.create({
      token: _token,
      userId: user.email,
      expiryDate: expiredAt.getTime(),
    });

    return refreshToken.token;
  };

  RefreshToken.verifyExpiration = (token) => {
    return token.expiryDate.getTime() < new Date().getTime();
  };

  return RefreshToken;
};

// {
//     "success": true,
//     "code": 200,
//     "payload": {
//         "id": 1,
//         "email": "irfansyapar@gmail.com",
//         "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImlyZmFuc3lhcGFyQGdtYWlsLmNvbSIsImlhdCI6MTcwNDEyODQ4NiwiZXhwIjoxNzA0MTMyMDg2fQ.T4rWUVuoplYCGpLbDQdXEx_OLAXzMUxwS5cDquiS29o",
//         "refreshToken": "b59eb093-fc53-4b2e-b8c6-6e49d815968a"
//     },
//     "message": "Logged in succesfully."
// }