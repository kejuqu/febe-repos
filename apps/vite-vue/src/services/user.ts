// api/services/UserService.ts
import { BaseService } from './base';
import type { UserInfo, LoginParams } from '@/types/user';
class UserService extends BaseService {
  getUserInfo() {
    return this.get<UserInfo>('/user/info');
  }

  login(data: LoginParams) {
    return this.post<{ token: string }>('/auth/login', data, {
      withToken: false,
    });
  }

  logout() {
    return this.post('/auth/logout');
  }
}

export const userService = new UserService();
