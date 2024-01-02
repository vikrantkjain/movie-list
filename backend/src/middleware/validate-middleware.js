import HttpStatus from 'http-status';
import utility from '../services/utility';

const validateRequest = (options) => async (req, res, next) => {
  try {
    await options.schema.validateAsync({
      ...req.query,
      ...req.body,
      ...req.params,
    });

    next();
  } catch (error) {
    const errors = [];
    if (error.isJoi) {
      error.details.forEach((errorData) => {
        const errorMessage = errorData.message;
        const errorObject = {
          message: errorMessage,
          field: errorData.path.join('_'),
          type: errorData.type,
        };

        errors.push(errorObject);
      });
      utility.handleResponse(res, false, errors, '', HttpStatus.BAD_REQUEST);
    }
  }
};

export default validateRequest;
