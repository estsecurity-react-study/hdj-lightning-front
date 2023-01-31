import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Button from '../../../atoms/form/Button/Button';
import Input from '../../../atoms/form/Input/Input';
import Label from '../../../atoms/form/Label/Label';
import ErrorText from '../../../atoms/form/ErrorText/ErrorText';
import makeErrorMessage from '../../../../lib/helpers/makeErrorMessage';
import { AuthApi } from '../../../../lib/api/auth';
import { UpdateProfileDto } from '../../../../@types/api/auth';
import { MyApiError } from '../../../../@types/api/api';
import useUser from '../../../../lib/hooks/useUser';

import styles from '../Form.module.css';

interface ProfileInput extends UpdateProfileDto {}

const ProfileSchema = yup
  .object({
    username: yup.string().required(),
  })
  .required();

const initInput: UpdateProfileDto = {
  username: '',
  photo: '',
};

function ProfileForm() {
  const router = useRouter();
  const { user } = useUser();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, dirtyFields },
  } = useForm<ProfileInput>({
    defaultValues: {
      ...initInput,
      ...user,
    },
    resolver: yupResolver(ProfileSchema),
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
          {...register('username')}
        />
        <ErrorText>{makeErrorMessage(errors.username)}</ErrorText>
      </fieldset>

      <div className={styles.form__submitWrapper}>
        <Button
          type="submit"
          disabled={Object.keys(dirtyFields).length < 1}
          kind={Object.keys(dirtyFields).length >= 1 ? 'submit' : 'ghost'}
        >
          프로필 수정
        </Button>
      </div>
    </form>
  );
}

export default ProfileForm;
