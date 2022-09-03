import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './Posts.module.scss';
import Tags from '../Tags';
import { TickIcon } from '../Icons';
import AccountInfo from '../Popper/AccountInfo';
import Button from '../Button';
import Image from '../Image';
import config from '~/config';

const cx = classNames.bind(styles);

function Info({
  data: { user, postDayRender, postTitleList, musicName, postRef },
  className,
}) {
  const [follow, setFollow] = useState(user.is_followed);
  const isHomePage = window.location.pathname === config.routes.home;

  const renderTitle = () => {
    return postTitleList.map((item, index) => {
      if (item.startsWith('#') || item.startsWith('@')) {
        return (
          <Tags key={index} className={cx('tag')}>
            {item}
          </Tags>
        );
      }
      return (
        <span key={index} className={cx('comment')}>
          {item}
        </span>
      );
    });
  };

  const passPropsFollowBtn = useMemo(() => {
    if (follow) return { children: 'Following' };

    return { children: 'Follow', outline: true };
  }, [follow]);

  return (
    <div className={cx('info-container', className)}>
      <AccountInfo
        account={user}
        appendTo={() => postRef.current}
        post
        offset={[-95, -24]}
        placement="bottom-start"
      >
        <Link to={`/@${user.nickname}`} className={cx('author')}>
          <div className={cx('image-responsive')}>
            <Image
              src={user.avatar}
              alt={user.nickname}
              className={cx('image')}
            />
          </div>
          <div className={cx('info-responsive')}>
            <h3 className={cx('author-uniqueId')}>
              {user.nickname}
              {user.tick && <TickIcon className={cx('tick-icon')} />}
            </h3>
            <h4
              className={cx('author-nickname')}
            >{`${user.first_name} ${user.last_name}`}</h4>
            {!isHomePage && (
              <>
                <span className={cx('dot')}> . </span>
                <span className={cx('posted-day')}>{postDayRender}</span>
              </>
            )}
          </div>
        </Link>
      </AccountInfo>

      {isHomePage && (
        <Button
          small
          className={cx('btn')}
          onClick={() => setFollow(!follow)}
          {...passPropsFollowBtn}
        />
      )}

      <div className={cx('video-desc')}>{renderTitle()}</div>

      <h4 className={cx('video-music')}>
        <Tags music className={cx('tag-music')}>
          {musicName || 'No sound'}
        </Tags>
      </h4>
    </div>
  );
}

Info.propTypes = {
  data: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default Info;
