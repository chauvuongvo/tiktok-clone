import PropTypes from 'prop-types';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import MenuItem from './MenuItem';

const cx = classNames.bind(styles);

function Menu({ menuList, className }) {
  return (
    <div className={cx('wrapper', 'response-center', className)}>
      {menuList.map((item, index) => (
        <Tippy
          key={index}
          content={item.title}
          className={cx('tooltip')}
          offset={[66, -46]}
          placement="bottom-start"
          appendTo={() => document.getElementById('sidebar')}
        >
          <MenuItem
            title={item.title}
            to={item.to}
            icon={item.icon}
            iconActive={item.iconActive}
          />
        </Tippy>
      ))}
    </div>
  );
}

Menu.propTypes = {
  menuList: PropTypes.array.isRequired,
  className: PropTypes.string,
};

export default Menu;
