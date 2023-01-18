import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { LoginDto } from '../../../../@types/api/auth';

import { useCallback } from 'react';
import { AuthApi } from '../../../../lib/api/auth';
import { MyApiError } from '../../../../@types/api/api';
import useUser from '../../../../lib/hooks/useUser';
import Label from '../../../atoms/form/Label/Label';
import Input from '../../../atoms/form/Input/Input';
import makeErrorMessage from '../../../../lib/helpers/makeErrorMessage';
import ErrorText from '../../../atoms/form/ErrorText/ErrorText';
import Button from '../../../atoms/form/Button/Button';

import Locker from '../../../../public/asset/svg/lock-icon.svg';
import styles from '../Form.module.css';

const validatePasswordSchema = yup.object({
  password: yup.string().required(),
});

interface PrePasswordFormProps {
  onSuccess: () => void;
}

interface ValidatePasswordInput extends Pick<LoginDto, 'password'> {}

function PrePasswordForm({ onSuccess }: PrePasswordFormProps) {
  const { user } = useUser();

  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<ValidatePasswordInput>({
    defaultValues: { password: '' },
    resolver: yupResolver(validatePasswordSchema),
  });

  const onSubmit: SubmitHandler<ValidatePasswordInput> = useCallback(
    async ({ password }) => {
      try {
        // TODO: user email을 좀 더 예쁘게 가져올 방법 찾기.
        const res = await AuthApi.login({ email: user?.email || '', password });
        if (res) {
          onSuccess();
        }
      } catch (error) {
        alert((error as MyApiError).response?.data.message);
        router.push('/');
        reset();
      }
    },
    [router],
  );

  return (
    <form
      action=""
      className={styles.form__container}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className={styles.form__title}>
        <div className={styles.lockerIcon}>
          <Locker />
        </div>
        본인 인증
        <p className={styles.form__title_sub}>먼저 본인 인증이 필요합니다!</p>
      </h2>

      <fieldset className={styles.form__section}>
        <Label htmlFor="password">비밀번호</Label>
        <Input
          id="password"
          type="password"
          placeholder="비밀번호를 적어주세요."
          {...register('password')}
        />
        <ErrorText>{makeErrorMessage(errors.password)}</ErrorText>
      </fieldset>

      <div className={styles.form__submitWrapper}>
        <Button
          type="submit"
          kind={isDirty ? 'submit' : 'ghost'}
          disabled={!isDirty}
        >
          인증
        </Button>
      </div>
    </form>
  );
}

export default PrePasswordForm;