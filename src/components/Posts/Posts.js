import PropTypes from 'prop-types';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './Posts.module.scss';
import Image from '../Image';
import Video from './Video';
import Info from './Info';
import AccountInfo from '../Popper/AccountInfo';
import Action from './Action';

const cx = classNames.bind(styles);

function Posts({ data: { user, meta, ...data }, className }) {
  // console.log(info);
  // const postedDay = video.createdDate;
  // const comment = video.title;
  // const likeCount = video.likeCount;
  // const commentCount = video.comment.total;
  // const shareCount = video.shareCount;
  // const account = {};
  // if (info.user) {
  //   account.uniqueId = info.user.uniqueId;
  //   account.avatar = info.user.avatarThumb;
  //   account.link = info.user.uniqueId;
  //   account.isVerified = info.user.verified;
  //   account.fullName = info.user.nickname;
  //   account.follower = info.stats.followerCount;
  //   account.signature = info.user.signature;
  //   account.liker = info.stats.heartCount;
  //   account.isFollowing = true;
  // } else {
  //   account.link = info.link;
  //   account.uniqueId = info.subTitle.slice(1);
  //   account.avatar = info.cover;
  //   account.isVerified = info.extraInfo.verified;
  //   account.fullName = info.title;
  //   account.follower = +info.extraInfo.fans;
  //   account.liker = +info.extraInfo.likes;
  //   account.signature = info.description;
  //   account.isFollowing = false;
  // }

  const postRef = useRef();

  // Create a list title and tag for a post from title of video
  const postTitleList = (function () {
    const handleComment = (str) => {
      const arr = str.split(' ');
      let prevArray;
      return arr.reduce((prev, curr, index) => {
        let title;
        if (index === 0) return [curr];
        if (curr.startsWith('#') || curr.startsWith('@')) {
          return [...prev, curr];
        }

        if (
          prev[prev.length - 1].startsWith('@') ||
          prev[prev.length - 1].startsWith('#')
        ) {
          prevArray = [...prev];
          return [...prev, curr];
        }

        title = prev[prev.length - 1] + ' ' + curr;

        if (prev.length > 1) return [...prevArray, title];

        return [title];
      }, []);
    };

    const handleNearTag = (str) => {
      const reg = /@|#/gim;
      let index = str.search(reg);
      if (index === -1) return [str];

      const result = [str.slice(0, index)];
      let newStr = str.slice(index);
      index = newStr.slice(1).search(reg);

      while (index !== -1) {
        result.push(newStr.slice(0, index + 1));
        newStr = newStr.slice(index + 1);
        index = newStr.slice(1).search(reg);
      }
      result.push(newStr);

      return result.filter((item) => item !== '');
    };

    const arrNotNearTag = handleNearTag(data.description);
    let result = [];

    arrNotNearTag.forEach((item) => {
      if (item.includes('@') || item.includes('#')) {
        const newItem = handleComment(item);
        result = [...result, ...newItem];
      } else {
        result = [...result, item];
      }
    });
    return result;
  })();

  const postDayRender = (function () {
    const timeZone = '+7:00';
    const dateStrInput = data.created_at + timeZone;
    const dateInput = new Date(dateStrInput);

    const getDiffDay = (createdDay, dateNow = new Date()) => {
      if (createdDay.getTime() > dateNow.getTime())
        return 'Date input invailid';

      const difYear = dateNow.getFullYear() - createdDay.getFullYear();
      const difMonth = dateNow.getMonth() - createdDay.getMonth();
      const difDate = dateNow.getDate() - createdDay.getDate();
      const difHour = dateNow.getHours() - createdDay.getHours();
      const difMinute = dateNow.getMinutes() - createdDay.getMinutes();
      const difSecond = dateNow.getSeconds() - createdDay.getSeconds();

      if (difYear > 0) return createdDay.toLocaleDateString('en-CA');

      if (difMonth > 0 || difDate > 7) {
        return createdDay.toLocaleDateString('en-CA').slice(5);
      }

      if (difDate > 1) return difDate + 'd ago';

      // When time in a day
      if (difHour > 0) return difHour + 'h ago';

      if (difMinute > 0) return difMinute + 'p ago';

      return difSecond + 's ago';
    };

    // Handler with comment
    // const getDiffDayOfComment = (createdTime) => {
    //   const createdCommentDate = new Date();
    //   createdCommentDate.setTime(createdTime * 1000);

    //   return getDiffDay(createdCommentDate);
    // };
    return getDiffDay(dateInput);
  })();

  const handleCountStats = (count) => {
    const length = (count + '').length;
    let index = 6;
    let suffix = 'M';

    if (length <= 4) return count;
    if (length > 4 && length <= 6) {
      suffix = 'K';
      index = 3;
    }

    if (length > 9) {
      suffix = 'B';
      index = 9;
    }

    return (count / 10 ** index).toFixed(1) + suffix;
  };

  return (
    <div ref={postRef} className={cx('wrapper', className)}>
      <AccountInfo
        account={user}
        post
        className={cx('avatar')}
        placement="bottom-start"
        isFollowing
        offset={[-28, -50]}
        appendTo={() => postRef.current}
      >
        <Link to={`/@${user.nickname}`} className={cx('avatar-link')}>
          <Image
            src={user.avatar}
            alt={user.nickname}
            className={cx('image')}
          />
        </Link>
      </AccountInfo>

      <div className={cx('content')}>
        <Info
          data={{
            user,
            postDayRender,
            postTitleList,
            musicName: data.music,
            postRef,
          }}
        />

        <div className={cx('video-wrapper')}>
          <Video data={data} meta={meta} />

          <Action
            data={{
              likeCount: handleCountStats(data.likes_count),
              commentCount: handleCountStats(data.comments_count),
              shareCount: handleCountStats(data.shares_count),
            }}
          />
        </div>
      </div>
    </div>
  );
}

Posts.propTypes = {
  data: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default Posts;
