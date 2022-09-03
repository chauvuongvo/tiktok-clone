import PropTypes from 'prop-types';
import * as httpRequest from '~/utils/httpRequest';

const followingAccounts = async (page, token) => {
  try {
    const res = await httpRequest.get('me/followings', {
      params: {
        page,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

followingAccounts.propTypes = {
  page: PropTypes.number.isRequired,
};

export default followingAccounts;
