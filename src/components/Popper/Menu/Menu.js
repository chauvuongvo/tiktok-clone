import PropTypes from 'prop-types';
import { useEffect, useState, useContext } from 'react';
import classNames from 'classnames/bind';
import HeadlessTippy from '@tippyjs/react/headless';

import { ContextApp } from '~/App';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import MenuItem from './MenuItem';
import styles from './Menu.module.scss';
import Header from './Header';

const cx = classNames.bind(styles);

function Menu({ children, data, onChange }) {
  const { currentUser, setCurrentUser } = useContext(ContextApp);

  const [historyMenu, setHistoryMenu] = useState(
    currentUser
      ? [{ data: data.USER_MENU_ITEM_LIST }]
      : [{ data: data.MENU_ITEM_LIST }],
  );
  const currentMenu = historyMenu[historyMenu.length - 1];

  useEffect(() => {
    if (currentUser) setHistoryMenu([{ data: data.USER_MENU_ITEM_LIST }]);
    else setHistoryMenu([{ data: data.MENU_ITEM_LIST }]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  const renderItem = () => {
    return currentMenu.data.map((item, index) => {
      const isParentMenu = !!item.children;

      const handleClickItem = () => {
        if (item.isLogout) {
          return setCurrentUser(false);
        }
        if (isParentMenu)
          return setHistoryMenu((prev) => [...prev, item.children]);
        onChange(item);
      };

      const className = item['separate']
        ? cx('menu-title', 'separate')
        : cx('menu-title');

      return (
        <MenuItem
          key={index}
          data={item}
          className={className}
          onClick={handleClickItem}
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
  data: PropTypes.object.isRequired,
  onChange: PropTypes.func,
};

export default Menu;
