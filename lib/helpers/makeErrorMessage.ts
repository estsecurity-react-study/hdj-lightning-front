import { FieldError, LiteralUnion, RegisterOptions } from 'react-hook-form';

type ErrorMessages = {
  [key in LiteralUnion<keyof RegisterOptions, string>]?: string;
};

interface Options {
  messages?: ErrorMessages;
  before?: string;
  after?: string;
}

const errorMatchMessages: ErrorMessages = {
  required: '이 값은 필수로 입력해야 합니다!',
  min: '최소 오류',
  max: '최대 오류',
  maxLength: '최대 길이 오류',
  minLength: '최소 길이 오류',
  pattern: '패턴 오류',
  validate: '검증 오류',
  valueAsNumber: '숫자 값 오류',
  valueAsDate: '날짜 값 오류',
  value: '값 오류',
  setValueAs: '?오류',
  shouldUnregister: '오류',
  onChange: '오류',
  onBlur: '오류',
  disabled: '오류',
  deps: '오류',
};

const makeErrorMessage = (error: FieldError | undefined, options?: Options) => {
  if (!error) {
    return;
  }

  return `${options?.before || ''}${
    options?.messages?.[error.type] ||
    errorMatchMessages[error.type] ||
    error.message
  }${options?.after || ''}`;
};

export default makeErrorMessage;
