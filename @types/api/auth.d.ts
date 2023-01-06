export interface RegisterDto {
  email: string;
  password: string;
  username: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

interface UpdateUserDto {
  password?: string;
  username?: string;
  photo?: string;
}

export interface UpdateProfileDto extends Omit<UpdateUserDto, 'password'> {}

export interface ChangePasswordDto extends Pick<UpdateUserDto, 'password'> {}
