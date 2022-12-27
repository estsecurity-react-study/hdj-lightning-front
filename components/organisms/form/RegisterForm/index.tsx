import { useRouter } from 'next/router';
import { FormEvent, useCallback } from 'react';
import Button from '../../../atoms/form/Button/Button';
import Input from '../../../atoms/form/Input/Input';
import Label from '../../../atoms/form/Label/Label';
import styles from './RegisterForm.module.css';

interface RegisterFormProps {}

function RegisterForm(props: RegisterFormProps) {
  const router = useRouter();

  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    console.log('Submit Register Form!');
  }, []);

  const handleClickGoToLogin = useCallback(() => {
    router.push('/auth/login');
  }, [router]);

  return (
    <form action="" className={styles.registerForm} onSubmit={handleSubmit}>
      <h2 className={styles.registerForm__title}>회원가입</h2>
      <fieldset className={styles.registerForm__section}>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="example@email.com" />
      </fieldset>

      <fieldset className={styles.registerForm__section}>
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" placeholder="Your Password" />
      </fieldset>

      <fieldset className={styles.registerForm__section}>
        <Label htmlFor="passwordC">Password C</Label>
        <Input id="passwordC" type="password" placeholder="Your Password" />
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
