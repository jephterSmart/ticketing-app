import { CustomError, ErrorMessage } from "./CustomError";

export class NotAuthorizedError extends CustomError {
  statusCode: number = 401;
  constructor() {
    super();
    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }
  serializeError(): ErrorMessage[] {
    return [
      {
        message: "Not Authorized",
      },
    ];
  }
}
