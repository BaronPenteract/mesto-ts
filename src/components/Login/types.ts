import { MutableRefObject, RefObject } from "react";

export type LoginType = {
  email: string;
  password: string;
}

export type LoginErrorsType = {
  email: string;
  password: string;
}

export type OnLoginType = (
  formValue: LoginType,
  submitButton: RefObject<HTMLButtonElement>,
  awaitText: string,
  originalText: string
) => void;

export type LoginPropsType = {
  onLogin: OnLoginType
}