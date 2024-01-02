/* eslint-disable linebreak-style */
import httpStatus from 'http-status';
import bcrypt from 'bcryptjs';
import models from '../models';
import jwt from '../services/jwt';
import utility from '../services/utility';
import repositories from '../repositories';

const { userRepository } = repositories;
const {
  user,
} = models;

export default {
  async checkUserExist(req, res, next) {
    try {
      const { body: { email, password } } = req;
      const userDetails = await user.findOne({ where: { email } });
      if (userDetails && await bcrypt.compare(password, userDetails?.password)) {
        const { ...userData } = userDetails.get();
        delete userData.token;
        const token = await jwt.createToken(userData);
        delete userData.password;
        userData.token = token;
        req.userInfo = userData;
        await userRepository.saveUserToken({ token });
        next();
      } else {
        utility.handleResponse(res, false, null, 'Invalid email or password', httpStatus.BAD_REQUEST);
      }
    } catch (error) {
      next(error);
    }
  },
};
