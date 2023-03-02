import * as yup from 'yup';

export const chatSchema = yup.object({
  text: yup.string().required().trim(),
});
