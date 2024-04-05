export type ErrorMessage = {
  message: string;
  field?: string;
};
export abstract class CustomError extends Error {
  abstract statusCode: number;
  constructor() {
    super();
    Object.setPrototypeOf(this, CustomError.prototype);
  }
  abstract serializeError(): Array<ErrorMessage>;
}
