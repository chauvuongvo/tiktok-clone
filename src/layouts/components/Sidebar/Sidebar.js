import { useEffect, useRef, useContext } from 'react';
import classNames from 'classnames/bind';

import { ContextApp } from '~/App';
import { ContextDefaultLayout } from '~/layouts/DefaultLayout';
import Menu from './Menu';
import styles from './Sidebar.module.scss';
import config from '~/config';
import SuggestedAccounts from '~/components/SuggestedAccounts';
import accounts from '~/assets/data/accounts';
import Following from './Following';
import Discover from './Discover';
import Footer from './Footer';
import Button from '~/components/Button';
import {
  GroupIcon,
  GroupIconActive,
  HomeIcon,
  HomeIconActive,
  LiveIcon,
  LiveIconActive,
} from '~/components/Icons';

const cx = classNames.bind(styles);

function Sidebar() {
  const { currentUser } = useContext(ContextApp);
  const { setShowModalLogin } = useContext(ContextDefaultLayout);
  const isFollowingPage = window.location.pathname === config.routes.following;
  const menuList = [
    {
      icon: <HomeIcon width={32} height={32} />,
      iconActive: <HomeIconActive width={32} height={32} />,
      title: 'For You',
      to: config.routes.home,
    },
    {
      icon: <GroupIcon width={32} height={32} />,
      iconActive: <GroupIconActive width={32} height={32} />,
      title: 'Following',
      to: config.routes.following,
    },
    {
      icon: <LiveIcon width={32} height={32} />,
      iconActive: <LiveIconActive width={32} height={32} />,
      title: 'LIVE',
      to: config.routes.live,
    },
  ];

  const { recommends, followings } = accounts;
  const suggestedAccountList = recommends.data.suggestedAccountList.map(
    (item) => item.cardItem,
  );
  const followingList = followings.data;

  const sidebarRef = useRef('sidebar');

  useEffect(() => {
    const DOM_SIDEBAR = sidebarRef.current;
    const handleScroll = () => {
      document.querySelectorAll('[data-tippy-root]').forEach(function (el) {
        el._tippy && el._tippy.hide();
      });
    };
    DOM_SIDEBAR.addEventListener('scroll', handleScroll);

    return () => {
      DOM_SIDEBAR.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const renderSuggestAccount = () => {
    if (!currentUser) {
      if (isFollowingPage) return null;
    }
    return (
      <SuggestedAccounts
        data={suggestedAccountList}
        className={cx('separate')}
        isSidebar
      />
    );
  };

  return (
    <aside className={cx('wrapper')} id="sidebar">
      <div ref={sidebarRef} className={cx('content')}>
        <Menu menuList={menuList} />
        {!currentUser && (
          <div className={cx('login-container', 'separate', 'response-hidden')}>
            <p className={cx('login-title')}>
              Log in to follow creators, like videos, and view comments.
            </p>
            <Button
              outline
              large
              className={cx('login-btn')}
              onClick={() => setShowModalLogin(true)}
            >
              Log in
            </Button>
          </div>
        )}

        {renderSuggestAccount()}

        {currentUser && (
          <Following
            data={followingList}
            isSidebar
            className={cx('separate')}
          />
        )}
        <Discover className={cx('separate', 'response-hidden')} />
        <Footer className={cx('separate', 'response-hidden')} />
      </div>
    </aside>
  );
}

export default Sidebar;
