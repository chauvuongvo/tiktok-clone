import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import classNames from 'classnames/bind';
import styles from './SectionWrapper.module.scss';

const cx = classNames.bind(styles);

const SectionWrapper = forwardRef(({ children, className }, ref) => {
  return (
    <div ref={ref} className={cx('wrapper', className)}>
      {children}
    </div>
  );
});

SectionWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default SectionWrapper;
