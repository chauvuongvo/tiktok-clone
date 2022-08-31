import PropTypes from 'prop-types';

import { useState, useEffect, useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './Inputs.module.scss';
import { ContextDefaultLogin } from '../DefaultLogin';
import {
  HidePasswordIcon,
  ShowPasswordIcon,
  TickPasswordIcon,
} from '~/components/Icons';

const cx = classNames.bind(styles);

function Password({ className }) {
  const [passwordValue, setPassword] = useState('');
  const [showTip, setShowTip] = useState(false);
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState({
    type: 'password',
    show: false,
  });

  const {
    header,
    setDisabledLogin,
    errorLoginPassword,
    setErrorLoginPassword,
  } = useContext(ContextDefaultLogin);
  useEffect(() => {
    if (error) setDisabledLogin(true);
    if (passwordValue.length <= 0) setDisabledLogin(true);
    if (!error && passwordValue.length > 0) {
      setDisabledLogin(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, passwordValue]);

  const handleSetPassword = (e) => {
    const password = e.target.value;
    setPassword(password);
    if (password.includes(' ')) {
      setError(true);
    } else setError(false);
  };

  const handleShowPassword = () => {
    if (showPassword.show) setShowPassword({ type: 'password', show: false });
    else setShowPassword({ type: 'text', show: true });
  };

  const handleFocusWhenReset = () => {
    if (header === 'Reset password') return setShowTip(true);
    if (errorLoginPassword) setErrorLoginPassword(false);
    return setShowTip(false);
  };

  return (
    <>
      <div className={cx('wrapper', className)}>
        <div className={cx('body')}>
          <div className={cx('input-container')}>
            <input
              value={passwordValue}
              type={showPassword.type || 'password'}
              name="password"
              autoComplete="new-password"
              placeholder="Password"
              onChange={handleSetPassword}
              onBlur={() => setShowTip(false)}
              onFocus={handleFocusWhenReset}
            />
          </div>

          <div className={cx('password-icon')} onClick={handleShowPassword}>
            {showPassword.show ? <ShowPasswordIcon /> : <HidePasswordIcon />}
          </div>
        </div>

        {error && <div className={cx('error')}>Invalid special character</div>}
        {errorLoginPassword && (
          <div className={cx('error')}>
            Incorrect password. Enter password: chauvuongvo
          </div>
        )}
      </div>
      {showTip && (
        <>
          <p className={cx('tip-desc')}>Your password must have:</p>
          <div className={cx('tip-text')}>
            <TickPasswordIcon />8 to 20 characters
          </div>
          <div className={cx('tip-text')}>
            <TickPasswordIcon />
            Letters, numbers, and special characters
          </div>
        </>
      )}
    </>
  );
}
Password.propTypes = {
  className: PropTypes.string,
};
export default Password;
