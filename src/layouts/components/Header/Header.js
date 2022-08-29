import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faPlus } from '@fortawesome/free-solid-svg-icons';

import { ContextApp } from '~/App';
import { ContextDefaultLayout } from '~/layouts/DefaultLayout';
import styles from './Header.module.scss';
import config from '~/config';
import Search from '../Search';
import Button from '~/components/Button';
import images from '~/assets/images';
import Menu from '~/components/Popper/Menu';
import Login from '~/components/Modal/Login';
import Image from '~/components/Image';
import {
  CoinIcon,
  FeedbackIcon,
  InboxIcon,
  KeyboardIcon,
  LanguageIcon,
  MessageIcon,
  SettingIcon,
  SignOutIcon,
  UserIcon,
} from '~/components/Icons/Icons';
import Portal from '~/components/Portal';

const cx = classNames.bind(styles);

const MENU_ITEM_LIST = [
  {
    icon: <LanguageIcon width={20} height={20} />,
    title: 'English',
    children: {
      title: 'Language',
      data: [
        {
          type: 'language',
          code: 'en',
          title: 'English',
        },
        {
          type: 'language',
          code: 'vi',
          title: 'Tiếng Việt',
        },
      ],
    },
  },
  {
    icon: <FeedbackIcon width={20} height={20} />,
    title: 'Feedback and help',
    to: '/feedback',
  },
  {
    icon: <KeyboardIcon width={20} height={20} />,
    title: 'Keyboard and shortcuts',
  },
];

const USER_MENU_ITEM_LIST = [
  {
    icon: <UserIcon width={20} height={20} />,
    title: 'View profile',
  },
  {
    icon: <CoinIcon width={20} height={20} />,
    title: 'Get coins',
  },
  {
    icon: <SettingIcon width={20} height={20} />,
    title: 'Settings',
  },
  ...MENU_ITEM_LIST,
  {
    icon: <SignOutIcon width={20} height={20} />,
    title: 'Log out',
    separate: true,
    isLogout: true,
  },
];

const handleChangeMenu = (menuItem) => {
  switch (menuItem.type) {
    case 'language':
      // Handle language
      break;
    default:
  }
};

function Header() {
  const { userInfo, currentUser } = useContext(ContextApp);
  const { showModalLogin, setShowModalLogin } =
    useContext(ContextDefaultLayout);

  const tippyProps = {
    appendTo: () => document.getElementById('header'),
  };

  return (
    <header className={cx('wrapper')} id="header">
      <div className={cx('content')}>
        <Link to={config.routes.home} className={cx('logo')}>
          <Image src={images.logo} alt="Tiktok" />
        </Link>

        <Search />

        <div className={cx('actions')}>
          <div id="following"></div>
          <Button leftIcon={<FontAwesomeIcon icon={faPlus} />}>Upload</Button>

          {currentUser ? (
            <>
              <Tippy content="Message" {...tippyProps}>
                <button className={cx('send-icon')}>
                  <MessageIcon width="2.6rem" height="2.6rem" />
                </button>
              </Tippy>
              <div className={cx('inbox')}>
                <Tippy content="Inbox" {...tippyProps}>
                  <button className={cx('inbox-icon')}>
                    <InboxIcon />
                  </button>
                </Tippy>
                {!!userInfo.inbox && (
                  <div className={cx('inbox-quantity')}>{userInfo.inbox}</div>
                )}
              </div>
            </>
          ) : (
            <Button primary onClick={() => setShowModalLogin(true)}>
              Log in
            </Button>
          )}

          <Menu
            data={{ USER_MENU_ITEM_LIST, MENU_ITEM_LIST }}
            onChange={handleChangeMenu}
          >
            {currentUser ? (
              <Image
                src={userInfo.avatar}
                className={cx('user-avatar')}
                alt={userInfo.name}
              />
            ) : (
              <button className={cx('see-more')}>
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </button>
            )}
          </Menu>
        </div>
      </div>
      {showModalLogin && (
        <Portal containerId={'root'}>
          <Login onCloseModal={() => setShowModalLogin(false)} />
        </Portal>
      )}
    </header>
  );
}

export default Header;
