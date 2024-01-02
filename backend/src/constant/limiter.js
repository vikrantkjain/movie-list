/* eslint-disable import/no-extraneous-dependencies */
import rateLimit from 'express-rate-limit';

const ACCOUNT_LIMITER = rateLimit({
  // windowMs: 60 * 60 * 1000, // 1 hour
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 15, // Limit each IP to 3 requests per `window` (here, per 5 minutes)
  message: { success: false, data: [], message: 'Too many attempt, please try again after 5 minutes' },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

export default {
  ACCOUNT_LIMITER,
};
