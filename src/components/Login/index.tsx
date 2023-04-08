import React from 'react';

import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import { LoginPropsType, LoginType } from './types';

const Login: React.FC<LoginPropsType> = ({ onLogin }) => {
  const { values, handleChange, errors, isValid, setIsValid } = useFormAndValidation();

  const formValues = values as LoginType;
  const formErrors = errors as LoginType;

  const submitButton = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    setIsValid(false);
  }, []);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    if (submitButton.current && submitButton.current.textContent) {
      onLogin(formValues, submitButton, 'Подождите...', submitButton.current.textContent);
    }
  };

  return (
    <main className="auth">
      <form className={`form-auth`} name="formLogin" onSubmit={submitHandler} action="/" noValidate>
        <h1 className="form-auth__title">Вход</h1>

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
            Войти
          </button>
          <span className="form-auth__under-text"></span>
        </div>
      </form>
    </main>
  );
};

export default Login;
