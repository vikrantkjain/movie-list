/* eslint-disable linebreak-style */
import models from '../models';
import mediaRepository from './media-repository';

const {
  movie,
} = models;

export default {
  async getMovieList(req) {
    try {
      const {
        query: {
          limit, offset,
        },
        user,
      } = req;
      const where = { userId: user?.id };
      const orderBy = [['createdAt', 'DESC']];
      let searchCriteria = { order: orderBy, where };
      searchCriteria = {
        ...searchCriteria,
        limit: parseInt(limit, 10) || 10,
        offset: parseInt(offset, 10) || 0,
      };
      return await movie.findAndCountAll(searchCriteria);
    } catch (error) {
      throw Error(error);
    }
  },

  async addMovie(req) {
    try {
      const {
        body: {
          movieImage, title, publishingYear,
        },
        user,
      } = req;
      const data = {
        movieImage,
        title,
        publishingYear,
        userId: user?.id,
      };
      const movieDetails = await movie.create(data);
      await mediaRepository.makeUsedMedias([movieImage]);
      return movieDetails;
    } catch (error) {
      throw Error(error);
    }
  },

  async updateMovie(req) {
    try {
      const {
        body: {
          movieImage, title, publishingYear,
        },
        params: { id },
      } = req;
      const data = {
        movieImage,
        title,
        publishingYear,
      };
      await movie.update(data, { where: { id } });
      await mediaRepository.makeUsedMedias([movieImage]);
      return await movie.findOne({ where: { id } });
    } catch (error) {
      throw Error(error);
    }
  },

  async getMovieDetails(where) {
    try {
      return await movie.findOne({ where });
    } catch (error) {
      throw Error(error);
    }
  },
};
