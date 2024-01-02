import models from '../models';

const {
  user,
} = models;

export default {
  async checkEmailIsUnique(where) {
    try {
      return await user.findOne({ where });
    } catch (error) {
      throw Error(error);
    }
  },

  async findOne(where) {
    try {
      return await user.findOne({ where });
    } catch (error) {
      throw Error(error);
    }
  },

  async saveUserToken(data) {
    try {
      return await user.update(data, { where: { id: 1 } });
    } catch (error) {
      throw Error(error);
    }
  },

  async removeToken(data) {
    try {
      return await user.update(data, { where: { id: 1 } });
    } catch (error) {
      throw Error(error);
    }
  },

};
