/* eslint-disable prefer-regex-literals */
/* eslint-disable no-unused-vars */
import { Router } from 'express';
import HttpStatus from 'http-status';
import account from './account';
import movie from './movie';
import media from './media';

const router = Router();
const register = (app) => {
  app.use(router);

  router.use('/api', [
    account,
    movie,
    media,
  ]);

  app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = HttpStatus.NOT_FOUND;
    res.status(error.status).json({
      success: false,
      data: null,
      error,
      message: error.message,
    });
  });

  app.use((error, req, res, next) => {
    const internalError = HttpStatus.INTERNAL_SERVER_ERROR;
    if (error) {
      console.log(`Error : ${error}`);
    }
    let statusCode = error?.status
      ? HttpStatus.BAD_REQUEST
      : internalError;
    if (error?.status === HttpStatus.UNAUTHORIZED) {
      statusCode = HttpStatus.UNAUTHORIZED;
    }
    let errorMessage = 'route error ';
    if (error) {
      statusCode = HttpStatus.BAD_REQUEST;
      errorMessage = String(error)
        ?.replace(new RegExp('Error:', 'g'), '')
        ?.trim();
    }
    res.status(statusCode).json({
      success: false,
      data: null,
      error,
      message: errorMessage,
    });
  });
};
export default register;
