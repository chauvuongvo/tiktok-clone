import { useState, createContext, useMemo, useContext, useEffect } from 'react';
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

export const ContextDefaultLogin = createContext();

const cx = classNames.bind(styles);

function DefaultLogin({ type }) {
  const [header, setHeader] = useState('Log in');
  const [disabledSendCode, setDisabledSendCode] = useState(true);
  const [disabledLogin, setDisabledLogin] = useState(true);
  const [layout, setLayout] = useState(type);

  const contextTrans = {
    disabledSendCode,
    header,
    setDisabledLogin,
    setLayout,
    resetWithPhone,
    resetWithEmail,
    loginWithPhone,
    loginWithEmail,
    loginWithPhonePassword,
    setDisabledSendCode,
  };

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
  const loginUser = (e) => {
    e.preventDefault();
    setCurrentUser(true);
    setShowModalLogin(false);
    setLocalStorage(keyLoginStorage, { status: true });
  };

  return (
    <ContextDefaultLogin.Provider value={contextTrans}>
      <div className={cx('container')}>
        <form>
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
