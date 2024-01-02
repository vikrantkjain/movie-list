/* eslint-disable linebreak-style */
import jwt from 'jsonwebtoken';
import config from '../config';

export default {
  createToken(payload) {
    return jwt.sign(payload, config.jwtSecret, {
      expiresIn: config.jwtExpireIn,
    });
  },
  verifyToken(token) {
    try {
      return jwt.verify(token, config.jwtSecret, {
        expiresIn: config.jwtExpireIn,
      });
    } catch (error) {
      throw Error(error);
    }
  },
  decodeToken(token) {
    return jwt.decode(token, {
      complete: true,
    });
  },
};
