import { RefObject } from "react";
import { CardType } from "../Card/types";

export type AddPlacePopupErrorsType = {
  name: string;
  link: string;
}

export type OnAddPlaceType = (
  formValue: CardType,
  submitButton: RefObject<HTMLButtonElement>,
  awaitText: string,
  originalText: string
) => void

export type AddPlacePopupPropsType = {
  isOpen: boolean;
  onClose: () => void;
  onAddPlace: OnAddPlaceType
}