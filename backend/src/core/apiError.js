export class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class NotFound extends ApiError {
  constructor(message = "Resource not found") {
    super(404, message);
  }
}
