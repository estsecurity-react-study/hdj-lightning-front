import { api, removeToken, setRefresh, setToken } from '..';
import { LoginDto, RegisterDto } from '../../../@types/api/auth';

const register = (registerDto: RegisterDto) => {
  return api.post('/auth/register', registerDto);
};

const login = async (data: LoginDto) => {
  try {
    const res = await api.post('/auth/login', data);
    if (res) {
      setToken(res.data);
      // TODO: change data to refresh
      setRefresh(res.data);
    }

    return res;
  } catch (error) {
    throw error;
  }
};

const logout = () => {
  return api.post('/auth/logout');
  removeToken();
};

export const AuthApi = { register, login, logout };
