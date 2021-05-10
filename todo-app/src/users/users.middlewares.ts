import {
  Inject,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class AuthorizationMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = verify(token, process.env.JWT_SECRET);

      const user = await this.usersRepository.findOne(Number(decodedToken));
      if (!user) next(new UnauthorizedException());

      next();
    } catch (e) {
      next(new UnauthorizedException());
    }
  }
}
