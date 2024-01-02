/* eslint-disable linebreak-style */
import { Router } from 'express';
import controller from '../controllers';
import middleware from '../middleware';
import validation from '../validations';

const { movieController } = controller;
const { movieValidator } = validation;
const { authMiddleware, movieMiddleware, validateMiddleware } = middleware;

const router = Router();

router.get(
  '/movie',
  authMiddleware,
  movieController.movieList,
);

router.get(
  '/movie/:id',
  authMiddleware,
  validateMiddleware({ schema: movieValidator.getMovieDetailsSchema }),
  movieMiddleware.checkMovieExist,
  movieController.movieDetails,
);

router.post(
  '/movie',
  authMiddleware,
  validateMiddleware({ schema: movieValidator.addMovieSchema }),
  movieController.addMovie,
);

router.patch(
  '/movie/:id',
  authMiddleware,
  validateMiddleware({ schema: movieValidator.updateMovieSchema }),
  movieMiddleware.checkMovieExist,
  movieController.updateMovie,
);

export default router;
