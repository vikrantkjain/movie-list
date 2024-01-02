import fs from 'fs';
import path from 'path';
import config from '../config';
import models from '../models';
import s3Bucket from '../services/s3-bucket';
import constant from '../constant';

const { commonConstant } = constant;
const { media } = models;
const { Op, literal } = models.Sequelize;

export default {
  /**
   * Find all and remove
   * @returns
   */
  async findAllAndRemove() {
    try {
      const where = {
        [Op.and]: literal('TIMESTAMPDIFF(MINUTE, `created_at`, NOW()) > 30'),
        status: 'pending',
      };
      const result = await media.findAll(
        { where },
      );

      const pendingMediaIds = [];
      const unlinkMediaPromises = result.map((mediaData) => {
        pendingMediaIds.push(mediaData.id);
        return this.unlinkMedia(mediaData);
      });

      unlinkMediaPromises.push(
        media.destroy({
          where: {
            id: {
              [Op.in]: pendingMediaIds,
            },
          },
        }),
      );
      await Promise.all(unlinkMediaPromises);

      return result;
    } catch (error) {
      throw Error(error);
    }
  },

  /**
   * Unlink media file
   * @param {Object} mediaData
   * @returns
   */
  async unlinkMedia(mediaData) {
    const fileDir = mediaData.basePath;
    const objects = [{ Key: mediaData.basePath }];
    // (\\\\|/)Image(\\\\|/)
    // eslint-disable-next-line prefer-regex-literals
    const regexp = RegExp('image(\\\\|/)');
    if (fileDir && fileDir.match(regexp)) {
      const imagePathArray = fileDir.split('/');
      const imageName = imagePathArray.pop();
      imagePathArray.push('thumb');
      imagePathArray.push(imageName);
      const thumbPath = imagePathArray.join('/');
      if (thumbPath) {
        objects.push({ Key: thumbPath });
      }
    }
    const imageObj = { objects };
    if (config.app.mediaStorage === commonConstant.MEDIA.MEDIA_STORAGE.S3) {
      if (media.mediaFor === commonConstant.MEDIA.MEDIA_FOR_VIDEO_TRACK) {
        s3Bucket.unlinkVideoFromS3(imageObj);
      } else {
        s3Bucket.unlinkMediaFromS3(imageObj);
      }
    } else {
      // For local delete media
      await this.unlinkMediaFromLocal(media);
    }
  },

  /**
   * Unlink media file from local
   * @param {Object} mediaData
   * @returns
   */
  async unlinkMediaFromLocal(mediaData) {
    try {
      const fileDir = path.join(__dirname, `../../${mediaData.basePath}`);
      fs.existsSync(fileDir);
      fs.unlinkSync(fileDir);
      // eslint-disable-next-line prefer-regex-literals
      const regexp = RegExp('image(\\\\|/)');
      if (fileDir && fileDir.match(regexp)) {
        const imagePathArray = fileDir.split('/');
        const imageName = imagePathArray.pop();
        imagePathArray.push('thumb');
        imagePathArray.push(imageName);
        const thumbPath = imagePathArray.join('/');
        fs.existsSync(thumbPath);
        fs.unlinkSync(thumbPath);
      }
    } catch (error) {
      throw Error(error);
    }
  },

  /**
   * Save media file
   * @param {Object} req
   * @returns
   */
  async createAWS({
    params, file, headers, connection,
  }) {
    try {
      let result = '';
      const mediaType = config.app.mediaStorage === commonConstant.MEDIA.MEDIA_STORAGE.LOCAL
        ? params.mediaType
        : config.aws.bucketPrefix;
      const imageDir = path.join(__dirname, `../../${file.path}`);
      const HTTPs = connection.encrypted === undefined ? 'http' : 'https';
      if (config.app.mediaStorage === commonConstant.MEDIA.MEDIA_STORAGE.S3
        && params.mediaType === commonConstant.MEDIA.IMAGE_TYPE) {
        const originalFileObj = file.transforms.findIndex(
          (data) => data.id === 'original',
        );
        if (originalFileObj >= 0) {
          // eslint-disable-next-line no-param-reassign
          file.key = file.transforms[originalFileObj].key;
        }
      }
      const mediaData = {
        name: file.filename || file.originalname,
        basePath: file.path || file.key,
        imagePath: imageDir,
        baseUrl: `${HTTPs}://${headers.host}/${file.path}`,
        mediaType,
        mediaFor: params.mediaFor,
        isThumbImage: false,
        status: commonConstant.MEDIA.STATUS.PENDING,
      };

      // Upload image on s3
      if (config.app.mediaStorage === commonConstant.MEDIA.MEDIA_STORAGE.S3) {
        if (params.mediaFor === commonConstant.MEDIA.MEDIA_FOR_VIDEO_TRACK
          && params.mediaType === commonConstant.MEDIA.IMAGE_TYPE) {
          mediaData.baseUrl = config.aws.s3VideoThumbUrl + file.key;
        } else if (
          params.mediaFor === commonConstant.MEDIA.MEDIA_FOR_VIDEO_TRACK
          && params.mediaType === commonConstant.MEDIA.VIDEO_TYPE
        ) {
          mediaData.baseUrl = config.aws.s3VideoBucketUrl + file.key;
        } else {
          mediaData.baseUrl = config.aws.s3BucketUrl + file.key;
        }
        result = await media.create(mediaData);
      } else {
        result = await media.create(mediaData);
      }

      return result;
    } catch (error) {
      throw Error(error);
    }
  },

  /**
   * Save multiple media file
   * @param {Object} req
   * @returns
   */
  async createMultiple(req) {
    const {
      params, files, headers, connection,
    } = req;
    try {
      const HTTPs = connection.encrypted === undefined ? 'http' : 'https';
      const mediaDataArray = files.map((file) => ({
        name: file.filename,
        basePath: file.path,
        baseUrl: `${HTTPs}://${headers.host}/${file.path}`,
        mediaType: params.mediaType,
        mediaFor: params.mediaFor,
        status: commonConstant.MEDIA.STATUS.PENDING,
      }));

      return await media.bulkCreate(mediaDataArray);
    } catch (error) {
      throw Error(error);
    }
  },

  /**
   * Find all media file by base_path
   * @param {Array} paths
   * @returns
   */
  async findAllByBasePathIn(paths) {
    try {
      const where = {
        status: commonConstant.MEDIA.STATUS.PENDING,
        basePath: {
          [Op.in]: paths,
        },
      };
      return await media.findAll({ where });
    } catch (error) {
      throw Error(error);
    }
  },

  /**
   * Change media status
   * @param {Array} paths
   * @returns
   */
  async makeUsedMedias(paths) {
    const transaction = await models.sequelize.transaction();
    try {
      const mediaData = {
        status: commonConstant.MEDIA.STATUS.USED,
      };
      const result = await media.update(
        mediaData,
        {
          where: {
            basePath: {
              [Op.in]: paths,
            },
          },
        },
        {
          transaction,
        },
      );
      await transaction.commit();

      return result;
    } catch (error) {
      await transaction.rollback();
      throw Error(error);
    }
  },
};
