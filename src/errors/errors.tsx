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

export class RequestNotExistsError extends Error {
  constructor(msg: string) {
    super(msg);
    Object.setPrototypeOf(this, RequestNotExistsError.prototype);
  }
}

export class VolunteerExistsError extends Error {
  constructor(msg: string) {
    super(msg);
    Object.setPrototypeOf(this, VolunteerExistsError.prototype);
  }
}

export class VolunteerNotExistsError extends Error {
  constructor(msg: string) {
    super(msg);
    Object.setPrototypeOf(this, VolunteerNotExistsError.prototype);
  }
}
