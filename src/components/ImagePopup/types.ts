import { CardType } from "../Card/types";

export type ImagePopupPropsType = {
  isOpen: boolean;
  onClose: () => void;
  card: CardType | null
}