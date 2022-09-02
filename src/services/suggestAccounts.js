import PropTypes from 'prop-types';
import * as httpRequest from '~/utils/httpRequest';

const suggestAccounts = async (page, per_page) => {
  // users/suggested?page=1&per_page=10
  try {
    const res = await httpRequest.get('users/suggested', {
      params: {
        page,
        per_page,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

suggestAccounts.propTypes = {
  page: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
};

export default suggestAccounts;
