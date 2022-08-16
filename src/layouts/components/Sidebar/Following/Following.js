import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import AccountItem from '~/components/AccountItem';
import SectionWrapper from '~/layouts/components/Sidebar/SectionWrapper';
import styles from './Following.module.scss';
import { useEffect, useRef, useState } from 'react';
const cx = classNames.bind(styles);

function Following({ data, className }) {
  const followingList = data.slice(0, 3);
  const length = followingList.length;
  const [hasList, setHasList] = useState(true);
  const [listCount, setListCount] = useState(0);
  const [renderList, setRenderList] = useState([]);

  // const seeMoreBtnRef = useRef();
  const followingRef = useRef();
  useEffect(() => {
    // Get full list following from data
    const followingFullList = followingList.reduce(
      (result, current) => [...result, ...current.list],
      [],
    );
    followingRef.renderFullList = [...followingFullList];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSeeMore = () => {
    // Fake load API
    if (listCount < length - 1) {
      setTimeout(() => {
        setListCount(listCount + 1);
        if (listCount === length - 2) {
          setHasList(false);
        }
      }, 500);
    }

    if (listCount === length - 1) {
      // Handle when loaded full following list but it is hiding
      // want to show full list following
      setRenderList([...followingRef.renderFullList]);
      setHasList(false);
    }
  };

  const handleSeeLess = () => {
    setRenderList([...followingList[0].list]);
    setHasList(true);
  };

  useEffect(() => {
    setRenderList([...renderList, ...followingList[listCount].list]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listCount]);

  const render = () => {
    return renderList.map((account, index) => {
      const link = `/@${account.user.uniqueId}`;
      const avatar = account.user.avatarThumb;
      const nickname = account.user.uniqueId;
      const isVerified = account.user.verified;
      const fullName = account.user.nickname;
      return (
        <AccountItem
          key={index}
          data={{ link, avatar, nickname, isVerified, fullName }}
          className={cx('item', 'response-center')}
        />
      );
    });
  };

  return (
    <SectionWrapper ref={followingRef} className={cx('wrapper', className)}>
      <p className={cx('title', 'response-hidden')}>Following Accounts</p>

      {render()}
      {hasList ? (
        <div
          className={cx('see-btn', 'response-hidden')}
          onClick={handleSeeMore}
        >
          See more
        </div>
      ) : (
        <div
          className={cx('see-btn', 'response-hidden')}
          onClick={handleSeeLess}
        >
          See less
        </div>
      )}
    </SectionWrapper>
  );
}

Following.propTypes = {
  data: PropTypes.array.isRequired,
  className: PropTypes.string,
};

export default Following;
