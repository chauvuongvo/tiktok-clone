import user_1 from './user_1';
import user_2 from './user_2';
import user_3 from './user_3';
import user_4 from './user_4';
import user_5 from './user_5';
import user_6 from './user_6';
// import user_7 from './user_7';
import user_8 from './user_8';
import user_9 from './user_9';
import user_10 from './user_10';
import user_11 from './user_11';
import user_12 from './user_12';
import user_13 from './user_13';
import user_14 from './user_14';
import user_15 from './user_15';
import user_16 from './user_16';
import user_17 from './user_17';
import user_18 from './user_18';

const videos = {
  data: [
    user_1,
    user_2,
    user_3,
    user_4,
    user_5,
    user_6,
    // user_7,
    user_8,
    user_9,
    user_10,
    user_11,
    user_12,
    user_13,
    user_14,
    user_15,
    user_16,
    user_17,
    user_18,
  ],

  getVideo: function (videoId) {
    for (let userIndex = 0; userIndex < this.data.length; userIndex++) {
      const video = this.data[userIndex].data.find(
        (video) => video.id === videoId,
      );

      if (!!video) return { userId: this.data[userIndex].userId, ...video };
    }
    return {};
  },

  getVideosOfUser: function (userId) {
    const videos = this.data.find((user) => user.userId === userId);
    return !!videos ? videos.data : [];
  },

  getRandomVideo: function (userId) {
    const videosOfUser = this.getVideosOfUser(userId);

    if (videosOfUser.length > 0) {
      const indexRandom = Math.trunc(Math.random() * videosOfUser.length);
      // console.log(indexRandom);
      return { userId, ...videosOfUser[indexRandom] };
      // return { ...videosOfUser[0] };
    }

    return {};
  },

  getRandomUser: function () {
    const indexRandom = Math.trunc(Math.random() * this.data.length);
    return this.data[indexRandom];
    // console.log(this.data[0]);
    // return this.data[4];
  },
};

export default videos;
