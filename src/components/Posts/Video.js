import PropTypes from 'prop-types';
import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';

import { useElementOnScreen } from '~/hooks';
import styles from './Posts.module.scss';
import ControlVolume from './ControlVolume';
import { FlagIcon, MuteIcon, PauseIcon, PlayIcon, SoundIcon } from '../Icons';

const cx = classNames.bind(styles);

function Video({ data, className }) {
  const [play, setPlay] = useState(true);
  const [muted, setMuted] = useState(true);
  const [canvasSize, setCanvasSize] = useState({
    width: '56.25',
    height: '100',
  });
  const [hideVoiceControl, setHideVoiceControl] = useState(false);

  const videoRef = useRef();
  const feedVideoRef = useRef();
  const soundRef = useRef();

  const videoSrc = data.src;
  const dataTransfer = {
    state: { muted },
    DOM: { VIDEO: videoRef.current, SOUND: soundRef.current },
    setMuted,
  };

  useEffect(() => {
    videoRef.current.volume = 0;
  }, []);

  const handlePlay = () => {
    if (play) videoRef.current.pause();
    else videoRef.current.play();
    setPlay(!play);
  };

  useEffect(() => {
    setTimeout(() => {
      const width = videoRef.current.videoWidth;
      const height = videoRef.current.videoHeight;

      if (width !== 0 && height !== 0) {
        if (width > height) {
          feedVideoRef.current.classList.add(cx('horizontal'));
          videoRef.current.classList.add(cx('horizontal'));
          console.log('horizontal');
        }

        setCanvasSize({ width: `${(width * 100) / height}%`, height: '100%' });
      }
    }, 1000);
  }, []);

  const isVisible = useElementOnScreen(
    {
      root: null,
      rootMargin: '0px',
      threshold: 0.6,
    },
    videoRef,
  );
  useEffect(() => {
    if (isVisible) {
      videoRef.current.play();
      setPlay(true);
    } else {
      videoRef.current.pause();
      setPlay(false);
    }
  }, [isVisible]);

  return (
    <div ref={feedVideoRef} className={cx('feed-video')}>
      <canvas {...canvasSize} className={cx('video-card')} />

      <div className={cx('video-container', className)}>
        <div className={cx('video-player')}>
          <video
            ref={videoRef}
            className={cx('video-basic')}
            src={videoSrc}
            type="video/mp4"
            loop
            muted={muted}
          ></video>
        </div>

        <div className={cx('play-pause')} onClick={handlePlay}>
          {play ? <PauseIcon /> : <PlayIcon />}
        </div>

        <div
          className={cx('voice-container')}
          onMouseEnter={() => setHideVoiceControl(true)}
          onMouseLeave={() => setHideVoiceControl(false)}
        >
          {hideVoiceControl && <ControlVolume data={dataTransfer} />}
          <div
            ref={soundRef}
            style={muted ? { opacity: 1 } : {}}
            className={cx('sound-video')}
          >
            {muted ? <MuteIcon /> : <SoundIcon />}
          </div>
        </div>

        <div className={cx('report')}>
          <FlagIcon />
          <span className={cx('title')}>Report</span>
        </div>
      </div>
    </div>
  );
}

Video.propTypes = {
  data: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default Video;
