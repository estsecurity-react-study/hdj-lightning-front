import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Button from '../../../atoms/form/Button/Button';
import Input from '../../../atoms/form/Input/Input';
import Label from '../../../atoms/form/Label/Label';
import styles from './RegisterForm.module.css';
import ErrorText from '../../../atoms/form/ErrorText/ErrorText';
import postData from '../../../../lib/api/postData';

interface RegisterFormProps {}

interface RegisterInput {
  email: string;
  password: string;
  passwordC: string;
  username: string;
}

interface RegisterDto {
  email: string;
  password: string;
  username: string;
}

const registerSchema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required(),
    passwordC: yup.string().required(),
    username: yup.string().required(),
  })
  .required();

function RegisterForm(props: RegisterFormProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterInput> = useCallback((data) => {
    console.log('Submit Register Form!', data);
    const { email, password, username } = data;
    postData<RegisterDto>('auth/register', { email, password, username });
  }, []);

  const handleClickGoToLogin = useCallback(() => {
    router.push('/auth/login');
  }, [router]);

  return (
    <form
      action=""
      className={styles.registerForm}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className={styles.registerForm__title}>회원가입</h2>
      <fieldset className={styles.registerForm__section}>
        <Label htmlFor="email">이메일</Label>
        <Input
          id="email"
          type="email"
          placeholder="example@email.com"
          {...register('email')}
        />
        <ErrorText error={errors.email}>{errors.email?.message}</ErrorText>
      </fieldset>

      <fieldset className={styles.registerForm__section}>
        <Label htmlFor="username">이름</Label>
        <Input
          id="username"
          type="text"
          placeholder="사용할 닉네임을 적어주세요."
          {...register('username')}
        />
        <ErrorText error={errors.username}>
          {errors.username?.message}
        </ErrorText>
      </fieldset>

      <fieldset className={styles.registerForm__section}>
        <Label htmlFor="password">비밀번호</Label>
        <Input
          id="password"
          type="password"
          placeholder="사용하실 비밀번호를 적어주세요."
          {...register('password')}
        />
        <ErrorText error={errors.password}>
          {errors.password?.message}
        </ErrorText>
      </fieldset>

      <fieldset className={styles.registerForm__section}>
        <Label htmlFor="passwordC">비밀번호 확인</Label>
        <Input
          id="passwordC"
          type="password"
          placeholder="사용하실 비밀번호를 한번 더 적어주세요."
          {...register('passwordC')}
        />
        <ErrorText error={errors.passwordC}>
          {errors.passwordC?.message}
        </ErrorText>
      </fieldset>

      <div className={styles.registerForm__submitWrapper}>
        <Button type="submit" kind="primary">
          회원가입
        </Button>
      </div>
      <div className={styles.registerForm__helperWrapper}>
        <Button type="button" kind="text" onClick={handleClickGoToLogin}>
          로그인 하러가기
        </Button>
      </div>
    </form>
  );
}

export default RegisterForm;
