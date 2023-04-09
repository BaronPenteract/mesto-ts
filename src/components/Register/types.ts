import { RefObject } from "react";

export type RegisterType = {
  email: string;
  password: string;
}

export type RegisterErrorsType = {
  email: string;
  password: string;
}

export type OnRegisterType = (
  formValue: RegisterType,
  submitButton: RefObject<HTMLButtonElement>,
  awaitText: string,
  originalText: string
) => void;

export type RegisterPropsType = {
  onRegister: OnRegisterType
}