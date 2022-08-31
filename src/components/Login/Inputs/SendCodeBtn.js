import { useState, useEffect, useRef, useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './Inputs.module.scss';
import { ContextDefaultLogin } from '../DefaultLogin';
import { LoadingLoginIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

function SendCodeBtn({ disabled, onSetCode }) {
  const { getRandomCode } = useContext(ContextDefaultLogin);
  const [disabledBtn, setDisabledBtn] = useState(disabled);
  const [title, setTitle] = useState('Send code');
  const [startCount, setStartCount] = useState(false);
  const [sendLoading, setSendLoading] = useState(false);
  const [countDown, setCountDown] = useState(10);

  const sendBtnRef = useRef();

  useEffect(() => {
    setDisabledBtn(disabled);
  }, [disabled]);

  useEffect(() => {
    const DOM_SEND_SEND = sendBtnRef.current;

    const handleSendCode = (e) => {
      setDisabledBtn(true);
      setSendLoading(true);
      setTitle('Resend code');

      setTimeout(() => {
        setStartCount(true);
        setCountDown(10);
        setSendLoading(false);
        onSetCode(getRandomCode());
      }, 2000);
    };

    DOM_SEND_SEND.addEventListener('click', handleSendCode);

    return () => {
      DOM_SEND_SEND.removeEventListener('click', handleSendCode);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (startCount) {
      const timerId = setTimeout(() => {
        setCountDown(countDown - 1);
      }, 1000);

      if (countDown <= 0) {
        clearTimeout(timerId);
        setDisabledBtn(false);
      }

      return () => clearTimeout(timerId);
    }
  }, [startCount, countDown]);

  const renderTitle = () => {
    if (title === 'Send code') return title;
    if (sendLoading)
      return (
        <>
          {title} <LoadingLoginIcon className={cx('loading-icon')} />
        </>
      );

    if (countDown !== 0)
      return (
        <>
          {title}: {countDown}s
        </>
      );

    return title;
  };

  return (
    <div className={cx('send-container')}>
      <button
        ref={sendBtnRef}
        type="button"
        disabled={disabledBtn}
        className={cx('send-btn')}
      >
        {renderTitle()}
      </button>
    </div>
  );
}

export default SendCodeBtn;
