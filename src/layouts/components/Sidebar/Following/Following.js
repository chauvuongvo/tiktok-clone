import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import AccountItem from '~/components/AccountItem';
import SectionWrapper from '~/layouts/components/Sidebar/SectionWrapper';
import styles from './Following.module.scss';
import { useEffect, useRef, useState } from 'react';
import * as services from '~/services';
const cx = classNames.bind(styles);

function Following({ data: followingList, isSidebar = false, className }) {
  const [renderList, setRenderList] = useState([]);
  const [endList, setEndList] = useState(false);
  const [page, setPage] = useState(1);

  const followingRef = useRef();

  useEffect(() => {
    const fetchApi = async () => {
      const { data, meta } = await services.followingAccounts(page);

      if (page === meta.pagination.total_pages) {
        followingRef.renderFullList = [...renderList, ...data];
        followingRef.totalPages = meta.pagination.total_pages;
        setEndList(true);
      }
      setRenderList((prev) => [...prev, ...data]);
    };

    fetchApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleChangeRenderList = () => {
    if (page === followingRef.totalPages) {
      if (endList) {
        setEndList(false);
        setRenderList(followingRef.renderFullList.slice(0, 5));
        return;
      }
      setEndList(true);
      setRenderList(followingRef.renderFullList);
      return;
    }

    setPage(page + 1);
  };

  const render = () => {
    return renderList.map((item, index) => {
      const account = {};
      account.link = `/@${item.nickname}`;
      account.uniqueId = item.nickname;
      account.avatar = item.avatar;
      account.isVerified = item.tick;
      account.fullName = `${item.first_name} ${item.last_name}`;
      account.follower = item.followers_count;
      account.liker = item.likes_count;
      account.isFollowing = item.is_followed;

      return (
        <AccountItem
          key={index}
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
      );
    });
  };

  return (
    <SectionWrapper ref={followingRef} className={cx('wrapper', className)}>
      <p className={cx('title', 'response-hidden')}>Following Accounts</p>

      {render()}

      <div
        className={cx('see-btn', 'response-hidden')}
        onClick={handleChangeRenderList}
      >
        {endList ? 'See less' : 'See more'}
      </div>
    </SectionWrapper>
  );
}

Following.propTypes = {
  data: PropTypes.array.isRequired,
  className: PropTypes.string,
};

export default Following;
