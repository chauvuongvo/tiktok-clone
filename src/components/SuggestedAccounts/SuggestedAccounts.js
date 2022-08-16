import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './SuggestedAccounts.module.scss';
import AccountInfo from '../Popper/AccountInfo';
import AccountItem from '../AccountItem';
import SectionWrapper from '~/layouts/components/Sidebar/SectionWrapper';

const cx = classNames.bind(styles);

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
  const [seeAllAccount, setSeeAllAccount] = useState(false);
  const [renderList, setRenderList] = useState(accountList.slice(0, 5));

  useEffect(() => {
    if (seeAllAccount) setRenderList([...accountList]);
    else setRenderList([...accountList.slice(0, 5)]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seeAllAccount]);

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

  const render = () => {
    return renderList.map((account, index) => {
      const link = account.cardItem.link;
      const avatar = account.cardItem.cover;
      const nickname = account.cardItem.subTitle.replace('@', '');
      const isVerified = account.cardItem.extraInfo.verified;
      const fullName = account.cardItem.title;

      return (
        <AccountInfo
          key={index}
          account={account.cardItem}
          isSidebar
          appendTo={() => document.getElementById('sidebar')}
          {...props}
        >
          <AccountItem
            data={{ link, avatar, nickname, isVerified, fullName }}
            className={cx('item', 'response-center')}
          />
        </AccountInfo>
      );
    });
  };

  return (
    <SectionWrapper className={cx('wrapper', className)}>
      <p className={cx('title', 'response-hidden')}>Suggested Accounts</p>

      {render()}

      <div
        className={cx('see-btn', 'response-hidden')}
        onClick={() => setSeeAllAccount(!seeAllAccount)}
      >
        {seeAllAccount ? 'See less' : 'See all'}
      </div>
    </SectionWrapper>
  );
}

SuggestedAccounts.propTypes = {
  data: PropTypes.array.isRequired,
  className: PropTypes.string,
};

export default SuggestedAccounts;
