import PropTypes from 'prop-types';
import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Inputs.module.scss';

const cx = classNames.bind(styles);

function Email({ className }) {
  const [emailValue, setEmailValue] = useState('');

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
          />
        </div>
      </div>
    </div>
  );
}

Email.propTypes = {
  className: PropTypes.string,
};

export default Email;
