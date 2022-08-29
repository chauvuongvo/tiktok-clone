import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import HeadlessTippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';

import * as services from '~/services';
import { useDebounce } from '~/hooks';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem/AccountItem';
import { SearchIcon } from '~/components/Icons/Icons';
import styles from './Search.module.scss';
import config from '~/config';

const cx = classNames.bind(styles);

function Search() {
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);

  const inputRef = useRef();
  const searchPage = useNavigate();
  const handleRouterChange = () => {
    const path = `${config.routes.search}?q=${searchValue}`;
    searchPage(path);
    setShowResult(false);
  };

  const debouncedValue = useDebounce(searchValue, 600);
  useEffect(() => {
    if (!debouncedValue) {
      setSearchResult([]);
      setLoading(false);
      return;
    }

    const fetchApi = async () => {
      setLoading(true);

      const result = await services.search(debouncedValue);
      setSearchResult(result);

      setLoading(false);
    };

    fetchApi();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  const handleSearch = (e) => {
    const value = e.target.value;

    if (!value.startsWith(' ')) {
      setSearchValue(value);
      setLoading(true);
    }
  };

  const handleClear = () => {
    setSearchValue('');
    setSearchResult([]);
    inputRef.current.focus();
  };

  return (
    <div>
      <HeadlessTippy
        interactive
        visible={showResult && searchResult.length > 0}
        placement="top"
        render={(attrs) => (
          <div {...attrs}>
            <PopperWrapper className={cx('search-popper')}>
              <h3 className={cx('search-title')}>Accounts</h3>
              {searchResult.map((account) => {
                const data = {};
                data.link = `/@${account.nickname}`;
                data.avatar = account.avatar;
                data.uniqueId = account.nickname;
                data.isVerified = account.tick;
                data.fullName = account.full_name;

                return <AccountItem key={account.id} data={data} />;
              })}
              <div className={cx('search-text')} onClick={handleRouterChange}>
                View all results for "{searchValue}"
              </div>
            </PopperWrapper>
          </div>
        )}
        onClickOutside={() => setShowResult(false)}
      >
        <div className={cx('search')}>
          <input
            value={searchValue}
            ref={inputRef}
            placeholder="Search accounts and videos"
            spellCheck={false}
            onChange={(e) => handleSearch(e)}
            onFocus={() => setShowResult(true)}
          />

          {!!searchValue && !loading && (
            <button className={cx('clear')} onClick={handleClear}>
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
          )}

          {loading && (
            <FontAwesomeIcon icon={faSpinner} className={cx('loading')} />
          )}

          <button
            className={cx('search-btn')}
            type="submit"
            onMouseDown={(e) => e.preventDefault()}
            onClick={handleRouterChange}
          >
            <SearchIcon width={24} height={24} />
          </button>
        </div>
      </HeadlessTippy>
    </div>
  );
}

export default Search;
