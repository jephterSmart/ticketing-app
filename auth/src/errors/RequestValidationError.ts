import { ValidationError } from "express-validator";
import { CustomError, ErrorMessage } from "./CustomError";

export class RequestValidationError extends CustomError {
  statusCode: number = 400;
  constructor(private errors: Array<ValidationError>) {
    super();
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
  serializeError(): ErrorMessage[] {
    return this.errors.map((err) => ({
      message: err.msg,
      field: err.type === "field" ? err.path : undefined,
    }));
  }
}
