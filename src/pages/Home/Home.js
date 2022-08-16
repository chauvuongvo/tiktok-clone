import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import videos from '~/assets/data/videos';
import Posts from '~/components/Posts';
import { useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';

const cx = classNames.bind(styles);

function Home() {
  // console.log(videos[0].data);
  // console.log(videos.data[4]);
  // console.log(videos.getVideo(7131718645088128282));
  // console.log(videos.getVideosOfUser(6574657885953933314));

  const getUser = useMemo(() => {
    const userId = videos.getRandomUser().userId;

    const videoRandom = videos.getRandomVideo(userId);
    // console.log(videoRandom);
    return { userId, ...videoRandom };
  }, []);

  // useEffect(() => {
  //   console.log(getUser);
  // }, []);

  // const videoId = 7131712545072762139;
  // const video = videos.getVideo(userId);

  // console.log(videos.getRandomVideo(6574657885953933314));

  // const str = video.video.html;

  // const musicHtml = str.match(/<a.+href.+\/music\/.+<\/a>/)[0];

  // const musicTitle = musicHtml.replaceAll(/<a.+">|<\/a>/gim, '');

  // console.log(musicTitle);
  const test = useRef();

  return (
    <div className={cx('wrapper')} ref={test}>
      <Posts data={getUser} />
    </div>
  );
}

export default Home;
