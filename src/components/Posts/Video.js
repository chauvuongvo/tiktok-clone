import PropTypes from 'prop-types';
import { useState, useEffect, useRef, useContext } from 'react';
import classNames from 'classnames/bind';

import { useElementOnScreen } from '~/hooks';
import { ContextDefaultLayout } from '~/layouts/DefaultLayout';
import styles from './Posts.module.scss';
import ControlVolume from './ControlVolume';
import { FlagIcon, MuteIcon, PauseIcon, PlayIcon, SoundIcon } from '../Icons';

const cx = classNames.bind(styles);

function Video({ data, className }) {
  const { mutedVideo } = useContext(ContextDefaultLayout);
  const [play, setPlay] = useState(true);
  const [canvasSize, setCanvasSize] = useState({
    width: '56.25',
    height: '100',
  });
  const [hideVoiceControl, setHideVoiceControl] = useState(false);

  const videoRef = useRef();
  const feedVideoRef = useRef();
  const soundRef = useRef();

  const videoSrc = data.src;
  const refs = { VIDEO: videoRef.current, SOUND: soundRef.current };

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
        }

        setCanvasSize({ width: `${(width * 100) / height}%`, height: '100%' });
      }
    }, 1000);
  }, []);

  // Handle play video when scroll video on viewport 60%
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
            playsInline
            loop
            muted={mutedVideo}
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
          {hideVoiceControl && <ControlVolume dataRef={refs} />}
          <div
            ref={soundRef}
            style={mutedVideo ? { opacity: 1 } : {}}
            className={cx('sound-video')}
          >
            {mutedVideo ? <MuteIcon /> : <SoundIcon />}
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
