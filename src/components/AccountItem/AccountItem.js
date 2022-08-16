import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './AccountItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Image from '~/components/Image';

const cx = classNames.bind(styles);

const AccountItem = forwardRef(
  (
    { data: { link, avatar, nickname, isVerified, fullName }, className },
    ref,
  ) => {
    // const link = account.link;
    // const avatar = account.cover;
    // const nickname = account.subTitle.replace('@', '');
    // const isVerified = account.extraInfo.verified;
    // const fullName = account.title;

    return (
      <Link to={link} className={cx('wrapper', className)} ref={ref}>
        <Image className={cx('user-avatar')} src={avatar} alt={nickname} />
        <div className={cx('user-info', 'response-hidden')}>
          <h4 className={cx('user-name')}>
            <span className={cx('name')}>{nickname}</span>
            {isVerified && (
              <FontAwesomeIcon
                icon={faCheckCircle}
                className={cx('icon-check')}
              />
            )}
          </h4>
          <p className={cx('user-desc')}>{fullName}</p>
        </div>
      </Link>
    );
  },
);

AccountItem.propTypes = {
  data: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default AccountItem;
