import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import { accountList } from '~/assets/data/accounts';
import styles from './Posts.module.scss';
import Image from '../Image';
import Video from './Video';
import Info from './Info';
import AccountInfo from '../Popper/AccountInfo';
import Action from './Action';

const cx = classNames.bind(styles);

function Posts({ data: { video }, className }) {
  const [props, setProps] = useState(() =>
    window.innerWidth < 1071
      ? {
          offset: [-28, -50],
        }
      : { offset: [-8, 0] },
  );
  const postedDay = '7-30';
  const comment = video.title;
  const isFollowing = true;
  const likeCount = video.likeCount;
  const commentCount = video.comment.total;
  const shareCount = video.shareCount;

  const postRef = useRef();

  const musicName = (function () {
    const str = video.html;

    const musicHtml = str.match(/<a.+href.+\/music\/.+<\/a>/)[0];

    const musicTitle = musicHtml.replaceAll(/<a.+">|<\/a>/gim, '');
    return musicTitle.slice(1);
  })();

  return (
    <div ref={postRef} className={cx('wrapper', className)}>
      <AccountInfo
        account={accountList[0]}
        post
        className={cx('avatar')}
        placement="bottom-start"
        isFollowing
        offset={[-28, -50]}
        appendTo={() => postRef.current}
      >
        <Link
          to={`/@${accountList[0].user.uniqueId}`}
          className={cx('avatar-link')}
        >
          <Image
            src={accountList[0].user.avatarThumb}
            alt={accountList[0].user.nickname}
            className={cx('image')}
          />
        </Link>
      </AccountInfo>

      <div className={cx('content')}>
        <Info data={{ postedDay, comment, musicName, isFollowing, postRef }} />

        <div className={cx('video-wrapper')}>
          <div className={cx('feed-video')}>
            <canvas width="56.25" height="100" className={cx('video-card')} />
            <Video data={video} />
          </div>

          <Action data={{ likeCount, commentCount, shareCount }} />
        </div>
      </div>
    </div>
  );
}

Posts.propTypes = {
  data: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default Posts;
