import { api } from '..';
import { LoginDto, RegisterDto } from '../../../@types/api/auth';

const register = (registerDto: RegisterDto) => {
  return api.post('/auth/register', registerDto);
};

const login = (data: LoginDto) => {
  return api.post('/auth/login', data);
};

const logout = () => {
  return api.post('/auth/logout');
};

export const AuthApi = { register, login, logout };
