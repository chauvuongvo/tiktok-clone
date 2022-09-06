import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './SuggestedAccounts.module.scss';
import AccountInfo from '../Popper/AccountInfo';
import AccountItem from '../AccountItem';
import SectionWrapper from '~/layouts/components/Sidebar/SectionWrapper';
import * as services from '~/services';

const cx = classNames.bind(styles);
const PER_PAGE = 15;

function SuggestedAccounts({
  data: accountList,
  className,
  isSidebar = false,
}) {
  const offsetResponse = { offset: [45, -100] };
  const offsetNormal = { offset: [-8, -52] };
  const [props, setProps] = useState(() =>
    isSidebar && window.innerWidth < 1071 ? offsetResponse : offsetNormal,
  );
  const [seeAllBtn, setSeeAllBtn] = useState(true);
  const [renderList, setRenderList] = useState([]);
  const [pages, setPages] = useState({ page: 1, perPage: PER_PAGE });

  const suggestRef = useRef();

  useEffect(() => {
    const fetchApi = async () => {
      const result = await services.suggestAccounts(pages.page, pages.perPage);
      if (renderList.length > 0) setSeeAllBtn(false);
      if (renderList.length === 0) {
        setRenderList(result.slice(0, 5));
        suggestRef.accountList = [...result];
      } else {
        setRenderList([...suggestRef.accountList, ...result]);
        suggestRef.accountList = [...suggestRef.accountList, ...result];
      }
    };

    fetchApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pages]);

  useEffect(() => {
    const handleResizeWidth = () => {
      if (isSidebar && window.innerWidth < 1071) {
        setProps(offsetResponse);
      } else {
        setProps(offsetNormal);
      }
    };
    window.addEventListener('resize', handleResizeWidth);
    return () => window.removeEventListener('resize', handleResizeWidth);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLoadAccount = () => {
    if (suggestRef.accountList.length === PER_PAGE && seeAllBtn) {
      setPages({ page: 2, perPage: PER_PAGE });
      return;
    }

    if (!seeAllBtn) {
      setSeeAllBtn(true);
      setRenderList((prev) => prev.slice(0, 5));
    }

    if (suggestRef.accountList.length > PER_PAGE && seeAllBtn) {
      setRenderList([...suggestRef.accountList]);
      setSeeAllBtn(false);
    }
  };

  const render = () => {
    return renderList.map((item, index) => {
      return (
        <AccountInfo
          key={index}
          account={item}
          delay={[700, 0]}
          isSidebar
          appendTo={() => document.getElementById('sidebar')}
          {...props}
        >
          <AccountItem
            data={item}
            className={cx('item', 'response-center')}
            isSidebar
          />
        </AccountInfo>
      );
    });
  };

  return (
    <SectionWrapper className={cx('wrapper', className)} ref={suggestRef}>
      <p className={cx('title', 'response-hidden')}>Suggested Accounts</p>

      {render()}

      <div
        className={cx('see-btn', 'response-hidden')}
        onClick={handleLoadAccount}
      >
        {seeAllBtn ? 'See all' : 'See less'}
      </div>
    </SectionWrapper>
  );
}

SuggestedAccounts.propTypes = {
  data: PropTypes.array.isRequired,
  className: PropTypes.string,
};

export default SuggestedAccounts;
