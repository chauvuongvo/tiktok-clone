import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './Posts.module.scss';

const cx = classNames.bind(styles);

function ControlVolume({ data: { state, DOM, setMuted }, className }) {
  const [scaleVolume, setScaleVolume] = useState(0);

  const volumeControlRef = useRef('volume-control');
  const volumeProgressRef = useRef('volume-progress');
  const volumeCircleRef = useRef('volume-circle');

  useEffect(() => {
    const handleSound = (e) => {
      if (state.muted) {
        setMuted(false);
        updateScale(e, 0.6);
      } else {
        setMuted(true);
        updateScale(e, 0);
      }
    };
    DOM.SOUND.addEventListener('click', handleSound);

    return () => DOM.SOUND.removeEventListener('click', handleSound);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.muted]);

  useEffect(() => {
    const boundingVolumeProgress =
      volumeProgressRef.current.getBoundingClientRect();

    volumeControlRef.heightProgress = boundingVolumeProgress.height;
    volumeControlRef.volumeY = boundingVolumeProgress.y;
    volumeControlRef.heightCircle =
      volumeCircleRef.current.getBoundingClientRect().height;
  }, []);

  useEffect(() => {
    const DOM_VOLUME_CIRCLE = volumeCircleRef.current;
    let isTarget = false;

    const handleTarget = (e) => {
      isTarget = true;
      updateScale(e);
    };
    DOM_VOLUME_CIRCLE.addEventListener('mousedown', handleTarget);

    const handleChangeVolume = (e) => {
      if (isTarget) updateScale(e);
    };
    document.addEventListener('mousemove', handleChangeVolume);

    const handleOutTarget = () => {
      isTarget = false;
    };
    document.addEventListener('mouseup', handleOutTarget);

    return () => {
      DOM_VOLUME_CIRCLE.removeEventListener('mousedown', handleTarget);
      document.removeEventListener('mousemove', handleChangeVolume);
      document.removeEventListener('mouseup', handleOutTarget);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateScale = (e, vol) => {
    const { heightProgress, volumeY, heightCircle } = volumeControlRef;
    let scale;

    if (vol !== undefined && vol !== null) {
      scale = vol;
    } else {
      const targetEventY = e.clientY;
      scale = (volumeY + heightProgress - targetEventY) / heightProgress;
    }

    if (scale > 1) {
      scale = 1;
      setMuted(false);
    } else if (scale <= 0) {
      scale = 0;
      setMuted(true);
    } else setMuted(false);

    volumeControlRef.scaleCircle = scale * (heightProgress - heightCircle);
    DOM.VIDEO.volume = scale;

    setScaleVolume(scale);
  };

  return (
    <div
      ref={volumeControlRef}
      className={cx('volume-control', className)}
      onClick={updateScale}
    >
      <div ref={volumeProgressRef} className={cx('volume-progress')}></div>
      <div
        ref={volumeCircleRef}
        style={{
          transform: `translateY(-${volumeControlRef.scaleCircle}px)`,
        }}
        className={cx('volume-circle')}
      ></div>
      <div
        style={{ transform: `scaleY(${scaleVolume})` }}
        className={cx('volume-bar')}
      ></div>
    </div>
  );
}

export default ControlVolume;