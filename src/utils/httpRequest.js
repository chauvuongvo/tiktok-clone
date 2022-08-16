import axios from 'axios';

const httpRequest = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});
export const get = async (path, optional = {}) => {
  const response = await httpRequest.get(path, optional);
  return response.data;
};

export default httpRequest;
