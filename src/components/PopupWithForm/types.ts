import React, { RefObject } from "react";

export type PopupWithFormPropsType = { 
  isOpen: boolean;
  name: string;
  title: string;
  onClose: () => void;
  onSubmit: React.FormEventHandler;
  children: React.ReactNode 
}