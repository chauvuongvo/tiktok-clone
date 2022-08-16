import PropTypes from 'prop-types';
import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';

import styles from './Posts.module.scss';
import ControlVolume from './ControlVolume';
import { FlagIcon, MuteIcon, PauseIcon, PlayIcon, SoundIcon } from '../Icons';

const cx = classNames.bind(styles);

function Video({ data, className }) {
  const [play, setPlay] = useState(true);
  const [muted, setMuted] = useState(true);
  const [hideVoiceControl, setHideVoiceControl] = useState(false);

  const videoRef = useRef('video');
  const voiceContainerRef = useRef('voice-container');
  const soundRef = useRef('sound-video');

  const videoSrc = data.src;

  const dataTransfer = {
    state: { muted },
    DOM: { VIDEO: videoRef.current, SOUND: soundRef.current },
    setMuted,
  };

  const handlePlay = () => {
    if (play) videoRef.current.pause();
    else videoRef.current.play();
    setPlay(!play);
  };

  useEffect(() => {
    const DOM_VOICE_CONTAINER = voiceContainerRef.current;
    const handleMouseOver = () => {
      setHideVoiceControl(true);
    };
    const handleMouseOut = () => {
      setHideVoiceControl(false);
    };

    DOM_VOICE_CONTAINER.addEventListener('mouseleave', handleMouseOut);
    DOM_VOICE_CONTAINER.addEventListener('mouseenter', handleMouseOver);

    return () => {
      DOM_VOICE_CONTAINER.removeEventListener('mouseleave', handleMouseOut);
      DOM_VOICE_CONTAINER.removeEventListener('mouseenter', handleMouseOver);
    };
  }, []);

  return (
    <div className={cx('video-container', className)}>
      <div className={cx('video-player')}>
        <video
          ref={videoRef}
          className={cx('video-basic')}
          src={videoSrc}
          type="video/mp4"
          autoPlay
          loop
          muted={muted}
        ></video>
      </div>
      <div className={cx('play-pause')} onClick={handlePlay}>
        {play ? <PauseIcon /> : <PlayIcon />}
      </div>

      <div className={cx('voice-container')} ref={voiceContainerRef}>
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
  );
}

Video.propTypes = {
  data: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default Video;
