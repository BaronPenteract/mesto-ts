import React, { RefObject } from "react";

export type ConfirmSubmitActionType = (
  submitButton: React.RefObject<HTMLButtonElement>,
  awaitText: string,
  originalText: string,
) => void

export type ConfirmPopupPropsType = {
  isOpen: boolean;
  onClose: () => void;
  confirmSubmitAction: ConfirmSubmitActionType
}