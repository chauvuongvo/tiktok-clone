import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import Posts from '~/components/Posts';
import { useEffect, useState, useRef } from 'react';
import { LoadDataIcon } from '~/components/Icons';
import * as services from '~/services';
import { useElementOnScreen } from '~/hooks';

const cx = classNames.bind(styles);

function Home() {
  const [postList, setPostList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const observeRef = useRef();

  async function getData(pageSearch) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const result = await services.postVideos('for-you', pageSearch);
    setPostList((prev) => [...prev, ...result]);
    setLoading(false);
  }

  async function getMoreData() {
    setLoading(true);
    await getData(page + 1);
    setPage(page + 1);
  }

  const isVisible = useElementOnScreen({ threshold: 1 }, observeRef);

  useEffect(() => {
    getData(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    getMoreData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  return (
    <div className={cx('wrapper')}>
      {postList.map((account, index) => (
        <Posts data={account} key={index} />
      ))}

      {loading && <LoadDataIcon />}

      {/* Infinitive Scroll with IntersectionObserver
          Mounted when postList were rended (postList have item)
      */}
      {!loading && postList.length > 0 && <div ref={observeRef}></div>}
    </div>
  );
}

export default Home;
