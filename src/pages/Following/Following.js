import { useState, useEffect, useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './Following.module.scss';
import { ContextApp } from '~/App';
import Portal from '~/components/Portal';
import accounts from '~/assets/data/accounts';
import videos from '~/assets/data/videos';
import { LoadDataIcon } from '~/components/Icons';
import Posts from '~/components/Posts';
import UserCard from '~/components/Card/UserCard';

const cx = classNames.bind(styles);

function Following() {
  const { currentUser } = useContext(ContextApp);
  const [postList, setPostList] = useState(() => {
    if (currentUser) return getPostList(5);
    return getPostList(30);
  });
  const [loading, setLoading] = useState(false);
  const [atBottom, setBottom] = useState(false);

  useEffect(() => {
    document.title =
      'Following - Watch videos from creators you follow | TikTok ';
  }, []);

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

  // Effect when login
  useEffect(() => {
    if (currentUser) {
      const handleScrollAtBottomPage = () => {
        const totalPageHeight = document.body.scrollHeight;
        const scrollPoint = window.scrollY + window.innerHeight;

        if (scrollPoint >= totalPageHeight) {
          setBottom(true);
        }
      };
      window.addEventListener('scroll', handleScrollAtBottomPage);

      return () =>
        window.removeEventListener('scroll', handleScrollAtBottomPage);
    }
  }, [currentUser]);

  useEffect(() => {
    if (atBottom && currentUser) {
      setLoading(true);

      const timerId = setTimeout(() => {
        setPostList((prev) => [...prev, ...getPostList(5)]);
        setLoading(false);
        setBottom(false);
      }, 1500);

      return () => clearTimeout(timerId);
    }
  }, [atBottom, currentUser]);

  // Effect when do not login

  return (
    <div className={cx('wrapper', 'no-login')}>
      {currentUser ? (
        postList.map((post, index) => <Posts data={post} key={index} />)
      ) : (
        <div className={cx('card-container')}>
          {postList.map((post, index) => (
            <UserCard data={post} key={index} />
          ))}
        </div>
      )}

      {loading && currentUser && <LoadDataIcon />}
    </div>
  );
}

export default Following;
