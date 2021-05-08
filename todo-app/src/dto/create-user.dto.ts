export class CreateUserDTO {
  username: string;
  password: string;
}

export class UpdateUserDTO {
  username?: string;
}

export class DeleteUserDTO {
  username: string;
  password: string;
}
