import { Test, TestingModule } from '@nestjs/testing';
import { EmailService } from './email.service';
import { Repository } from 'typeorm';
import { Email } from '../repositories/email.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

const mockRepository = () => ({
  save: jest.fn()
})

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;


describe('EmailService', () => {
  let service: EmailService;
  let emailRepository: MockRepository<Email>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmailService, { provide: getRepositoryToken(Email), useValue: mockRepository() }],
    }).compile();

    service = module.get<EmailService>(EmailService);
    emailRepository = module.get(getRepositoryToken(Email))
  });

  it('이메일_인증코드_발급', async () => {
    emailRepository.save.mockResolvedValue(true)
    const result = await service.getVerificationCode("yongwon0824@naver.com")
    expect(result).toHaveLength(6);
    expect(result).toBeInstanceOf(String)
  });
});
