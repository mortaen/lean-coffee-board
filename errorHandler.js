function errorHandler(error, req, res, next) {
  console.error(error)
  const statusCode = error.status || 500
  res.status(statusCode).json(error)
}

module.exports = errorHandler
