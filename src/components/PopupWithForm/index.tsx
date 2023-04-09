import React from 'react';
import { PopupWithFormPropsType } from './types';

const PopupWithForm: React.FC<PopupWithFormPropsType> = ({
  isOpen,
  name,
  title,
  onClose,
  onSubmit,
  children,
}) => {
  function handleClose() {
    onClose();
  }

  const closeByOverlay: React.MouseEventHandler = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const closeByEsc = React.useCallback((e: Event) => {
    const _e = e as KeyboardEvent;

    if (_e.key === 'Escape') {
      handleClose();
    }
  }, []);

  isOpen
    ? document.addEventListener('keydown', closeByEsc)
    : document.removeEventListener('keydown', closeByEsc);

  const formRef = React.useRef<HTMLFormElement>(null); //начальное значение?

  return (
    <div
      className={`popup popup_type_${name} ${isOpen ? 'popup_active' : ''}`}
      onClick={closeByOverlay}
    >
      <div className="popup__container">
        <button
          className="popup__close"
          type="button"
          title="Закрыть"
          onClick={handleClose}
        ></button>
        <form
          ref={formRef}
          className={`popup__form form form_type_${name}`}
          name="formEdit"
          onSubmit={onSubmit}
          action="/"
          noValidate
        >
          <h2 className="form__title">{title}</h2>
          {children}
        </form>
      </div>
    </div>
  );
};

export default PopupWithForm;
