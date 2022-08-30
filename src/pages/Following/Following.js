import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Following.module.scss';
import Portal from '~/components/Portal';
import accounts from '~/assets/data/accounts';
import videos from '~/assets/data/videos';
import { LoadDataIcon } from '~/components/Icons';
import Posts from '~/components/Posts';

const cx = classNames.bind(styles);

function Following() {
  const [postList, setPostList] = useState(getPostList(5));
  const [loading, setLoading] = useState(false);
  const [atBottom, setBottom] = useState(false);
  function getPostList(count) {
    const result = [];

    for (let i = 0; i < count; i++) {
      // Fake default video for account do not video
      const defaultUserId = '6574657885953933314';
      const defaultVideo = videos.getRandomVideo(defaultUserId);
      delete defaultVideo.userId;

      const userId = accounts.followingFullList.getRandomUser();
      const info = accounts.fullAccountList.getAccount(userId);
      let videoRandom = videos.getRandomVideo(userId);

      if (Object.keys(videoRandom).length === 0) videoRandom = defaultVideo;
      result.push({ ...videoRandom, info });
    }
    return result;
  }
  console.log(getPostList(5));

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
      {postList.map((post, index) => (
        <Posts data={post} key={index} />
      ))}

      {loading && <LoadDataIcon />}

      <Portal containerId={'following'}>
        <button>Following</button>
      </Portal>
    </div>
  );
}

export default Following;
