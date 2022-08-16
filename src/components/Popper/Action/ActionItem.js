import PropTypes from 'prop-types';
import { memo } from 'react';

import classNames from 'classnames/bind';
import styles from './Action.module.scss';

const cx = classNames.bind(styles);

function ActionItem({ className, children, icon, href = '#' }) {
  let newTab = {};
  if (href !== '#') {
    newTab = { target: '_blank', rel: 'noopener noreferrer' };
  }
  return (
    <a className={cx('share-link', className)} href={href} {...newTab}>
      {icon}
      <span className={cx('title')}>{children}</span>
    </a>
  );
}

ActionItem.propTypes = {
  children: PropTypes.any.isRequired,
  icon: PropTypes.node.isRequired,
  href: PropTypes.string,
  className: PropTypes.string,
};

export default memo(ActionItem);
