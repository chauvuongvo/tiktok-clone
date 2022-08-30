import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './UserCard.module.scss';
import Image from '~/components/Image';
import Button from '~/components/Button';
import { TickIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

function UserCard({ data: { video, info } }) {
  const videoRef = useRef();

  return (
    <Link to={`/@${info.user.uniqueId}`} className={cx('wrapper')}>
      <canvas width="56.25" height="100"></canvas>

      <div className={cx('video-container')}>
        <div className={cx('video-player')}>
          <video
            ref={videoRef}
            className={cx('video-basic')}
            src={video.src}
            type="video/mp4"
            playsInline
            loop
          ></video>
        </div>

        <div className={cx('info-container')}>
          <div className={cx('avatar')}>
            <Image src={info.user.avatarThumb} alt={info.user.uniqueId} />
          </div>
          <h5 className={cx('nickname')}>{info.user.nickname}</h5>
          <h6 className={cx('uniqueId')}>
            {info.user.uniqueId}
            <TickIcon />
          </h6>

          <Button primary className={cx('btn')}>
            Follow
          </Button>
        </div>
      </div>
    </Link>
  );
}

export default UserCard;
