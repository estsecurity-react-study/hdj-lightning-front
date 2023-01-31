import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { ChangePasswordDto } from '../../../../@types/api/auth';

import { useCallback } from 'react';
import { AuthApi } from '../../../../lib/api/auth';
import { MyApiError } from '../../../../@types/api/api';
import Label from '../../../atoms/form/Label/Label';
import Input from '../../../atoms/form/Input/Input';
import makeErrorMessage from '../../../../lib/helpers/makeErrorMessage';
import ErrorText from '../../../atoms/form/ErrorText/ErrorText';
import Button from '../../../atoms/form/Button/Button';

import styles from '../Form.module.css';

const changePasswordSchema = yup.object({
  password: yup.string().required(),
  passwordC: yup
    .string()
    .required()
    .oneOf([yup.ref('password')], '비밀번호가 위와 불일치합니다!'),
});

interface ChangePasswordInput extends ChangePasswordDto {
  passwordC: string;
}

function PasswordForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<ChangePasswordInput>({
    defaultValues: { password: '', passwordC: '' },
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
          {...register('password')}
        />
        <ErrorText>{makeErrorMessage(errors.password)}</ErrorText>
      </fieldset>

      <fieldset className={styles.form__section}>
        <Label htmlFor="passwordC">비밀번호 확인</Label>
        <Input
          id="passwordC"
          type="password"
          placeholder="변경하실 비밀번호를 한번 더 적어주세요."
          {...register('passwordC')}
        />
        <ErrorText>{makeErrorMessage(errors.passwordC)}</ErrorText>
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
