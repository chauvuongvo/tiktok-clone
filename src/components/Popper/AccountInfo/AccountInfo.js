import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import styles from './AccountInfo.module.scss';
import Image from '~/components/Image';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function AccountInfo({
  account,
  className,
  children,
  delay = 500,
  post = false,
  offset = [-10, -48],
  placement = 'bottom-start',
  appendTo = 'parent',
  isSidebar = false,
}) {
  // const [response, setResponse] = useState({ offset, appendTo });
  const [showPopper, setShowPopper] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      document.querySelectorAll('[data-tippy-root]').forEach(function (el) {
        el._tippy && el._tippy.hide();
      });
    };

    window.addEventListener('scroll', handleScroll);

    document.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleCountStats = (count) => {
    const length = (count + '').length;
    let index = 6;
    let suffix = 'M';

    if (length <= 3) {
      suffix = '';
      index = 0;
    }
    if (length > 3 && length <= 6) {
      suffix = 'K';
      index = 3;
    }
    if (length > 9) {
      suffix = 'B';
      index = 9;
    }

    return (count / 10 ** index).toFixed(1) + suffix;
  };

  // if (isSidebar) console.log(offset);

  return (
    <div>
      <HeadlessTippy
        interactive
        // visible
        appendTo={appendTo}
        delay={[delay, 0]}
        offset={offset}
        onShow={() => setShowPopper('show-popper')}
        onHide={() => setShowPopper('')}
        placement={placement}
        popperOptions={{ modifiers: [{ name: 'flip', enabled: false }] }}
        render={(attrs) => (
          <div
            {...attrs}
            className={cx('container', isSidebar ? 'response-container' : '')}
          >
            <PopperWrapper className={cx('wrapper')}>
              <div className={cx('header')}>
                <Link className={cx('avatar-link')} to={`/@${account.link}`}>
                  <Image
                    src={account.avatar}
                    alt={account.uniqueId}
                    className={cx('avatar')}
                  />
                </Link>
                {account.isFollowing ? (
                  <Button className={cx('btn')}>Following</Button>
                ) : (
                  <Button primary className={cx('btn')}>
                    Follow
                  </Button>
                )}
              </div>

              <Link className={cx('title')} to={`/@${account.link}`}>
                <span className={cx('nickname')}>{account.uniqueId}</span>
                {account.isVerified && (
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className={cx('icon-check')}
                  />
                )}
              </Link>
              <div>
                <Link className={cx('full-name')} to={`/@${account.link}`}>
                  {account.fullName}
                </Link>
              </div>

              <div className={cx('status')}>
                <span className={cx('follower-count')}>
                  {handleCountStats(account.follower)}
                </span>
                <span className={cx('follower')}>Followers</span>
                <span className={cx('like-count')}>
                  {handleCountStats(account.liker)}
                </span>
                <span className={cx('like')}>Likes</span>
              </div>

              {post && (
                <div className={cx('signature')}>{account.signature}</div>
              )}
            </PopperWrapper>
          </div>
        )}
      >
        <div className={`${className} ${cx(showPopper)}`}>{children}</div>
      </HeadlessTippy>
    </div>
  );
}

AccountInfo.propTypes = {
  account: PropTypes.object.isRequired,
  children: PropTypes.any,
  post: PropTypes.bool,
  className: PropTypes.string,
};

export default AccountInfo;
