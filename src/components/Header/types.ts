export type OnSingOutType = () => void;

export type HeaderPropsType = {
  email: string;
  onSingOut: OnSingOutType
}