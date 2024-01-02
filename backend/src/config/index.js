import dotenv from 'dotenv';

dotenv.config();
export default {
  app: {
    siteName: process.env.SITE_NAME,
    siteEmail: '',
    mediaStorage: 'local', // local
    mediaUploadSizeLimit: 1024 * 1024 * 15,
    baseUrl: process.env.BASE_URL,
    environment: process.env.NODE_ENV,
    setBaseUrl(url) {
      this.baseUrl = url;
    },
  },
  database: {
    mysql: {
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      db: process.env.DB_NAME,
      port: process.env.DB_PORT,
      timezone: '+00:00',
    },
  },
  aws: {
    bucketPrefix: process.env.AWS_BUCKET_PREFIX,
    bucketName: process.env.AWS_BUCKET_NAME,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    s3BucketUrl: process.env.AWS_S3_BUCKET_URL,
  },
  jwtSecret: process.env.JWT_SECRET,
  jwtExpireIn: process.env.JWT_EXPIRE_IN,
};
