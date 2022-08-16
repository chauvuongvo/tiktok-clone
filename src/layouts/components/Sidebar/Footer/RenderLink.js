import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

function RenderLink({ data, className }) {
  return (
    <div className={cx('container', className)}>
      {data.map((item, index) => (
        <a
          href={item.href}
          key={index}
          rel="noreferrer"
          target="_blank"
          className={cx('link')}
        >
          {item.title}
        </a>
      ))}
    </div>
  );
}

RenderLink.propTypes = {
  data: PropTypes.array.isRequired,
  className: PropTypes.string,
};

export default RenderLink;
