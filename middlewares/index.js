export const errorHandler = (err, req, res, next) => {
  res.status(500).json({
    status: false,
    message: "Internal server error",
    data: err.message,
  });
};

export const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    status: false,
    message: "Not found",
    data: null,
  });
};
