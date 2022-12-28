import axios from 'axios';

export const getToken = () => {
  if (typeof window === 'undefined') return;

  const token = localStorage.getItem('token');
  return token;
};

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { common: { Authorization: `Bearer ${getToken()}` } },
});

export const setToken = (token: string) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('token', token);
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const fetcher = (url: string) => api.get(url).then((res) => res.data);

api.interceptors.request.use(
  (config) => {
    // TODO: cookie 방식으로 변경.
    const token = getToken();
    console.log('api intercept!! and token:', token);
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (err) => Promise.reject(err),
);
// interceptor로 요청 시 마다 헤더에 token 가져와서 등록.
// 결국 token은 어디에? ㅋ ㅋ ㅋ ㅋ