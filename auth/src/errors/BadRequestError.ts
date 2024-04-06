import { CustomError, ErrorMessage } from "./CustomError";

export class BadRequestError extends CustomError {
  statusCode: number = 400;
  constructor(private reason: string) {
    super();
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
  serializeError(): ErrorMessage[] {
    return [
      {
        message: this.reason,
      },
    ];
  }
}
