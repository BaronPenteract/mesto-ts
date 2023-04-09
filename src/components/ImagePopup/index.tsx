import React from 'react';
import { ImagePopupPropsType } from './types';

const ImagePopup: React.FC<ImagePopupPropsType> = ({ isOpen, card, onClose }) => {
  const closeByOverlay: React.MouseEventHandler = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const closeByEsc = React.useCallback((e: Event) => {
    const _e = e as KeyboardEvent;

    if (_e.key === 'Escape') {
      onClose();
    }
  }, []);

  isOpen
    ? document.addEventListener('keydown', closeByEsc)
    : document.removeEventListener('keydown', closeByEsc);

  return (
    <div
      className={`popup popup_type_image ${isOpen ? 'popup_active' : ''}`}
      onClick={closeByOverlay}
    >
      <div className="popup__container">
        <button className="popup__close" type="button" title="Закрыть" onClick={onClose}></button>
        <img className="popup__image" src={card?.link} alt={card?.name} />
        <h2 className="popup__title">{card?.name}</h2>
      </div>
    </div>
  );
};

export default ImagePopup;
