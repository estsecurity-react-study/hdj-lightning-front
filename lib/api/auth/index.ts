import { api, setToken } from '..';

export interface RegisterDto {
  email: string;
  password: string;
  username: string;
}

const register = async (registerDto: RegisterDto) => {
  try {
    const res = await api.post('auth/register', registerDto);
    return res;
  } catch (error) {
    console.log('error!', error);
  }
};

export interface LoginDto {
  email: string;
  password: string;
}

const login = async (data: LoginDto) => {
  try {
    const res = await api.post('/auth/login', data);
    setToken(res.data);

    return res;
  } catch (error) {
    console.log('error!', error);
  }
};

const getProfile = async () => {
  try {
    const res = await api.get('/auth/me');

    return res.data;
  } catch (error) {
    console.log('error!', error);
  }
};

export const AuthApi = { register, login, getProfile };
