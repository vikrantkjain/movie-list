/* eslint-disable linebreak-style */
import HttpStatus from 'http-status';
import utility from '../services/utility';
import userRepository from '../repositories/user-repository';

export default {
  async login(req, res, next) {
    try {
      const { userInfo } = req;
      if (!userInfo) {
        utility.handleResponse(res, false, null, 'Something went wrong', HttpStatus.BAD_REQUEST);
      } else {
        utility.handleResponse(res, true, userInfo, 'Login successfully', HttpStatus.OK);
      }
    } catch (error) {
      next();
    }
  },

  async logout(req, res, next) {
    try {
      await userRepository.removeToken({ token: null });
      utility.handleResponse(res, true, null, 'Logout successfully', HttpStatus.OK);
    } catch (error) {
      next();
    }
  },
};
