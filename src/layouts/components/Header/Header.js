import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faPlus } from '@fortawesome/free-solid-svg-icons';

import styles from './Header.module.scss';
import config from '~/config';
import Search from '../Search';
import Button from '~/components/Button';
import images from '~/assets/images';
import Menu from '~/components/Popper/Menu';
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
import Image from '~/components/Image';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const currentUser = {
  status: true,
  inbox: 10,
};
const USER_INFO = {
  avatar:
    'https://p16-sign-sg.tiktokcdn.com/tos-alisg-avt-0068/ddcb57a7bcd8bf0fc01c18338b2caf59~c5_300x300.webp?x-expires=1658336400&x-signature=5OSkCnty7LLEWxSmXl0gLWxwx0s%3D',
  name: 'user-avatar',
};

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
  return (
    <header className={cx('wrapper')}>
      <div className={cx('content')}>
        <Link to={config.routes.home} className={cx('logo')}>
          <Image src={images.logo} alt="Tiktok" />
        </Link>

        <Search />

        <div className={cx('actions')}>
          <Button leftIcon={<FontAwesomeIcon icon={faPlus} />}>Upload</Button>

          {currentUser.status ? (
            <>
              <Tippy content="Message">
                <button className={cx('send-icon')}>
                  <MessageIcon width="2.6rem" height="2.6rem" />
                </button>
              </Tippy>
              <div className={cx('inbox')}>
                <Tippy content="Inbox">
                  <button className={cx('inbox-icon')}>
                    <InboxIcon />
                  </button>
                </Tippy>
                {!!currentUser.inbox && (
                  <div className={cx('inbox-quantity')}>
                    {currentUser.inbox}
                  </div>
                )}
              </div>
            </>
          ) : (
            <Button primary>Log in</Button>
          )}

          <Menu
            items={currentUser.status ? USER_MENU_ITEM_LIST : MENU_ITEM_LIST}
            onChange={handleChangeMenu}
          >
            {currentUser.status ? (
              <Image
                src={USER_INFO.avatar}
                className={cx('user-avatar')}
                alt={USER_INFO.name}
              />
            ) : (
              <button className={cx('see-more')}>
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </button>
            )}
          </Menu>
        </div>
      </div>
    </header>
  );
}

export default Header;
