import { LoginAuthGuard } from './login-auth.guard';

describe('LoginAuthGuard', () => {
  it('should be defined', () => {
    expect(new LoginAuthGuard()).toBeDefined();
  });
});
