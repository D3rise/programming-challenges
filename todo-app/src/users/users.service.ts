import { Inject, Injectable } from '@nestjs/common';
import {
  CreateUserDTO,
  DeleteUserDTO,
  UpdateUserDTO,
} from 'src/dto/create-user.dto';
import { Repository, UpdateResult } from 'typeorm';
import { User } from './users.entity';
import { hash, compare } from 'bcrypt';
import {
  UserAlreadyExistsError,
  UserNotFoundError,
  WrongPasswordError,
  UnknownError,
} from './users.errors';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY') private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDTO): Promise<User> {
    const passwordHash = await hash(createUserDto.password, 10);
    const { username } = createUserDto;

    try {
      const user = this.usersRepository.create({
        username,
        passwordHash,
      });

      await this.usersRepository.save(user);
      return user;
    } catch (err) {
      throw new UserAlreadyExistsError();
    }
  }

  async update(
    updateUserDto: UpdateUserDTO,
    user: User,
  ): Promise<UpdateUserDTO> {
    try {
      await this.usersRepository.update(user, updateUserDto);
      return updateUserDto;
    } catch (e) {
      throw new UserNotFoundError();
    }
  }

  async delete(deleteUserDto: DeleteUserDTO): Promise<User> {
    const user = await this.usersRepository.findOne({
      username: deleteUserDto.username,
    });
    if (!user) throw new UserNotFoundError();

    const passwordIsCorrect = await compare(
      deleteUserDto.password,
      user.passwordHash,
    );
    if (!passwordIsCorrect) throw new WrongPasswordError();

    try {
      await this.usersRepository.softRemove(user);
      return user;
    } catch (e) {
      throw new UnknownError();
    }
  }
}
