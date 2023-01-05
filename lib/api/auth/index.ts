import { api } from '..';
import {
  LoginDto,
  RegisterDto,
  UpdateProfileDto,
} from '../../../@types/api/auth';

const register = (registerDto: RegisterDto) => {
  return api.post('/auth/register', registerDto);
};

const login = (data: LoginDto) => {
  return api.post('/auth/login', data);
};

const logout = () => {
  return api.post('/auth/logout');
};

const updateProfile = (updateProfileDto: UpdateProfileDto) => {
  return api.patch('/user/profile', updateProfileDto);
};

export const AuthApi = { register, login, logout, updateProfile };
