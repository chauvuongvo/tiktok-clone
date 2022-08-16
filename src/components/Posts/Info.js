import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import { accountList } from '~/assets/data/accounts';
import styles from './Posts.module.scss';
import Tags from '../Tags';
import { TickIcon } from '../Icons';
import AccountInfo from '../Popper/AccountInfo';
import Button from '../Button';

const cx = classNames.bind(styles);

function Info({
  data: { postedDay, comment, musicName, isFollowing, postRef },
  className,
}) {
  const [follow, setFollow] = useState(isFollowing);

  return (
    <div className={cx('info-container', className)}>
      <AccountInfo
        account={accountList[0]}
        appendTo={() => postRef.current}
        post
        offset={[-95, -24]}
        placement="bottom-start"
        isFollowing={isFollowing}
      >
        <Link to={`/@${accountList[0].user.uniqueId}`} className={cx('author')}>
          <h3 className={cx('author-uniqueId')}>
            {accountList[0].user.uniqueId}
            {accountList[0].user.verified && (
              <TickIcon className={cx('tick-icon')} />
            )}
          </h3>
          <h4 className={cx('author-nickname')}>
            {accountList[0].user.nickname}
          </h4>
          <span className={cx('dot')}> . </span>
          <span className={cx('posted-day')}>{postedDay}</span>
        </Link>
      </AccountInfo>

      {follow ? (
        <Button small className={cx('btn')} onClick={() => setFollow(!follow)}>
          Following
        </Button>
      ) : (
        <Button
          outline
          small
          className={cx('btn')}
          onClick={() => setFollow(!follow)}
        >
          Follow
        </Button>
      )}

      <div className={cx('video-desc')}>
        {/* Post content is not handle */}
        <span className={cx('comment')}> {comment}</span>
        <Tags className={cx('tag')}>@tat_106</Tags>
      </div>
      <h4 className={cx('video-music')}>
        <Tags music className={cx('tag-music')}>
          {musicName}
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
