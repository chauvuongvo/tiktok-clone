import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './Discover.module.scss';
import SectionWrapper from '../SectionWrapper';
import Tags from '~/components/Tags';

const cx = classNames.bind(styles);

function Discover({ className }) {
  return (
    <SectionWrapper className={cx('wrapper', className)}>
      <p className={cx('title')}>Discover</p>
      <div className={cx('tags')}>
        <Tags text outline>
          suthatla
        </Tags>
        <Tags text outline>
          mackedoi
        </Tags>
        <Tags text outline>
          sansangthaydoi
        </Tags>
        <Tags music outline>
          Yêu Đơn Phương Là Gì (MEE Remix) - Mee Media & h0n
        </Tags>
        <Tags music outline>
          Về Nghe Mẹ Ru - NSND Bach Tuyet & Hứa Kim Tuyền & 14 Casper & Hoàng
          Dũng
        </Tags>
        <Tags music outline>
          Thiên Thần Tình Yêu - RICKY STAR
        </Tags>
        <Tags text outline>
          7749hieuung
        </Tags>
        <Tags text outline>
          genzlife
        </Tags>
        <Tags music outline>
          Tình Đã Đầy Một Tim - Huyền Tâm Môn
        </Tags>
        <Tags music outline>
          Thằng Hầu (Thái Hoàng Remix) [Short Version] - Dunghoangpham
        </Tags>
      </div>
    </SectionWrapper>
  );
}

Discover.propTypes = {
  className: PropTypes.string,
};

export default Discover;
