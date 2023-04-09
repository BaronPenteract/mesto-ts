import { RefObject } from "react";

export type AvatarType = {
  avatar: string;
}

export type EditAvatarPopupErrorsType = {
  avatar: string;
}

export type OnUpdateAvatarType = (
  formValue: AvatarType,
  submitButton: RefObject<HTMLButtonElement>,
  awaitText: string,
  originalText: string
) => void

export type EditAvatarPopupPropsType = {
  isOpen: boolean;
  onClose: () => void;
  onUpdateAvatar: OnUpdateAvatarType
}