import PropTypes from 'prop-types';
import * as httpRequest from '~/utils/httpRequest';

const suggestAccounts = async (type, page) => {
  try {
    const res = await httpRequest.get('videos', {
      params: {
        type,
        page,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

suggestAccounts.propTypes = {
  page: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};

export default suggestAccounts;
