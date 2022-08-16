import classNames from 'classnames/bind';
import Menu from './Menu';
import styles from './Sidebar.module.scss';
import {
  GroupIcon,
  GroupIconActive,
  HomeIcon,
  HomeIconActive,
  LiveIcon,
  LiveIconActive,
} from '~/components/Icons';
import config from '~/config';
import SuggestedAccounts from '~/components/SuggestedAccounts';
import accounts from '~/assets/data/accounts';
import Following from './Following';
import Discover from './Discover';
import Footer from './Footer';
import { useEffect, useRef } from 'react';

const cx = classNames.bind(styles);

function Sidebar(isLogin = true) {
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
  const suggestedAccountList = recommends.data.suggestedAccountList;
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

  return (
    <aside className={cx('wrapper')} id="sidebar">
      <div ref={sidebarRef} className={cx('content')}>
        <Menu menuList={menuList} />
        <SuggestedAccounts
          data={suggestedAccountList}
          className={cx('separate')}
          isSidebar
        />
        {isLogin && (
          <Following data={followingList} className={cx('separate')} />
        )}
        <Discover className={cx('separate', 'response-hidden')} />
        <Footer className={cx('separate', 'response-hidden')} />
      </div>
    </aside>
  );
}

export default Sidebar;
