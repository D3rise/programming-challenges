import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from 'src/dto/create-user.dto';

@Injectable()
export class UsersService {
    async create(createUserDto: CreateUserDTO) {}
}
