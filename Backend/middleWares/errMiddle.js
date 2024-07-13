class errorHandler extends Error {
  constructor(message, statuscode) {
    super(message);
    this.statuscode = statuscode;
  }
}

export const errorMiddleWare = (err, req, res, next) => {
  err.message = err.message || "internal error occured";
  err.statuscode = err.statuscode || 500;
  if (err.code === 11000) {
    const message = `duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new errorHandler(message, 400);
  }
  if (err.name === "JsonWebTokenError") {
    const message = "json web token is invalid,try again";
    err = new errorHandler(message, 400);
  }
  if (err.name === "TokenExpiredError") {
    const message = "token is expired";
    err = new errorHandler(message, 400);
  }
  if (err.name === "CastError") {
    const message = `invalid ${err.path}`;
    err = new errorHandler(message, 400);
  }

  const errormessage = err.errors
    ? Object.values(err.errors)
        .map((error) => error.message)
        .join(" , ")
    : err.message;

  return res.status(err.statuscode).json({
    success: false,
    message: errormessage,
  });
};
export default errorHandler;
