import axios from 'axios';

export const createClient = async (data) => {
  return await axios.post('/client',data);
};

export const loginClient = async (data) => {
  return await axios.post('/client/login',data);
};

export const getAllClient = async () => {
  return await axios.get('/client');
};

export const getSingleClient = async (data: any) => {
  return await axios.post('/client/getSingleClient',data);
};

// export const updateStatus = async (data) => {
//   return await axios.patch('/employee/updateStatus',data);
// };

// export const deleteItems = async (data) => {
//   console.log("Data",data);
//   return await axios.put('/createWork',data);
// };


