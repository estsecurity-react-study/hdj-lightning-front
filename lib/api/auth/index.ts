import { api, removeToken, setToken } from '..';
import { LoginDto, RegisterDto } from '../../../@types/api/auth';

const register = (registerDto: RegisterDto) => {
  return api.post('/auth/register', registerDto);
};

const login = async (data: LoginDto) => {
  try {
    const res = await api.post('/auth/login', data);
    if (res) setToken(res.data);

    return res;
  } catch (error) {
    throw error;
  }
};

const logout = () => {
  removeToken();
};

export const AuthApi = { register, login, logout };
