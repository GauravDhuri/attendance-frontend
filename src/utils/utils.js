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

 const getStartAndEndDate = (option) => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const currentDate = today.getDate();
    const currentDay = today.getDay();

    let start, end;

    switch (option) {
      case 'week':

        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - currentDay);
        const endOfWeek = new Date(today);
        endOfWeek.setDate(today.getDate() + (6 - currentDay));
        start = startOfWeek.toISOString().split('T')[0];
        end = endOfWeek.toISOString().split('T')[0];
        break;
      
      case 'month':
        const startOfMonth = new Date(currentYear, currentMonth, 1);
        const endOfMonth = new Date(currentYear, currentMonth + 1, 0);
        start = startOfMonth.toISOString().split('T')[0];
        end = endOfMonth.toISOString().split('T')[0];
        break;

      case 'year':
        const startOfYear = new Date(currentYear, 0, 1);
        const endOfYear = new Date(currentYear, 11, 31);
        start = startOfYear.toISOString().split('T')[0];
        end = endOfYear.toISOString().split('T')[0];
        break;

      default:
        break;
    }
    
    return { start, end }
  };

export {
   postRequest,
   getCookie,
   getStartAndEndDate
}
