import { useContext } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from '../DefaultLogin/DefaultLogin.module.scss';

import InputPassword from '../Inputs/Password';
import InputEmail from '../Inputs/Email';
import InputCode from '../Inputs/Code';
import { ContextDefaultLogin } from '../DefaultLogin';

const cx = classNames.bind(styles);

function ForgotPassword() {
  const { resetWithPhone } = useContext(ContextDefaultLogin);

  return (
    <>
      <div className={cx('form-desc')}>
        Enter email address
        <Link to="/login" className={cx('form-link')} onClick={resetWithPhone}>
          Reset with phone number
        </Link>
      </div>

      <InputEmail />

      <InputCode />

      <InputPassword />

      <div style={{ display: 'flex' }}></div>
    </>
  );
}

export default ForgotPassword;
