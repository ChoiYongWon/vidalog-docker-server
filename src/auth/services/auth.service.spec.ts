import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../user/repositories/user.entity';

describe('AuthService', () => {
  let service: AuthService;
  let userRepository: MockRepository<User>

  const mockRepository = ()=>({
    save : jest.fn()
  })

  type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, { provide: getRepositoryToken(User), useValue: mockRepository() }],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userRepository = module.get(
      getRepositoryToken(User)
    )
  });

  it('RefreshToken 발급', () => {
    expect(service.assignRefreshToken("test")).toBeInstanceOf(String);
  });
});
