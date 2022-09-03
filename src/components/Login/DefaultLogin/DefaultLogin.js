import { useState, createContext, useMemo, useContext, useRef } from 'react';
import classNames from 'classnames/bind';

import { ContextApp } from '~/App';
import { ContextDefaultLayout } from '~/layouts/DefaultLayout/DefaultLayout';
import styles from './DefaultLogin.module.scss';
import Button from '~/components/Button';
import Phone from '../Phone';
import Email from '../Email';
import PhonePassword from '../PhonePassword';
import ResetWithPhone from '../ResetWithPhone';
import ResetWithEmail from '../ResetWithEmail';
import * as services from '~/services';

export const ContextDefaultLogin = createContext();

const cx = classNames.bind(styles);

function DefaultLogin({ type }) {
  const [header, setHeader] = useState('Log in');
  const [disabledSendCode, setDisabledSendCode] = useState(true);
  const [disabledLogin, setDisabledLogin] = useState(true);
  const [layout, setLayout] = useState(type);
  const [errorLoginPassword, setErrorLoginPassword] = useState(false);
  const [errorLoginEmail, setErrorLoginEmail] = useState(false);
  const [errorLoginPhone, setErrorLoginPhone] = useState(false);
  const [errorLoginCode, setErrorLoginCode] = useState(false);

  const formRef = useRef();

  const contextTrans = {
    disabledSendCode,
    errorLoginPassword,
    setErrorLoginPassword,
    header,
    setDisabledLogin,
    setLayout,
    resetWithPhone,
    resetWithEmail,
    loginWithPhone,
    loginWithEmail,
    loginWithPhonePassword,
    setDisabledSendCode,
    getRandomCode,
    errorLoginEmail,
    setErrorLoginEmail,
    errorLoginPhone,
    setErrorLoginPhone,
    errorLoginCode,
    setErrorLoginCode,
  };

  function getRandomCode() {
    const code = Math.floor(Math.random() * 900000 + 100000) + '';
    return code;
  }

  function loginWithPhone(e) {
    e.preventDefault();
    setHeader('Log in');
    setLayout('phone');
  }

  function resetWithPhone(e) {
    e.preventDefault();
    setLayout('forgot-with-phone');
    setHeader('Reset password');
  }

  function resetWithEmail(e) {
    e.preventDefault();
    setLayout('forgot-with-email');
    setHeader('Reset password');
  }

  function loginWithEmail(e) {
    e.preventDefault();
    setHeader('Log in');
    setLayout('email');
  }

  function loginWithPhonePassword(e) {
    e.preventDefault();
    setHeader('Log in');
    setLayout('phone-password');
  }

  const renderPage = useMemo(() => {
    switch (layout) {
      case 'email':
        return <Email />;

      case 'phone-password':
        return <PhonePassword />;

      case 'forgot-with-phone':
        return <ResetWithPhone />;

      case 'forgot-with-email':
        return <ResetWithEmail />;

      case 'phone':
      default:
        return <Phone />;
    }
  }, [layout]);

  const { setCurrentUser, setLocalStorage, keyLoginStorage } =
    useContext(ContextApp);
  const { setShowModalLogin } = useContext(ContextDefaultLayout);

  const loginUser = async (e) => {
    e.preventDefault();
    const form = formRef.current;
    const formData = new FormData(form);

    const info = {
      email: formData.get('username'),
      password: formData.get('password'),
    };
    const response = await services.authLogin(info, authError);

    if (response.data) {
      setCurrentUser(true);
      setShowModalLogin(false);
      setLocalStorage(keyLoginStorage, { status: true, ...response });
    }

    function authError() {
      setErrorLoginEmail(true);
      setErrorLoginPassword(true);
    }
  };

  return (
    <ContextDefaultLogin.Provider value={contextTrans}>
      <div className={cx('container')}>
        <form ref={formRef}>
          <header className={cx('header')}> {header} </header>

          {renderPage}

          <Button
            type={'submit'}
            primary
            disabled={disabledLogin}
            className={cx('login-btn')}
            onClick={loginUser}
          >
            Log in
          </Button>
        </form>
      </div>
    </ContextDefaultLogin.Provider>
  );
}

export default DefaultLogin;
