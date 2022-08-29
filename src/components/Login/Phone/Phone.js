import { useContext } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from '../DefaultLogin/DefaultLogin.module.scss';

import InputCode from '../Inputs/Code';
import InputSelectPhone from '../Inputs/Phone';
import { ContextDefaultLogin } from '../DefaultLogin';

const cx = classNames.bind(styles);

function Phone() {
  const { loginWithEmail, loginWithPhonePassword } =
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

      <InputCode />

      <Link
        to="/login"
        className={cx('form-link')}
        onClick={loginWithPhonePassword}
      >
        Log in with password
      </Link>
    </>
  );
}

export default Phone;
