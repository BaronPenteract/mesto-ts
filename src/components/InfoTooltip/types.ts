export type InfoTooltipPropsType = {
  isOpen: boolean;
  onClose: () => void;
  infoToolTipContent: {
    image: string;
    text: string;
  }
}