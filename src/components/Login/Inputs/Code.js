import PropTypes from 'prop-types';
import { useState, useEffect, useContext } from 'react';
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

  const {
    disabledSendCode,
    setDisabledLogin,
    errorLoginCode,
    setErrorLoginCode,
  } = useContext(ContextDefaultLogin);

  const handleGetCode = (code) => {
    alert(`Enter code to login: ${code}`);
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

  const renderMessageCode = () => {
    if (errorLoginCode)
      return 'Verification failed. Please click Resend and try again.';

    if (errorCode) return code ? `Enter code: ${code}` : 'Enter 6-digit code';
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
            errorCode || errorLoginCode
              ? cx('input-container', 'error-styles')
              : cx('input-container')
          }
        >
          <input
            value={codeValue}
            type="text"
            placeholder="Enter 6-digit code"
            onChange={(e) => setCodeValue(e.target.value)}
            onFocus={() => {
              setErrorCode(false);
              setErrorLoginCode(false);
            }}
            onBlur={handleValidateCode}
            name="code"
          />
          {errorCode ||
            (errorLoginCode && (
              <div className={cx('error-icon')}>
                <ErrorIcon />
              </div>
            ))}
        </div>
        <SendCodeBtn disabled={disabledSendCode} onSetCode={handleGetCode} />
      </div>
      <div className={cx('error')}>{renderMessageCode()}</div>
    </div>
  );
}

Code.propTypes = {
  className: PropTypes.string,
};

export default Code;
