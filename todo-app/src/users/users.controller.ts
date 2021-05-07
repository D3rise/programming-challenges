import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from '../dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post()
    async create(@Body() createUserDto: CreateUserDTO) {
        this.usersService.create(createUserDto)
    }
}
