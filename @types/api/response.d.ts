export enum Provider {
  local = 'local',
  google = 'google',
  kakao = 'kakao',
  naver = 'naver',
}

export interface UserProfile {
  id: number;
  email: string;
  username: string;
  photo: string;
  provider: Provider;
  createAt: string;
  updateAt: string;
}

export interface Message {
  text: string;
  user: Pick<UserProfile, 'id' | 'username' | 'photo'>;
  createAt: Date;
}
