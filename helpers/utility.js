const sendResponse = (data, statusCode, message, res, next) => {
  const result = { data, message };
  return res.status(statusCode).send(result);
};

const validateQuery = (allowQuey, query) => {};

module.exports = { sendResponse, validateQuery };
