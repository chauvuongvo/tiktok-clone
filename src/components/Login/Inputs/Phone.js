import { useState, useEffect, useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './Inputs.module.scss';

import { ContextDefaultLogin } from '../DefaultLogin';
import { ArrowInputSelectIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

function Phone({ className }) {
  const [phoneValue, setPhoneValue] = useState('');
  const [errorPhone, setErrorPhone] = useState(false);

  const { setDisabledSendCode, errorLoginPhone, setErrorLoginPhone } =
    useContext(ContextDefaultLogin);

  const handleValidate = (e) => {
    const phone = e.target.value;
    const regex = /[^0-9]/;
    const isValidatePhone = !!phone.match(regex);
    if (isValidatePhone) return setErrorPhone(true);

    return setErrorPhone(false);
  };

  useEffect(() => {
    if (errorPhone) setDisabledSendCode(true);
    else if (!!phoneValue.match(/[^0-9]/) || phoneValue === '')
      setDisabledSendCode(true);
    else setDisabledSendCode(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorPhone, phoneValue]);

  return (
    <div className={cx('wrapper', className)}>
      <div className={errorPhone ? cx('body', 'error-styles') : cx('body')}>
        <div className={cx('select-phone')}>
          <span className={cx('select-label')}>VN +84</span>
          <ArrowInputSelectIcon width="14" height="14" />
        </div>
        <div className={cx('input-container')}>
          <input
            value={phoneValue}
            type="text"
            name="mobile"
            placeholder="Phone number"
            onChange={(e) => setPhoneValue(e.target.value)}
            onFocus={() => {
              setErrorPhone(false);
              setErrorLoginPhone(false);
            }}
            onBlur={handleValidate}
          />
        </div>
      </div>

      {errorPhone && (
        <div className={cx('error')}>Enter a valid phone number</div>
      )}

      {errorLoginPhone && (
        <div className={cx('error')}>
          Enter phone number to login: 0389803622
        </div>
      )}
    </div>
  );
}

export default Phone;
