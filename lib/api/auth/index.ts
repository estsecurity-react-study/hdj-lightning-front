import { api } from '..';
import {
  ChangePasswordDto,
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

const changePassword = (changePasswordDto: ChangePasswordDto) => {
  return api.patch('/user/profile/password', changePasswordDto);
};

export const AuthApi = {
  register,
  login,
  logout,
  updateProfile,
  changePassword,
};
