import * as yup from 'yup';

const email = yup.string().email().required();
const password = yup.string().required();
const passwordConfirm = yup
  .string()
  .required()
  .oneOf([yup.ref('password')], '패스워드가 일치하지 않습니다.');
const username = yup.string().required();

export const FORM_SCHEMAS = { email, password, passwordConfirm, username };

export const registerSchema = yup
  .object({
    email,
    password,
    passwordConfirm,
    username,
  })
  .required();

export const loginSchema = yup
  .object({
    email,
    password,
  })
  .required();

export const changePasswordSchema = yup
  .object({
    password,
    passwordConfirm,
  })
  .required();

export const validatePasswordSchema = yup
  .object({
    password,
  })
  .required();

export const profileSchema = yup
  .object({
    username,
  })
  .required();
