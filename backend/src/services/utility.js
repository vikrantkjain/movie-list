/* eslint-disable linebreak-style */
import fs from 'fs';
import path from 'path';

export default {
  isFileExist(filePath) {
    const tmpPath = path.join(__dirname, `../../${filePath}`);
    return fs.existsSync(tmpPath) || false;
  },

  handleResponse(res, success, data, message, status) {
    res.status(status).json({
      success,
      data,
      message,
    });
  },
};
