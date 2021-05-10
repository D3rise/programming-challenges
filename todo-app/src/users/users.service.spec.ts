import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateUserDTO } from './users.dto';
import { User } from './users.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let mockRepository = {
    data: [
      {
        id: 1,
        username: 'YHikki',
        passwordHash:
          '$2y$10$NEbdaeTRCKPmfQjwZXpSUeC.Xg93CfQg/ONJb5RslwEz/rlKzALC.',
      },
    ],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('CRUD interface', () => {
    it('should create new user', async () => {
      const user: CreateUserDTO = {
        username: 'D3rise',
        password: 'keyboardcat',
      };
      const newUser = await service.create(user);

      expect(newUser).resolves.toHaveProperty('username', 'D3rise');
    });
  });
});
