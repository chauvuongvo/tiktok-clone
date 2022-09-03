import axios from 'axios';

const auth = localStorage.getItem('currentUser');

const httpRequest = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

if (auth) {
  httpRequest.defaults.headers.common['Authorization'] = `Bearer ${
    JSON.parse(auth).meta.token
  }`;
}

export const get = async (path, optional = {}) => {
  const response = await httpRequest.get(path, optional);
  return response.data;
};

export const post = async (path, data, optional = {}) => {
  const response = await httpRequest.post(path, data, optional);
  return response.data;
};

export default httpRequest;
