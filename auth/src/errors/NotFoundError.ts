import { CustomError, ErrorMessage } from "./CustomError";

export class NotFoundError extends CustomError {
  statusCode: number = 404;
  constructor() {
    super();
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
  serializeError(): ErrorMessage[] {
    return [
      {
        message: "Not Found",
      },
    ];
  }
}
