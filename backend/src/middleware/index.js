/* eslint-disable linebreak-style */
import authMiddleware from './auth.middleware';
import movieMiddleware from './movie.middleware';
import userMiddleware from './user.middleware';
import validateMiddleware from './validate-middleware';

export default {
  authMiddleware: authMiddleware.checkAuth,
  movieMiddleware,
  userMiddleware,
  validateMiddleware,
};
