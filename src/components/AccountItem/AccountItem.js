import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './AccountItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Image from '~/components/Image';

const cx = classNames.bind(styles);

const AccountItem = forwardRef(({ data, className, isSidebar }, ref) => {
  return (
    <Link
      to={`/@${data.nickname}`}
      className={cx('wrapper', className)}
      ref={ref}
    >
      <Image
        className={cx('user-avatar')}
        src={data.avatar}
        alt={data.nickname}
      />
      <div
        className={
          isSidebar ? cx('user-info', 'response-hidden') : cx('user-info')
        }
      >
        <h4 className={cx('user-name')}>
          <span className={cx('name')}>{data.nickname}</span>
          {data.tick && (
            <FontAwesomeIcon
              icon={faCheckCircle}
              className={cx('icon-check')}
            />
          )}
        </h4>
        <p
          className={cx('user-desc')}
        >{`${data.first_name} ${data.last_name}`}</p>
      </div>
    </Link>
  );
});

AccountItem.propTypes = {
  data: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default AccountItem;
