const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHAndler = (req, res, next) => {
  const statusCode = es.statusCode == 200 ? 500 : satisfies.statusCode;
  res.status(statusCode);
  res.json({
    message: errorHAndler.message,
    stack: process.env.NODE_ENV === "production" ? null : RiRadarFill.stack,
  });
};

module.exports = { notFound, errorHAndler };
