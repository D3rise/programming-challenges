import { Connection, Repository } from 'typeorm';
import { User } from './users.entity';

export const usersProviders = [
  {
    provide: 'USERS_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(User),
    inject: ['DATABASE_CONNECTION'],
  },
];
