import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Button from '../../../atoms/form/Button/Button';
import Input from '../../../atoms/form/Input/Input';
import Label from '../../../atoms/form/Label/Label';
import styles from './ProfileForm.module.css';
import ErrorText from '../../../atoms/form/ErrorText/ErrorText';
import makeErrorMessage from '../../../../lib/helpers/makeErrorMessage';
import { AuthApi } from '../../../../lib/api/auth';
import { UpdateProfileDto } from '../../../../@types/api/auth';
import { MyApiError } from '../../../../@types/api/api';
import useUser from '../../../../lib/hooks/useUser';
import { UserProfile } from '../../../../@types/api/response';

interface ProfileFormProps {
  defaultValue?: Pick<UserProfile, 'username' | 'photo'>;
}

interface ProfileInput extends UpdateProfileDto {
  passwordC: string;
}

const ProfileSchema = yup
  .object({
    password: yup.string().required(),
    passwordC: yup.string().required(),
    username: yup.string().required(),
  })
  .required();

const initInput: UpdateProfileDto = {
  username: '',
  password: '',
  photo: '',
};

function ProfileForm({ defaultValue }: ProfileFormProps) {
  const router = useRouter();
  const { user } = useUser();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isDirty, dirtyFields },
  } = useForm<ProfileInput>({
    defaultValues: {
      ...initInput,
      username: user?.username,
      photo: user?.photo,
    },
    resolver: yupResolver(ProfileSchema),
  });

  const onSubmit: SubmitHandler<ProfileInput> = useCallback(
    (data) => {
      // TODO: 비밀번호, 비밀번호 확인 유효성 검사 추가
      const { password, username, photo } = data;
      console.log(data);
      //   AuthApi.updateProfile({ password, username })
      //     .then(() => {
      //       router.push('/');
      //       reset();
      //     })
      //     .catch((err: MyApiError) => {
      //       alert(err.response?.data.message);
      //     });
    },
    [router],
  );

  useEffect(() => {
    console.log(isDirty);
  }, [isDirty]);

  return (
    <form
      action=""
      className={styles.profileForm}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className={styles.profileForm__title}>프로필 수정</h2>

      <fieldset className={styles.profileForm__section}>
        <Label htmlFor="username">이름</Label>
        <Input
          id="username"
          type="text"
          placeholder="변경하실 닉네임을 적어주세요."
          {...register('username')}
        />
        <ErrorText>
          {makeErrorMessage(errors.username, {
            messages: { required: 'custom!' },
          })}
        </ErrorText>
      </fieldset>

      <fieldset className={styles.profileForm__section}>
        <Label htmlFor="password">비밀번호</Label>
        <Input
          id="password"
          type="password"
          placeholder="변경하실 비밀번호를 적어주세요."
          {...register('password')}
        />
        <ErrorText>{makeErrorMessage(errors.password)}</ErrorText>
      </fieldset>

      <fieldset className={styles.profileForm__section}>
        <Label htmlFor="passwordC">비밀번호 확인</Label>
        <Input
          id="passwordC"
          type="password"
          placeholder="변경하실 비밀번호를 한번 더 적어주세요."
          {...register('passwordC')}
        />
        <ErrorText>{makeErrorMessage(errors.passwordC)}</ErrorText>
      </fieldset>

      <div className={styles.profileForm__submitWrapper}>
        <Button
          type="submit"
          disabled={Object.keys(dirtyFields).length < 1}
          kind={Object.keys(dirtyFields).length >= 1 ? 'primary' : 'submit'}
        >
          프로필 수정
        </Button>
      </div>
    </form>
  );
}

export default ProfileForm;
