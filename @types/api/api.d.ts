import { AxiosError } from 'axios';

interface ServerError {
  error: string;
  message: string;
  statusCode: number;
}

export interface MyApiError extends AxiosError<ServerError> {}
