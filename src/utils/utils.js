import axios from 'axios';

const postRequest = async (endpoint, data, config = {}) => {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const url = `${baseUrl}${endpoint}`;

  try {
    const response = await axios.post(url, data, {
      ...config,
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Error making POST request:', error);
    throw error;
  }
};

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

export {
   postRequest,
   getCookie
}
