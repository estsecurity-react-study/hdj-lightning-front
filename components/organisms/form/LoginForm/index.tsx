import { useRouter } from 'next/router';
import { useCallback } from 'react';
import Button from '../../../atoms/form/Button/Button';
import Input from '../../../atoms/form/Input/Input';
import Label from '../../../atoms/form/Label/Label';

import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import ErrorText from '../../../atoms/form/ErrorText/ErrorText';
import makeErrorMessage from '../../../../lib/helpers/makeErrorMessage';
import { AuthApi } from '../../../../lib/api/auth';
import useUser from '../../../../lib/hooks/useUser';
import { LoginDto } from '../../../../@types/api/auth';
import { MyApiError } from '../../../../@types/api/api';
import { BASE_API_URL } from '../../../../lib/api';

import styles from '../Form.module.css';

interface LoginInput extends LoginDto {}

const loginSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

function LoginForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<LoginInput>({ resolver: yupResolver(loginSchema) });

  const onSubmit: SubmitHandler<LoginInput> = useCallback(
    async (data) => {
      try {
        const res = await AuthApi.login(data as LoginDto);
        if (res) {
          router.replace('/');
        }
      } catch (error) {
        alert((error as MyApiError).response?.data.message);
        resetField('password');
      }
    },
    [router],
  );

  const handleClickLoginGoogle = useCallback(() => {
    router.push(`${BASE_API_URL}/oauth/google/login`);
  }, [router]);

  const handleClickNotAccount = useCallback(() => {
    router.push('/auth/register');
  }, [router]);

  const handleClickForgotPassword = useCallback(() => {
    router.push('/auth/login');
  }, [router]);

  return (
    <form
      action=""
      className={styles.form__container}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className={styles.form__title}>로그인</h2>
      <fieldset className={styles.form__section}>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="example@email.com"
          {...register('email')}
        />
        <ErrorText>{makeErrorMessage(errors.email)}</ErrorText>
      </fieldset>

      <fieldset className={styles.form__section}>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="비밀번호를 적어주세요."
          {...register('password')}
        />
        <ErrorText>{makeErrorMessage(errors.password)}</ErrorText>
      </fieldset>

      <div className={styles.form__submitWrapper}>
        <Button type="submit" kind="submit">
          로그인
        </Button>
        <Button type="button" kind="submit" onClick={handleClickLoginGoogle}>
          Google
        </Button>
      </div>
      <div className={styles.form__helperWrapper}>
        <Button type="button" kind="text" onClick={handleClickForgotPassword}>
          비밀번호를 잊으셨나요?
        </Button>
        <Button type="button" kind="text" onClick={handleClickNotAccount}>
          계정이 없으신가요?
        </Button>
      </div>
    </form>
  );
}

export default LoginForm;
