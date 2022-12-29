import { useRouter } from 'next/router';
import { useCallback } from 'react';
import Button from '../../../atoms/form/Button/Button';
import Input from '../../../atoms/form/Input/Input';
import Label from '../../../atoms/form/Label/Label';
import styles from './LoginForm.module.css';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import ErrorText from '../../../atoms/form/ErrorText/ErrorText';
import makeErrorMessage from '../../../../lib/helpers/makeErrorMessage';
import { AuthApi, LoginDto } from '../../../../lib/api/auth';
import useUser from '../../../../lib/hooks/useUser';

interface LoginFormProps {}

interface LoginInput extends LoginDto {}

const loginSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

function LoginForm(props: LoginFormProps) {
  const router = useRouter();
  const { mutate } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({ resolver: yupResolver(loginSchema) });

  const onSubmit: SubmitHandler<LoginInput> = useCallback(
    async (data) => {
      console.log('Submit Login Form!');
      const res = await AuthApi.login(data as LoginDto);
      if (!res) {
        return;
      }

      mutate(res.data);
      router.replace('/');
    },
    [router, mutate],
  );

  const handleClickNotAccount = useCallback(() => {
    router.push('/auth/register');
  }, [router]);

  const handleClickForgotPassword = useCallback(() => {
    router.push('/auth/login');
  }, [router]);

  return (
    <form
      action=""
      className={styles.loginForm}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className={styles.loginForm__title}>로그인</h2>
      <fieldset className={styles.loginForm__section}>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="example@email.com"
          {...register('email')}
        />
        <ErrorText>{makeErrorMessage(errors.email)}</ErrorText>
      </fieldset>

      <fieldset className={styles.loginForm__section}>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="비밀번호를 적어주세요."
          {...register('password')}
        />
        <ErrorText>{makeErrorMessage(errors.password)}</ErrorText>
      </fieldset>

      <div className={styles.loginForm__submitWrapper}>
        <Button type="submit" kind="submit">
          로그인
        </Button>
      </div>
      <div className={styles.loginForm__helperWrapper}>
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
