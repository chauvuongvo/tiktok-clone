import { useContext } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import InputPassword from '../Inputs/Password';
import InputEmail from '../Inputs/Email';
import { ContextDefaultLogin } from '../DefaultLogin';
import styles from '../DefaultLogin/DefaultLogin.module.scss';

const cx = classNames.bind(styles);

function Email() {
  const { loginWithPhone, resetWithEmail } = useContext(ContextDefaultLogin);

  return (
    <>
      <div className={cx('form-desc')}>
        Email
        <Link to="/login" className={cx('form-link')} onClick={loginWithPhone}>
          Log in with phone
        </Link>
      </div>

      <InputEmail />

      <InputPassword loginEmail />

      <Link to="/login" className={cx('form-link')} onClick={resetWithEmail}>
        Forgot password
      </Link>
    </>
  );
}

export default Email;
