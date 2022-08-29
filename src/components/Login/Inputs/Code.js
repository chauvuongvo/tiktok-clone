import PropTypes from 'prop-types';
import { useState, useEffect, useMemo, useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './Inputs.module.scss';

import { ErrorIcon } from '~/components/Icons';
import SendCodeBtn from './SendCodeBtn';
import { ContextDefaultLogin } from '../DefaultLogin';

const cx = classNames.bind(styles);

function Code({ className }) {
  const [codeValue, setCodeValue] = useState('');
  const [errorCode, setErrorCode] = useState(false);
  const [code, setCode] = useState('');

  const { disabledSendCode, setDisabledLogin } =
    useContext(ContextDefaultLogin);

  const handleGetCode = (code) => {
    setCode(code);
  };

  const handleValidateCode = (e) => {
    const code = e.target.value;
    if (code.length !== 6 && code.length !== 0) return setErrorCode(true);

    const regex = /[^0-9]/;
    const isValidateCode = !!code.match(regex);
    if (isValidateCode) return setErrorCode(true);

    return setErrorCode(false);
  };

  useEffect(() => {
    if (
      disabledSendCode ||
      codeValue.length !== 6 ||
      !!codeValue.match(/[^0-9]/)
    ) {
      setDisabledLogin(true);
    } else {
      setDisabledLogin(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disabledSendCode, codeValue]);

  return (
    <div className={cx('wrapper', className)}>
      <div className={cx('body', 'body-code')}>
        <div
          className={
            errorCode
              ? cx('input-container', 'error-styles')
              : cx('input-container')
          }
        >
          <input
            value={codeValue}
            type="text"
            placeholder="Enter 6-digit code"
            onChange={(e) => setCodeValue(e.target.value)}
            onFocus={() => setErrorCode(false)}
            onBlur={handleValidateCode}
          />
          {errorCode && (
            <div className={cx('error-icon')}>
              <ErrorIcon />
            </div>
          )}
        </div>
        <SendCodeBtn disabled={disabledSendCode} onGetCode={handleGetCode} />
      </div>
      {errorCode && (
        <div className={cx('error')}>
          {code ? `Enter code: ${code}` : 'Enter 6-digit code'}
        </div>
      )}
    </div>
  );
}

Code.propTypes = {
  className: PropTypes.string,
};

export default Code;
