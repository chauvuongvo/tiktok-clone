import PropTypes from 'prop-types';
import * as httpRequest from '~/utils/httpRequest';

const search = async (q, type = 'less') => {
  try {
    const res = await httpRequest.get('users/search', {
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

search.propTypes = {
  q: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default search;
