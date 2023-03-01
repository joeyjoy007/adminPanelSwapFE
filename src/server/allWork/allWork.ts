import axios from 'axios';

export const allworkCreate = async (data) => {
  return await axios.post('/createWork',data);
};

export const updateStatus = async (data) => {
  return await axios.patch('/employee/updateStatus',data);
};


