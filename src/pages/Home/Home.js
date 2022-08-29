import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import videos from '~/assets/data/videos';
import Posts from '~/components/Posts';
import accounts from '~/assets/data/accounts';
import { useEffect, useState } from 'react';
import { LoadDataIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

function Home() {
  const [postList, setPostList] = useState(getPostList(5));
  const [atBottom, setBottom] = useState(false);
  const [loading, setLoading] = useState(false);

  function getPostList(count) {
    const result = [];

    for (let i = 0; i < count; i++) {
      const userId = videos.getRandomUser();
      const videoRandom = videos.getRandomVideo(userId.userId);
      const info = accounts.fullAccountList.getAccount(userId.userId);
      result.push({ ...videoRandom, info });
    }
    return result;
  }

  useEffect(() => {
    const handleScrollAtBottomPage = () => {
      const totalPageHeight = document.body.scrollHeight;
      const scrollPoint = window.scrollY + window.innerHeight;

      if (scrollPoint >= totalPageHeight) {
        setBottom(true);
      }
    };
    window.addEventListener('scroll', handleScrollAtBottomPage);

    return () => window.removeEventListener('scroll', handleScrollAtBottomPage);
  }, []);

  useEffect(() => {
    if (atBottom) {
      setLoading(true);

      const timerId = setTimeout(() => {
        setPostList((prev) => [...prev, ...getPostList(5)]);
        setLoading(false);
        setBottom(false);
      }, 1500);

      return () => clearTimeout(timerId);
    }
  }, [atBottom]);

  return (
    <div className={cx('wrapper')}>
      {postList.map((user, index) => (
        <Posts data={user} key={index} />
      ))}

      {loading && <LoadDataIcon />}
    </div>
  );
}

export default Home;
