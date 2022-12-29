import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

export const fetcher = (url: string) => api.get(url).then((res) => res.data);

// interceptor로 요청 시 마다 헤더에 token 가져와서 등록.
// 결국 token은 어디에? ㅋ ㅋ ㅋ ㅋ
