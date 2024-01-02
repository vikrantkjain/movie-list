/* eslint-disable linebreak-style */
import httpStatus from 'http-status';
import repositories from '../repositories';
import utility from '../services/utility';

const { movieRepository } = repositories;
export default {
  async checkMovieExist(req, res, next) {
    try {
      const { id } = req.params;
      const movieDetails = await movieRepository.getMovieDetails({ id });
      if (!movieDetails) {
        utility.handleResponse(res, false, null, 'Movie not found', httpStatus.BAD_REQUEST);
      } else {
        req.movieInfo = movieDetails;
        next();
      }
    } catch (error) {
      next(error);
    }
  },
};
