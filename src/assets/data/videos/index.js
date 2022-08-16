import user_1 from './user_1';
import user_2 from './user_2';
import user_3 from './user_3';
import user_4 from './user_4';
import user_5 from './user_5';
import user_6 from './user_6';
// import thientamnguyen from './6707412499560465410';
// import theanh28entertainment from './6713788996806706178';
// import datvilla94 from './6715256918355756033';
// import tiin from './6724460466796282882';
// import moonaov from './6819245573318493185';
// import laptrinhvientv from './6856506955180246017';
// import vnnn from './6861227745541915649';
// import _60giay from './6918910425120818178';
// import smartenglish from './7010217376990905346';
// import reed from './7042240604214690818';
// import cvn from './7067385675150902298';
// import xiaobaozii from './7073665939901285402';

const videos = {
  data: [user_1, user_2, user_3, user_4, user_5, user_6],

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
      const indexRandom = Math.round(Math.random() * videosOfUser.length);
      // return { userId, ...videosOfUser[indexRandom] };
      return { ...videosOfUser[0] };
    }

    return {};
  },

  getRandomUser: function () {
    const indexRandom = Math.round(Math.random() * this.data.length);
    // return [...this.data[indexRandom]]
    // console.log(this.data[0]);
    return this.data[4];
  },
};

export default videos;
