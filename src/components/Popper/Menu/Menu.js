import PropTypes from 'prop-types';
import { useState } from 'react';
import classNames from 'classnames/bind';
import HeadlessTippy from '@tippyjs/react/headless';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import MenuItem from './MenuItem';
import styles from './Menu.module.scss';
import Header from './Header';

const cx = classNames.bind(styles);
const defaultFn = () => {};

function Menu({
  children,
  items = [],
  onChange = defaultFn,
  hideOnClick = false,
}) {
  const [historyMenu, setHistoryMenu] = useState([{ data: items }]);
  const currentMenu = historyMenu[historyMenu.length - 1];
  const renderItem = () => {
    return currentMenu.data.map((item, index) => {
      const isParentMenu = !!item.children;

      const className = item['separate']
        ? cx('menu-title', 'separate')
        : cx('menu-title');

      return (
        <MenuItem
          key={index}
          data={item}
          className={className}
          onClick={() => {
            if (isParentMenu) {
              setHistoryMenu((prev) => [...prev, item.children]);
            } else {
              onChange(item);
            }
          }}
        />
      );
    });
  };

  const className = currentMenu.data.length > 10 ? cx('max-height') : '';

  const handleBack = () => {
    setHistoryMenu((prev) => prev.slice(0, prev.length - 1));
  };

  // Reset Menu to first page when click outside
  const handleReset = () => {
    setHistoryMenu((prev) => prev.slice(0, 1));
  };

  return (
    <HeadlessTippy
      interactive
      hideOnClick={hideOnClick}
      offset={[12, 10]}
      delay={[0, 500]}
      placement="bottom-end"
      render={(attrs) => (
        <div className={cx('menu-list')} {...attrs}>
          <PopperWrapper className={className}>
            {historyMenu.length > 1 && (
              <Header title={currentMenu.title} onBack={handleBack} />
            )}
            <div className={cx('box-item')}>{renderItem()}</div>
          </PopperWrapper>
        </div>
      )}
      onHide={handleReset}
    >
      {children}
    </HeadlessTippy>
  );
}

Menu.propTypes = {
  children: PropTypes.node.isRequired,
  items: PropTypes.array.isRequired,
  onChange: PropTypes.func,
  hideOnClick: PropTypes.bool,
};

export default Menu;
