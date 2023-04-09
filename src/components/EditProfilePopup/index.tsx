import React from 'react';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import PopupWithForm from '../PopupWithForm';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import { EditProfilePopupErrorsType, EditProfilePopupPropsType } from './types';
import { UserType } from '../../contexts/UserType';

const EditProfilePopup: React.FC<EditProfilePopupPropsType> = ({
  isOpen,
  onClose,
  onUpdateUser,
}) => {
  const currentUser = React.useContext(CurrentUserContext);

  const { values, handleChange, errors, isValid, setValues, resetForm, setIsValid } =
    useFormAndValidation();

  const formValues = values as UserType;
  const formErrors = errors as EditProfilePopupErrorsType;

  const submitButton = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    resetForm();
    setValues(currentUser);
    setIsValid(true);
  }, [currentUser, isOpen]);

  const handleSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();

    if (submitButton.current?.textContent) {
      onUpdateUser(formValues, submitButton, 'Сохранение...', submitButton.current.textContent);
    }
  };

  return (
    <PopupWithForm
      name="edit-form"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <>
        <fieldset className="form__input-container">
          <label className="form__label">
            <input
              id="edit-name-input"
              className={`form__input ${formErrors.name ? 'form__input_type_error' : ''}`}
              type="text"
              name="name"
              placeholder="Имя"
              value={formValues.name || ''}
              onChange={handleChange}
              required
              minLength={2}
              maxLength={40}
            />
            <span className={`form__error ${formErrors.name ? 'form__error_active' : ''}`}>
              {formErrors.name || ''}
            </span>
          </label>
          <label className="form__label">
            <input
              id="edit-job-input"
              className={`form__input ${formErrors.about ? 'form__input_type_error' : ''}`}
              type="text"
              name="about"
              placeholder="О себе"
              value={formValues.about || ''}
              onChange={handleChange}
              required
              minLength={2}
              maxLength={200}
            />
            <span className={`form__error ${formErrors.about ? 'form__error_active' : ''}`}>
              {formErrors.about || ''}
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

export default EditProfilePopup;
