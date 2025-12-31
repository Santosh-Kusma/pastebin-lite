import { ApiError } from "../core/apiError.js";

export const errorHandler = (err, req, res, next) => {
  console.log(err);

  // 1. Set statusCode and message
  // ------------------------------------------
  let statusCode = 500;
  let message =
    "We are experiencing an internal error. Please retry or contact support if the issue persists.";

  // Syntaxerror from req.body
  if (err instanceof SyntaxError && err.type === "entity.parse.failed") {
    statusCode = 400;
    message = "Invalid JSON payload";
  }

  // Defined Api Errors
  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
  }
  // ------------------------------------------

  // Send safe response
  return res.status(statusCode).json({ error: message });
};
