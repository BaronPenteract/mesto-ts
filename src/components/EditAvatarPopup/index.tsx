import React from 'react';

import PopupWithForm from '../PopupWithForm';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import { AvatarType, EditAvatarPopupErrorsType, EditAvatarPopupPropsType } from './types';

const EditAvatarPopup: React.FC<EditAvatarPopupPropsType> = ({
  isOpen,
  onClose,
  onUpdateAvatar,
}) => {
  const submitButton = React.useRef<HTMLButtonElement>(null);

  const { values, handleChange, errors, isValid, setValues, resetForm, setIsValid } =
    useFormAndValidation();

  const formValues = values as AvatarType;
  const formErrors = errors as EditAvatarPopupErrorsType;

  React.useEffect(() => {
    setValues({});
    resetForm();
    setIsValid(false);
  }, [isOpen]);

  const handleSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();

    if (submitButton.current?.textContent) {
      onUpdateAvatar(formValues, submitButton, 'Сохранение...', submitButton.current.textContent);
    }
  };

  return (
    <PopupWithForm
      name="avatar-form"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <>
        <fieldset className="form__input-container">
          <label className="form__label">
            <input
              id="avatar-url-input"
              className={`form__input ${formErrors.avatar ? 'form__input_type_error' : ''}`}
              type="url"
              name="avatar"
              value={formValues.avatar || ''}
              onChange={handleChange}
              placeholder="Ссылка на аватар"
              required
            />
            <span className={`form__error ${formErrors.avatar ? 'form__error_active' : ''}`}>
              {formErrors.avatar || ''}
            </span>
          </label>
        </fieldset>
        <button
          ref={submitButton}
          className={`form__btn form__btn_type_submit ${!isValid ? 'form__btn_disabled' : ''}`}
          disabled={!isValid}
          type="submit"
        >
          Сохранить
        </button>
      </>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
