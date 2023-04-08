import { MutableRefObject, RefObject } from "react";

export type LoginType = {
  email: string;
  password: string;
}

export type LoginPropsType = {
  onLogin: (
    formValue: LoginType,
    submitButton: RefObject<HTMLButtonElement>,
    awaitText: string,
    originalText: string) => void;
}