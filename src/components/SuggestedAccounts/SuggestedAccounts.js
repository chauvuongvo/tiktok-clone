import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './SuggestedAccounts.module.scss';
import AccountInfo from '../Popper/AccountInfo';
import AccountItem from '../AccountItem';
import SectionWrapper from '~/layouts/components/Sidebar/SectionWrapper';
import * as services from '~/services';

const cx = classNames.bind(styles);

function SuggestedAccounts({
  data: accountList,
  className,
  isSidebar = false,
}) {
  const offsetResponse = { offset: [45, -100] };
  const offsetNormal = { offset: [-8, -52] };
  const [props, setProps] = useState(() =>
    isSidebar && window.innerWidth < 1071 ? offsetResponse : offsetNormal,
  );
  const [seeAllBtn, setSeeAllBtn] = useState(true);
  const [renderList, setRenderList] = useState([]);
  const [pages, setPages] = useState({ page: 1, perPage: 5 });

  const suggestRef = useRef();

  useEffect(() => {
    if (pages.page > 5) {
      return;
    }
    const fetchApi = async () => {
      const result = await services.suggestAccounts(pages.page, pages.perPage);
      if (renderList.length > 0) setSeeAllBtn(false);
      setRenderList((prev) => [...prev, ...result]);
      suggestRef.accountList = [...renderList, ...result];
    };

    fetchApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pages]);

  useEffect(() => {
    const handleResizeWidth = () => {
      if (isSidebar && window.innerWidth < 1071) {
        setProps(offsetResponse);
      } else {
        setProps(offsetNormal);
      }
    };
    window.addEventListener('resize', handleResizeWidth);
    return () => window.removeEventListener('resize', handleResizeWidth);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLoadAccount = () => {
    if (suggestRef.accountList.length === 5 && seeAllBtn) {
      setPages({ page: 2, perPage: 20 });
      return;
    }

    if (!seeAllBtn) {
      setSeeAllBtn(true);
      setRenderList((prev) => prev.slice(0, 5));
    }

    if (suggestRef.accountList.length > 5 && seeAllBtn) {
      setRenderList([...suggestRef.accountList]);
      setSeeAllBtn(false);
    }
  };

  const render = () => {
    return renderList.map((item, index) => {
      const account = {};
      // account.link = item.link;
      // account.uniqueId = item.subTitle.slice(1);
      // account.avatar = item.cover;
      // account.isVerified = item.extraInfo.verified;
      // account.fullName = item.title;
      // account.follower = +item.extraInfo.fans;
      // account.liker = +item.extraInfo.likes;
      // account.isFollowing = false;
      account.link = `/@${item.nickname}`;
      account.uniqueId = item.nickname;
      account.avatar = item.avatar;
      account.isVerified = item.tick;
      account.fullName = `${item.first_name} ${item.last_name}`;
      account.follower = item.followers_count;
      account.liker = item.likes_count;
      account.isFollowing = item.is_followed;
      return (
        <AccountInfo
          key={index}
          account={account}
          delay={[700, 0]}
          isSidebar
          appendTo={() => document.getElementById('sidebar')}
          {...props}
        >
          <AccountItem
            data={{
              link: account.link,
              avatar: account.avatar,
              fullName: account.fullName,
              isVerified: account.isVerified,
              uniqueId: account.uniqueId,
            }}
            className={cx('item', 'response-center')}
            isSidebar
          />
        </AccountInfo>
      );
    });
  };

  return (
    <SectionWrapper className={cx('wrapper', className)} ref={suggestRef}>
      <p className={cx('title', 'response-hidden')}>Suggested Accounts</p>

      {render()}

      <div
        className={cx('see-btn', 'response-hidden')}
        onClick={handleLoadAccount}
      >
        {seeAllBtn ? 'See all' : 'See less'}
      </div>
    </SectionWrapper>
  );
}

SuggestedAccounts.propTypes = {
  data: PropTypes.array.isRequired,
  className: PropTypes.string,
};

export default SuggestedAccounts;
