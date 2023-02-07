import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { useCallback } from 'react';
import { AuthApi } from '../../../../lib/api/auth';
import { MyApiError } from '../../../../@types/api/api';
import Label from '../../../atoms/form/Label/Label';
import Input from '../../../atoms/form/Input/Input';
import makeErrorMessage from '../../../../lib/helpers/makeErrorMessage';
import ErrorText from '../../../atoms/form/ErrorText/ErrorText';
import Button from '../../../atoms/form/Button/Button';
import { changePasswordSchema } from '../../../../lib/api/schema';

import styles from '../Form.module.css';

interface ChangePasswordInput
  extends yup.InferType<typeof changePasswordSchema> {}

function PasswordForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<ChangePasswordInput>({
    defaultValues: { password: '', passwordConfirm: '' },
    resolver: yupResolver(changePasswordSchema),
  });

  const onSubmit: SubmitHandler<ChangePasswordInput> = useCallback(
    async ({ password }) => {
      try {
        const res = await AuthApi.changePassword({ password });
        if (res) {
          router.replace('/');
        }
      } catch (error) {
        alert((error as MyApiError).response?.data.message);
        reset();
      }
    },
    [router, reset],
  );

  return (
    <form
      action=""
      className={styles.form__container}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className={styles.form__title}>비밀번호 변경</h2>

      <fieldset className={styles.form__section}>
        <Label htmlFor="password">비밀번호</Label>
        <Input
          id="password"
          type="password"
          placeholder="변경하실 비밀번호를 적어주세요."
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
          placeholder="변경하실 비밀번호를 한번 더 적어주세요."
          disabled={isSubmitting}
          {...register('passwordConfirm')}
        />
        <ErrorText>{makeErrorMessage(errors.passwordConfirm)}</ErrorText>
      </fieldset>

      <div className={styles.form__submitWrapper}>
        <Button
          type="submit"
          kind={isDirty ? 'submit' : 'ghost'}
          disabled={!isDirty}
        >
          비밀번호 변경
        </Button>
      </div>
    </form>
  );
}

export default PasswordForm;
