const httpStatus = require('http-status');
module.exports = function response(
  message,
  payload = null,
  error = null,
  statusCode = 200,
  token = null
) {
  return {
    statusCode,
    message,
    payload,
    error,
    token
  };
};
