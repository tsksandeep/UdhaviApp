export class UserExistsError extends Error {
  constructor(msg: string) {
    super(msg);
    Object.setPrototypeOf(this, UserExistsError.prototype);
  }
}

export class UserNotExistsError extends Error {
  constructor(msg: string) {
    super(msg);
    Object.setPrototypeOf(this, UserNotExistsError.prototype);
  }
}

export class InvalidOtpError extends Error {
  constructor(msg: string) {
    super(msg);
    Object.setPrototypeOf(this, InvalidOtpError.prototype);
  }
}

export class RequestExistsError extends Error {
  constructor(msg: string) {
    super(msg);
    Object.setPrototypeOf(this, RequestExistsError.prototype);
  }
}
