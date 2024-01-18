import React, { KeyboardEvent } from 'react';
import { Navigate } from "react-router-dom";
import useEnterKeyHandler from "../hooks/useKeyHandler";
import useAuth from "../hooks/useAuth";
import Loading from "../components/loading";
import "../Auth.css";

const openEyeIcon = process.env.PUBLIC_URL + "/assets/image/eye-open.png";
const closeEyeIcon = process.env.PUBLIC_URL + "/assets/image/eye-close.png";

const RegistrationPage = () => {
  const {
    loginRef,
    passwordRef,
    errorRef,
    emailRef,
    nameRef,
    registrationSuccess,
    showPassword,
    isLoading,
    handleRegistration,
    togglePasswordVisibility,
  } = useAuth();

   const handleTabKey = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      if (event.target === null) {
        loginRef.current?.focus();
      } else if (event.target === loginRef.current) {
        nameRef.current?.focus();
      }else if(event.target === nameRef.current) {
        emailRef.current?.focus();
      }else if(event.target === emailRef.current) {
        passwordRef.current?.focus();
      }else if(event.target === passwordRef.current) {
        loginRef.current?.focus();
      }
    }
  };
  useEnterKeyHandler(13, handleRegistration);

  return (
    <>
      {isLoading && <Loading />}
      <div className="title">
        КИБОРГИ <br /> ТЕПЕРЬ В 2D
      </div>
      <div className="content">
        <h1>Регистрация</h1>
        <div className="input-form">
          <input
            type="text"
            id="login"
            name="login"
            className="input"
            placeholder="Логин"
            ref={loginRef}
            onKeyDown={handleTabKey}
          />
          <input
            type="text"
            id="name"
            name="name"
            className="input"
            placeholder="Имя"
            ref={nameRef}
            onKeyDown={handleTabKey}
          />
          <input
            type="text"
            id="email"
            name="email"
            className="input"
            placeholder="Почта"
            ref={emailRef}
            onKeyDown={handleTabKey}
          />
          <div className="password-input-container">
            <input
              type="password"
              id="password"
              name="password"
              className="input"
              placeholder="Пароль"
              ref={passwordRef}
              onKeyDown={handleTabKey}
            />
            <button
              className="show-password-button"
              onClick={togglePasswordVisibility}
            >
              <img
                src={showPassword ? openEyeIcon : closeEyeIcon}
                className="eyeIcon"
                alt="Eye Icon"
              />
            </button>
            <div ref={errorRef} className="errorDiv" tabIndex={6}></div>
          </div>
          <button onClick={() => handleRegistration()} tabIndex={7}>
            <h1>Зарегистрироваться</h1>
          </button>
        </div>
        {registrationSuccess ? <Navigate to="/login" replace={true} /> : null}
      </div>
    </>
  );
};

export default RegistrationPage;