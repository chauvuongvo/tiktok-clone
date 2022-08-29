import { useContext, useState } from 'react';
import classNames from 'classnames/bind';

import { ContextDefaultLayout } from '~/layouts/DefaultLayout';
import styles from './Login.module.scss';
import ModalWrapper from '~/components/Modal';
import Button from '~/components/Button';
import QrCode from '~/components/Login/QrCode';
import ActionLogin from '~/components/Login/ActionLogin';
import DefaultLogin from '~/components/Login/DefaultLogin';
import {
  ArrowLeftIcon,
  CloseIcon,
  QrLoginIcon,
  UserLoginIcon,
  FacebookLoginIcon,
  GoogleLoginIcon,
  TwitterLoginIcon,
  InstagramLoginIcon,
  LineLoginIcon,
  KakaoTalkIcon,
  AppleLoginIcon,
} from '~/components/Icons';

const cx = classNames.bind(styles);

function Login() {
  const { setShowModalLogin } = useContext(ContextDefaultLayout);
  document.title = 'Log in | TikTok';
  const [page, setPage] = useState(1);
  const [pageType, setPageType] = useState('');
  const loginList = [
    {
      icon: <QrLoginIcon />,
      title: 'Use QR code',
      nextPage: () => {
        setPage(2);
        setPageType('qr-code');
      },
    },
    {
      icon: <UserLoginIcon />,
      title: 'Use phone / email / username',
      nextPage: () => {
        setPage(2);
        setPageType('phone');
      },
    },
    {
      icon: <FacebookLoginIcon />,
      title: 'Continue with Facebook',
    },
    {
      icon: <GoogleLoginIcon />,
      title: 'Continue with Google',
    },
    {
      icon: <TwitterLoginIcon />,
      title: 'Continue with Twitter',
    },
    {
      icon: <LineLoginIcon />,
      title: 'Continue with LINE',
    },
    {
      icon: <KakaoTalkIcon />,
      title: 'Continue with KakaoTalk',
    },
    {
      icon: <AppleLoginIcon />,
      title: 'Continue with Apple',
    },
    {
      icon: <InstagramLoginIcon />,
      title: 'Continue with Instagram',
    },
  ];

  const handleBack = () => {
    setPage(1);
  };

  const renderNextPage = () => {
    switch (pageType) {
      case 'qr-code':
        return <QrCode />;

      default:
        return <DefaultLogin type={pageType} onChangePage={setPage} />;
    }
  };

  return (
    <ModalWrapper>
      <div className={cx('wrapper')}>
        {page > 1 && (
          <div className={cx('back-btn')} onClick={handleBack}>
            <ArrowLeftIcon width="24" height="24" />
          </div>
        )}

        <div className={cx('content-body')}>
          {page <= 1 ? <ActionLogin data={loginList} /> : renderNextPage()}
        </div>

        <footer className={cx('footer')}>
          <div className={cx('text')}> Don’t have an account?</div>
          <Button to={'/signup'} inline primary className={cx('signup-btn')}>
            Sign up
          </Button>
        </footer>

        <div
          className={cx('close-btn')}
          onClick={() => {
            setShowModalLogin(false);
            setPage(1);
          }}
        >
          <CloseIcon />
        </div>
      </div>
    </ModalWrapper>
  );
}

export default Login;
