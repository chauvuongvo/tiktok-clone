import PropTypes from 'prop-types';
import { useEffect, useRef, createContext, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './DefaultLayout.module.scss';
import Header from '~/layouts/components/Header';
import Sidebar from '~/layouts/components/Sidebar';
import Button from '~/components/Button';
import { GoToTopIcon } from '~/components/Icons';

const cx = classNames.bind(styles);
export const ContextDefaultLayout = createContext();

function DefaultLayout({ children }) {
  const [showModalLogin, setShowModalLogin] = useState(false);
  const [mutedVideo, setMutedVideo] = useState(true);
  const [scaleVolume, setScaleVolume] = useState(0);

  const valueContext = {
    showModalLogin,
    setShowModalLogin,
    mutedVideo,
    setMutedVideo,
    scaleVolume,
    setScaleVolume,
  };
  const bottomRef = useRef();

  useEffect(() => {
    const DOM_BOTTOM = bottomRef.current;
    const handleScroll = (e) => {
      if (window.scrollY > 0) {
        DOM_BOTTOM.classList.add(cx('bottom-active'));
      } else {
        DOM_BOTTOM.classList.remove(cx('bottom-active'));
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleGoToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ContextDefaultLayout.Provider value={valueContext}>
      <div className={cx('wrapper')}>
        <Header />
        <div className={cx('container')}>
          <Sidebar />
          <div className={cx('content')}>{children}</div>
        </div>

        {/* Button go to top */}
        <div ref={bottomRef} className={cx('bottom')}>
          <div className={cx('app-btn')}>
            <Button small rounded className={cx('btn-override')}>
              Get app
            </Button>
          </div>
          <button className={cx('go-to-top-btn')} onClick={handleGoToTop}>
            <GoToTopIcon />
          </button>
        </div>
      </div>
    </ContextDefaultLayout.Provider>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DefaultLayout;
