export class ApplicationException extends Error {
  public code: ExceptionCode;

  constructor(message: string, code: ExceptionCode) {
    super(message);
    this.code = ExceptionCode.VALIDATION;
  }
}

export enum ExceptionCode {
  VALIDATION = "VALIDATION",
}
