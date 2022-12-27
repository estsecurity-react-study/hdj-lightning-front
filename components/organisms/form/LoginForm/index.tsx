import { useRouter } from 'next/router';
import { FormEvent, useCallback } from 'react';
import Button from '../../../atoms/form/Button/Button';
import Input from '../../../atoms/form/Input/Input';
import Label from '../../../atoms/form/Label/Label';
import styles from './LoginForm.module.css';
import GoogleLogin from '../../../../public/asset/images/google_login.png';
import Image from 'next/image';

interface LoginFormProps {}

function LoginForm(props: LoginFormProps) {
  const router = useRouter();

  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    console.log('Submit Login Form!');
  }, []);

  const handleClickNotAccount = useCallback(() => {
    router.push('/auth/register');
  }, [router]);

  const handleClickForgotPassword = useCallback(() => {
    router.push('/auth/login');
  }, [router]);

  return (
    <form action="" className={styles.loginForm} onSubmit={handleSubmit}>
      <h2 className={styles.loginForm__title}>로그인</h2>
      <fieldset className={styles.loginForm__section}>
        <Label htmlFor="temp">Email</Label>
        <Input id="temp" type="email" placeholder="example@email.com" />
      </fieldset>

      <fieldset className={styles.loginForm__section}>
        <Label htmlFor="temp">Password</Label>
        <Input id="temp" type="password" placeholder="Your Password" />
      </fieldset>

      <div className={styles.loginForm__submitWrapper}>
        <Button type="submit" kind="primary">
          로그인
        </Button>
        {/* <Button type="button" kind="kakao" />
        <Button type="button" kind="google">
          <Image
            src={GoogleLogin}
            alt=""
            fill
            placeholder="blur"
            style={{ objectFit: 'contain' }}
          />
        </Button>
        <Button type="button" kind="naver" /> */}
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
