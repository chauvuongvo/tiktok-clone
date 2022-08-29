import classNames from 'classnames/bind';
import styles from './ActionLogin.module.scss';

import Button from '~/components/Button';

const cx = classNames.bind(styles);

function ActionLogin({ data = [] }) {
  return (
    <div className={cx('container')}>
      <div className={cx('title')}>Log in to TikTok</div>
      {data.map((item, index) => {
        return (
          <Button
            key={index}
            leftIcon={item.icon}
            className={cx('item-btn')}
            onClick={item?.nextPage}
          >
            {item.title}
          </Button>
        );
      })}
    </div>
  );
}

export default ActionLogin;
