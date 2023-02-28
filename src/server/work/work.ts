import axios from 'axios';

export const works = async () => {
  return await axios.get('/work');
};


