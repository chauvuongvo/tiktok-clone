import * as httpRequest from '~/utils/httpRequest';

const profile = async (q, type = 'less') => {
  try {
    const res = await httpRequest.get('users/profile', {
      params: {
        q,
        type,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export default profile;
