import React from 'react';
import { Link } from 'react-router-dom';

import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import { RegisterErrorsType, RegisterPropsType, RegisterType } from './types';

const Register: React.FC<RegisterPropsType> = ({ onRegister }) => {
  const { values, handleChange, errors, isValid, setIsValid } = useFormAndValidation();

  const formValues = values as RegisterType;
  const formErrors = errors as RegisterErrorsType;

  const submitButton = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    setIsValid(false);
  }, []);

  const submitHandler: React.FormEventHandler = (e) => {
    e.preventDefault();

    if (submitButton.current?.textContent) {
      onRegister(formValues, submitButton, 'Регистрация...', submitButton.current.textContent);
    }
  };

  return (
    <main className="auth">
      <form
        className={`form-auth`}
        name="formRegister"
        onSubmit={submitHandler}
        action="/"
        noValidate
      >
        <h1 className="form-auth__title">Регистрация</h1>

        <fieldset className="form-auth__input-container">
          <label className="form-auth__label">
            <input
              className={`form-auth__input`}
              type="email"
              name="email"
              onChange={handleChange}
              value={formValues.email || ''}
              placeholder="Email"
              required
            />
            <span
              className={`form-auth__error ${formErrors.email ? 'form-auth__error_active' : ''}`}
            >
              {formErrors.email || ''}
            </span>
          </label>
          <label className="form-auth__label">
            <input
              className={`form-auth__input`}
              type="password"
              name="password"
              onChange={handleChange}
              value={formValues.password || ''}
              placeholder="Пароль"
              minLength={4}
              required
            />
            <span
              className={`form-auth__error ${formErrors.password ? 'form-auth__error_active' : ''}`}
            >
              {formErrors.password || ''}
            </span>
          </label>
        </fieldset>
        <div className="form-auth__footer">
          <button
            ref={submitButton}
            className={`form-auth__btn form-auth__btn_type_submit `}
            disabled={!isValid}
            type="submit"
          >
            Зарегистрироваться
          </button>
          <span className="form-auth__under-text">
            Уже зарегистрированы?{' '}
            <Link to="/sing-up" className="form-auth__link link">
              Войти
            </Link>
          </span>
        </div>
      </form>
    </main>
  );
};

export default Register;
