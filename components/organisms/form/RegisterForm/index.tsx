import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Button from '../../../atoms/form/Button/Button';
import Input from '../../../atoms/form/Input/Input';
import Label from '../../../atoms/form/Label/Label';
import ErrorText from '../../../atoms/form/ErrorText/ErrorText';
import makeErrorMessage from '../../../../lib/helpers/makeErrorMessage';
import { AuthApi } from '../../../../lib/api/auth';
import { MyApiError } from '../../../../@types/api/api';
import { registerSchema } from '../../../../lib/api/schema';

import styles from '../Form.module.css';

type RegisterInput = yup.InferType<typeof registerSchema>;

function RegisterForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterInput> = useCallback(
    (data) => {
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
    [router, reset],
  );

  const handleClickGoToLogin = useCallback(() => {
    router.push('/auth/login');
  }, [router]);

  return (
    <form
      action=""
      className={styles.form__container}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className={styles.form__title}>회원가입</h2>
      <fieldset className={styles.form__section}>
        <Label htmlFor="email">이메일</Label>
        <Input
          id="email"
          type="email"
          placeholder="example@email.com"
          disabled={isSubmitting}
          {...register('email')}
        />
        <ErrorText>
          {makeErrorMessage(errors.email, {
            messages: { email: '이메일 검증오류' },
          })}
        </ErrorText>
      </fieldset>

      <fieldset className={styles.form__section}>
        <Label htmlFor="username">이름</Label>
        <Input
          id="username"
          type="text"
          placeholder="사용할 닉네임을 적어주세요."
          disabled={isSubmitting}
          {...register('username')}
        />
        <ErrorText>
          {makeErrorMessage(errors.username, {
            messages: { required: 'custom!' },
          })}
        </ErrorText>
      </fieldset>

      <fieldset className={styles.form__section}>
        <Label htmlFor="password">비밀번호</Label>
        <Input
          id="password"
          type="password"
          placeholder="사용하실 비밀번호를 적어주세요."
          disabled={isSubmitting}
          {...register('password')}
        />
        <ErrorText>{makeErrorMessage(errors.password)}</ErrorText>
      </fieldset>

      <fieldset className={styles.form__section}>
        <Label htmlFor="passwordConfirm">비밀번호 확인</Label>
        <Input
          id="passwordConfirm"
          type="password"
          placeholder="사용하실 비밀번호를 한번 더 적어주세요."
          disabled={isSubmitting}
          {...register('passwordConfirm')}
        />
        <ErrorText>{makeErrorMessage(errors.passwordConfirm)}</ErrorText>
      </fieldset>

      <div className={styles.form__submitWrapper}>
        <Button type="submit" kind="submit" disabled={isSubmitting}>
          회원가입
        </Button>
      </div>
      <div className={styles.form__helperWrapper}>
        <Button
          type="button"
          kind="text"
          disabled={isSubmitting}
          onClick={handleClickGoToLogin}
        >
          로그인 하러가기
        </Button>
      </div>
    </form>
  );
}

export default RegisterForm;
