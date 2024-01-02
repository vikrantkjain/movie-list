/* eslint-disable linebreak-style */
import HttpStatus from 'http-status';
import repositories from '../repositories';
import utility from '../services/utility';

const { movieRepository } = repositories;
export default {

  // eslint-disable-next-line consistent-return
  async movieList(req, res, next) {
    try {
      const result = await movieRepository.getMovieList(req);
      utility.handleResponse(res, true, result, 'Movie list', HttpStatus.OK);
    } catch (error) {
      next();
    }
  },

  async addMovie(req, res, next) {
    try {
      const result = await movieRepository.addMovie(req);
      if (result) {
        utility.handleResponse(res, true, result, 'Movie add successfully', HttpStatus.OK);
      } else {
        utility.handleResponse(res, false, null, 'Something went wrong', HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      next();
    }
  },

  async updateMovie(req, res, next) {
    try {
      const result = await movieRepository.updateMovie(req);
      if (result) {
        utility.handleResponse(res, true, result, 'Movie updated successfully', HttpStatus.OK);
      } else {
        utility.handleResponse(res, false, null, 'Something went wrong', HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      next();
    }
  },

  async movieDetails(req, res, next) {
    try {
      const { movieInfo } = req;
      if (movieInfo) {
        utility.handleResponse(res, true, movieInfo, 'Movie details', HttpStatus.OK);
      } else {
        utility.handleResponse(res, false, null, 'Something went wrong', HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      next();
    }
  },
};
