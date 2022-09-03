import PropTypes from 'prop-types';
import * as httpRequest from '~/utils/httpRequest';

const authLogin = async (data, callbackError) => {
  try {
    const res = await httpRequest.post('auth/login', data);
    return res;
  } catch (error) {
    if (callbackError) callbackError(error);
    else console.log(error);
  }
};

authLogin.propTypes = {
  data: PropTypes.any.isRequired,
};

export default authLogin;
