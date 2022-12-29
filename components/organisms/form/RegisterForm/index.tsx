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
import makeErrorMessage from '../../../../lib/helpers/makeErrorMessage';
import { AuthApi } from '../../../../lib/api/auth';
import { AxiosError } from 'axios';
import { RegisterDto } from '../../../../@types/api/auth';
import { MyApiError } from '../../../../@types/api/api';

interface RegisterFormProps {}

interface RegisterInput extends RegisterDto {
  passwordC: string;
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
    reset,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterInput> = useCallback(
    (data) => {
      // TODO: 비밀번호, 비밀번호 확인 유효성 검사 추가
      const { email, password, username } = data;
      AuthApi.register({ email, password, username })
        .then(() => {
          router.push('/auth/login');
          reset();
        })
        .catch((err: MyApiError) => {
          alert(err.response?.data.message);
        });
    },
    [router],
  );

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
        <ErrorText>
          {makeErrorMessage(errors.email, {
            messages: { email: '이메일 검증오류' },
          })}
        </ErrorText>
      </fieldset>

      <fieldset className={styles.registerForm__section}>
        <Label htmlFor="username">이름</Label>
        <Input
          id="username"
          type="text"
          placeholder="사용할 닉네임을 적어주세요."
          {...register('username')}
        />
        <ErrorText>
          {makeErrorMessage(errors.username, {
            messages: { required: 'custom!' },
          })}
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
        <ErrorText>{makeErrorMessage(errors.password)}</ErrorText>
      </fieldset>

      <fieldset className={styles.registerForm__section}>
        <Label htmlFor="passwordC">비밀번호 확인</Label>
        <Input
          id="passwordC"
          type="password"
          placeholder="사용하실 비밀번호를 한번 더 적어주세요."
          {...register('passwordC')}
        />
        <ErrorText>{makeErrorMessage(errors.passwordC)}</ErrorText>
      </fieldset>

      <div className={styles.registerForm__submitWrapper}>
        <Button type="submit" kind="submit">
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
