import React from 'react';

import PopupWithForm from '../PopupWithForm';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import { AddPlacePopupErrorsType, AddPlacePopupPropsType } from './types';
import { CardType } from '../Card/types';

const AddPlacePopup: React.FC<AddPlacePopupPropsType> = ({ isOpen, onClose, onAddPlace }) => {
  const submitButton = React.useRef<HTMLButtonElement>(null);

  const { values, handleChange, errors, isValid, setValues, resetForm, setIsValid } =
    useFormAndValidation();

  const formValues = values as CardType;
  const formErrors = errors as AddPlacePopupErrorsType;

  React.useEffect(() => {
    setValues({});
    resetForm();
    setIsValid(false);
  }, [isOpen]);

  const handleAddPlaceSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();

    if (submitButton.current?.textContent) {
      onAddPlace(formValues, submitButton, 'Создание...', submitButton.current.textContent);
    }
  };

  return (
    <PopupWithForm
      name="add-form"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleAddPlaceSubmit}
    >
      <>
        <fieldset className="form__input-container">
          <label className="form__label">
            <input
              id="add-name-input"
              className={`form__input ${formErrors.name ? 'form__input_type_error' : ''}`}
              type="text"
              name="name"
              value={formValues.name || ''}
              onChange={handleChange}
              placeholder="Название"
              required
              minLength={2}
              maxLength={30}
            />
            <span className={`form__error ${formErrors.name ? 'form__error_active' : ''}`}>
              {formErrors.name || ''}
            </span>
          </label>
          <label className="form__label">
            <input
              id="add-url-input"
              className={`form__input ${formErrors.link ? 'form__input_type_error' : ''}`}
              type="url"
              name="link"
              value={formValues.link || ''}
              onChange={handleChange}
              placeholder="Ссылка на картинку"
              required
            />
            <span className={`form__error ${formErrors.link ? 'form__error_active' : ''}`}>
              {formErrors.link || ''}
            </span>
          </label>
        </fieldset>
        <button
          ref={submitButton}
          className={`form__btn form__btn_type_submit ${!isValid ? 'form__btn_disabled' : ''}`}
          disabled={!isValid}
          type="submit"
        >
          Создать
        </button>
      </>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
