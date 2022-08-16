import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({
  to,
  href,

  primary = false,
  rounded = false,
  disabled = false,
  outline = false,
  small = false,
  large = false,

  leftIcon,
  rightIcon,
  className,
  children,

  onClick,
  ...passProps
}) {
  let Component = 'button';
  const props = {
    onClick,
    ...passProps,
  };

  //   Check tag html of button
  if (to) {
    props.to = to;
    Component = Link;
  } else if (href) {
    props.href = href;
    Component = 'a';
  }

  //   Remove event when disabled button
  if (disabled) {
    Object.keys(props).forEach((key) => {
      if (key.startsWith('on')) delete props[key];
    });
  }

  const classList = cx('wrapper', {
    [className]: className,
    primary,
    outline,
    rounded,
    disabled,
    small,
    large,
  });
  return (
    <Component className={classList} {...props}>
      {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
      <span className={cx('title')}>{children}</span>
      {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
    </Component>
  );
}

Button.propTypes = {
  to: PropTypes.string,
  href: PropTypes.string,

  primary: PropTypes.bool,
  rounded: PropTypes.bool,
  disabled: PropTypes.bool,
  outline: PropTypes.bool,
  small: PropTypes.bool,
  large: PropTypes.bool,

  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,

  onClick: PropTypes.func,
};

export default Button;
