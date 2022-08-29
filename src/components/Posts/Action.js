import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './Posts.module.scss';
import ActionPopper from '~/components/Popper/Action';
import { CommentIcon, HeartIcon, ShareIcon } from '../Icons';

const cx = classNames.bind(styles);

function Action({ data: { likeCount, commentCount, shareCount }, className }) {
  return (
    <div className={cx('action-wrapper')}>
      <button className={cx('action-btn')}>
        <span className={cx('action-icon')}>
          <HeartIcon />
        </span>
        <strong className={cx('action-text')}>{likeCount}</strong>
      </button>

      <button className={cx('action-btn')}>
        <span className={cx('action-icon')}>
          <CommentIcon />
        </span>
        <strong className={cx('action-text')}>{commentCount}</strong>
      </button>

      <button className={cx('action-btn')}>
        <ActionPopper>
          <div>
            <span className={cx('action-icon')}>
              <ShareIcon />
            </span>
            <strong className={cx('action-text')}>{shareCount}</strong>
          </div>
        </ActionPopper>
      </button>
    </div>
  );
}

Action.propTypes = {
  data: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default Action;
