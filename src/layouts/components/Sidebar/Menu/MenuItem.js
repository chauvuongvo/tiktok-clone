import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

const MenuItem = forwardRef(({ title, icon, iconActive, to }, ref) => {
  const handleActive = (nav) => {
    return cx('menu-item', { active: nav.isActive });
  };

  return (
    <NavLink ref={ref} className={(nav) => handleActive(nav)} to={to}>
      <span className={cx('icon-normal')}>{icon}</span>
      <span className={cx('icon-active')}>{iconActive}</span>
      <span className={cx('title', 'response-hidden')}>{title}</span>
    </NavLink>
  );
});

MenuItem.propTypes = {
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  iconActive: PropTypes.node.isRequired,
};

export default MenuItem;
