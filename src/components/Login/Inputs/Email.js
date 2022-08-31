import PropTypes from 'prop-types';
import { useState, useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './Inputs.module.scss';
import { ContextDefaultLogin } from '../DefaultLogin';

const cx = classNames.bind(styles);

function Email({ className }) {
  const [emailValue, setEmailValue] = useState('');
  const { errorLoginEmail, setErrorLoginEmail } =
    useContext(ContextDefaultLogin);

  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
  };

  return (
    <div className={cx('wrapper', className)}>
      <div className={cx('body')}>
        <div className={cx('input-container')}>
          <input
            value={emailValue}
            type="text"
            name="username"
            placeholder="Email or username"
            onChange={(e) => setEmailValue(e.target.value)}
            onFocus={() => setErrorLoginEmail(false)}
          />
        </div>
      </div>
      {errorLoginEmail && (
        <div className={cx('error')}>
          Enter email to login: chauvuong223068@gmail.com
        </div>
      )}
    </div>
  );
}

Email.propTypes = {
  className: PropTypes.string,
};

export default Email;
