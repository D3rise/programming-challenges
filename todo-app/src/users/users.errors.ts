export class UserAlreadyExistsError extends Error {
  constructor() {
    super('User already exists');
  }
}

export class UserNotFoundError extends Error {
  constructor() {
    super('User not found');
  }
}

export class WrongPasswordError extends Error {
  constructor() {
    super('Wrong password');
  }
}

export class UnknownError extends Error {
  constructor() {
    super(`Unknown error. Our engineers are notified.`);
  }
}
