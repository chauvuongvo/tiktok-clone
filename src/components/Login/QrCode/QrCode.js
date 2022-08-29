import classNames from 'classnames/bind';
import styles from './QrCode.module.scss';

import Image from '~/components/Image';
import images from '~/assets/images';
import { RefreshIcon, AddUserIcon, ScanQRCodeIcon } from '~/components/Icons';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function QrCode() {
  const [showCode, setShowCode] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleReloadQrCode = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowCode(true);
    }, 1500);
  };

  useEffect(() => {
    if (showCode) {
      const timerId = setTimeout(() => {
        setShowCode(false);
      }, 5000);

      return () => clearTimeout(timerId);
    }
  }, [showCode]);

  return (
    <div className={cx('container')}>
      <div className={cx('qr-code-body')}>
        <div className={cx('text-container')}>
          <div className={cx('image')}>
            <Image
              src={images.qrCode}
              alt="QR Code"
              className={cx('qr-code')}
            />
            {!showCode && (
              <div className={cx('code-mask')}>
                <p className={cx('mask-tip')}>QR code expired </p>
                <button
                  className={cx('refresh-btn')}
                  onClick={handleReloadQrCode}
                >
                  <RefreshIcon
                    width="16"
                    height="16"
                    className={
                      loading
                        ? cx('refresh-icon', 'animation')
                        : cx('refresh-icon')
                    }
                  />
                </button>
              </div>
            )}
          </div>
          <div className={cx('step-container')}>
            <p className={cx('step')}>
              1. Open the TikTok app on your mobile device{' '}
            </p>
            <p className={cx('step')}>
              2. On Profile, tap
              <AddUserIcon />
            </p>
            <p className={cx('step')}>
              3. Tap
              <ScanQRCodeIcon />
              and scan the QR code to confirm your login
            </p>
          </div>
        </div>
        <Image
          src="https://lf16-tiktok-web.ttwstatic.com/obj/tiktok-web/tiktok/webapp/main/webapp-desktop/b6d3cc69d3525571aef0.gif"
          alt="QR Code Tip"
          className={cx('img-tip')}
        />
      </div>
    </div>
  );
}

export default QrCode;
