/* eslint-disable linebreak-style */
import httpStatus from 'http-status';
import jwt from '../services/jwt';
import utility from '../services/utility';
import repositories from '../repositories';

const { userRepository } = repositories;

export default {
  async checkAuth(req, res, next) {
    try {
      if (req?.headers?.authorization) {
        const decodedToken = jwt.verifyToken(req?.headers?.authorization);
        if (decodedToken) {
          const tokenDetails = await userRepository.findOne({ token: req?.headers?.authorization });
          if (tokenDetails) {
            req.user = tokenDetails;
            next();
          } else {
            utility.handleResponse(res, false, null, 'Token not found', httpStatus.BAD_REQUEST);
          }
        } else {
          utility.handleResponse(res, false, null, 'Invalid Token', httpStatus.BAD_REQUEST);
        }
      } else {
        utility.handleResponse(res, false, null, 'Token not found', httpStatus.BAD_REQUEST);
      }
    } catch (error) {
      next(error);
    }
  },
};
