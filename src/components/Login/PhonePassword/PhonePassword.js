import { useContext } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from '../DefaultLogin/DefaultLogin.module.scss';

import InputPassword from '../Inputs/Password';
import InputSelectPhone from '../Inputs/Phone';
import { ContextDefaultLogin } from '../DefaultLogin';

const cx = classNames.bind(styles);

function PhonePassword() {
  const { loginWithPhone, loginWithEmail, resetWithPhone } =
    useContext(ContextDefaultLogin);

  return (
    <>
      <div className={cx('form-desc')}>
        Phone
        <Link to="/login" className={cx('form-link')} onClick={loginWithEmail}>
          Log in with email or username
        </Link>
      </div>

      <InputSelectPhone />

      <InputPassword />

      <div className={cx('link-container')}>
        <Link to="/login" className={cx('form-link')} onClick={resetWithPhone}>
          Forgot password
        </Link>

        <span className={cx('split-line')}></span>

        <Link to="/login" className={cx('form-link')} onClick={loginWithPhone}>
          Log in with code
        </Link>
      </div>
    </>
  );
}

export default PhonePassword;
