import { CardType } from "../Card/types";

export type MainPropsType = {
  onEditProfile: () => void;
  onAddPlace: () => void;
  onEditAvatar: () => void;
  onCardClick: (card: CardType) => void;
  onCardDelete: (card: CardType) => void;
  onCardLike: (card: CardType) => void;
  cards: CardType[];
}