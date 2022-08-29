import { useContext } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from '../DefaultLogin/DefaultLogin.module.scss';

import InputPassword from '../Inputs/Password';
import InputSelectPhone from '../Inputs/Phone';
import InputCode from '../Inputs/Code';
import { ContextDefaultLogin } from '../DefaultLogin';

const cx = classNames.bind(styles);

function ForgotPassword() {
  const { resetWithEmail } = useContext(ContextDefaultLogin);

  return (
    <>
      <div className={cx('form-desc')}>
        Enter phone number
        <Link to="/login" className={cx('form-link')} onClick={resetWithEmail}>
          Reset with email
        </Link>
      </div>

      <InputSelectPhone />

      <InputCode />

      <InputPassword />
      <div style={{ display: 'flex' }}></div>
    </>
  );
}

export default ForgotPassword;
