import { RefObject } from "react";
import { UserType } from "../../contexts/UserType";

export type EditProfilePopupErrorsType = UserType;

export type OnUpdateUserType = (
  formValue: UserType,
  submitButton: RefObject<HTMLButtonElement>,
  awaitText: string,
  originalText: string
) => void

export type EditProfilePopupPropsType = {
  isOpen: boolean;
  onClose: () => void;
  onUpdateUser: OnUpdateUserType
}