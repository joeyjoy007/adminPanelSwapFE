import axios from 'axios';

export const getEmployee = async () => {
  return await axios.get('/employee');
};


