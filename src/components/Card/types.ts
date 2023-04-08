import { UserType } from "../../contexts/UserType";

export type CardType = {
  createdAt: string;
  likes: UserType[];
  link: string;
  name: string;
  owner: UserType;
  _id: string
}

export type CardPropsType = CardType & {
  onCardClick: () => void;
  onCardLike: () => void;
  onCardDelete: () => void;
}