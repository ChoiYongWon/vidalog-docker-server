import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../repositories/user.entity';
import { Repository } from 'typeorm';
import { RegisterRequestDto } from '../../auth/dtos/request/RegisterRequest.dto';

const mockRepository = ()=>({
  count : jest.fn(),
  save : jest.fn()
})

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('UserService', () => {
  let service: UserService;
  let userRepository: MockRepository<User>

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: getRepositoryToken(User), useValue: mockRepository() }
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get(
      getRepositoryToken(User)
    )
  });

  it("데이터베이스_닉네임_여부_조회_없는_경우", async ()=>{
    userRepository.count.mockResolvedValue(false)
    const result = await service.isUserExist("dyddnjs")
    expect(result).toBe(false)
  })

  it("데이터베이스_닉네임_여부_조회_있는_경우", async ()=>{
    userRepository.count.mockResolvedValue(true)
    const result = await service.isUserExist("dyddnjs")
    expect(result).toBe(true)
  })

  it("데이터베이스_유저_생성", async ()=>{
    const user : RegisterRequestDto = {
      id : "dyddnjs",
      password : "1234",
      email : "yongwon@naver.com",
      nickname : "yongwon0824"
    }
    userRepository.save.mockResolvedValue(user)
    const result = await service.create(user)
    expect(result).toBe(user)
  })

});
