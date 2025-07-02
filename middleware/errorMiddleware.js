const notFound = (req, res, next) => {
  res.status(404).json({ message: 'Not Found' });
};

const errorHandler = (err, req, res, next) => {
  // Log error stack for debugging
  console.error(err.stack);
  res.status(500).json({ message: 'Server Error', error: err.message });
};

export default { notFound, errorHandler };

