import { Router } from 'express';
import controllers from '../controllers';
// import validations from '../validations';
// import middlewares from '../middlewares';

const router = Router();
// const { mediaValidator } = validations;
const { mediaController } = controllers;
// const { validateMiddleware } = middlewares;

router.post(
  '/media/upload',
  (req, res, next) => {
    Object.assign(req.params, {
      apiName: 'media',
    });
    next();
  },
  (req, res, next) => {
    req.params.mediaFor = 'movie';
    req.params.mediaType = 'image';
    const { params } = req;
    Object.assign(req.body, params);
    next();
  },
  // validateMiddleware({
  //   schema: mediaValidator.uploadSchema,
  // }),
  mediaController.uploadMedia,
  mediaController.saveMedia,
);

export default router;
