import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './Tags.module.scss';
import config from '~/config';
import { MusicIcon, TagIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

function Tags({ text, music, outline, className, children }) {
  const classList = cx('wrapper', {
    [className]: className,
    text,
    music,
    outline,
  });

  if (children.trim().startsWith('@')) {
    return (
      <Link to={`/${children}`} className={classList}>
        <strong className={cx('title')}>{children}</strong>
      </Link>
    );
  }

  const link = children.trim().startsWith('#') ? children.slice(1) : children;

  // Replace domain of tags
  const domainChildren = link
    .replace(/[^a-zA-Z0-9\u00C0-\u01b0\u1ea0-\u1fff]/g, '-')
    .replace(/--+/g, '-');

  return (
    <Link to={`${config.routes.tag}/${domainChildren}`} className={classList}>
      {text && (
        <>
          <TagIcon width={14} height={14} />
          <strong className={cx('title')}>{children}</strong>
        </>
      )}

      {music && (
        <>
          <MusicIcon width={16} height={16} />
          <p className={cx('title')}>{children}</p>
        </>
      )}

      {link !== children && <strong className={cx('title')}>{children}</strong>}
    </Link>
  );
}

Tags.propTypes = {
  children: PropTypes.string.isRequired,
  text: PropTypes.bool,
  music: PropTypes.bool,
  outline: PropTypes.bool,
  className: PropTypes.string,
};

export default Tags;
