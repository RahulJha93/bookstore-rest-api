const loggerMiddleware = (req, res, next) => {
  // Log incoming request method and path with timestamp
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
};

export default loggerMiddleware;

