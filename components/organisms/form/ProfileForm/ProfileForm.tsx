import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { MyApiError } from '~types/api/api';

import Button from '@components/atoms/form/Button/Button';
import ErrorText from '@components/atoms/form/ErrorText/ErrorText';
import Input from '@components/atoms/form/Input/Input';
import Label from '@components/atoms/form/Label/Label';
import { AuthApi } from '@lib/api/auth';
import { profileSchema } from '@lib/api/schema';
import makeErrorMessage from '@lib/helpers/makeErrorMessage';
import useUser from '@lib/hooks/useUser';

import styles from '../Form.module.css';

type ProfileInput = yup.InferType<typeof profileSchema>;

const initInput: ProfileInput = {
  username: '',
  // photo: '',
};

function ProfileForm() {
  const router = useRouter();
  const { user } = useUser();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isDirty, dirtyFields, isSubmitting },
  } = useForm<ProfileInput>({
    defaultValues: {
      ...initInput,
      ...user,
    },
    resolver: yupResolver(profileSchema),
  });

  const onSubmit: SubmitHandler<ProfileInput> = useCallback(
    (data) => {
      const {
        username,
        // photo
      } = data;
      console.log(data);
      AuthApi.updateProfile({ username })
        .then(() => {
          router.push('/');
          reset();
        })
        .catch((err: MyApiError) => {
          alert(err.response?.data.message);
        });
    },
    [router, reset],
  );

  useEffect(() => {
    console.log(isDirty);
  }, [isDirty]);

  return (
    <form
      action=""
      className={styles.form__container}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className={styles.form__title}>프로필 수정</h2>

      <fieldset className={styles.form__section}>
        <Label htmlFor="username">이름</Label>
        <Input
          id="username"
          type="text"
          placeholder="변경하실 닉네임을 적어주세요."
          disabled={isSubmitting}
          {...register('username')}
        />
        <ErrorText>{makeErrorMessage(errors.username)}</ErrorText>
      </fieldset>

      <div className={styles.form__submitWrapper}>
        <Button
          type="submit"
          disabled={Object.keys(dirtyFields).length < 1 || isSubmitting}
          kind={Object.keys(dirtyFields).length >= 1 ? 'submit' : 'ghost'}
        >
          프로필 수정
        </Button>
      </div>
    </form>
  );
}

export default ProfileForm;
