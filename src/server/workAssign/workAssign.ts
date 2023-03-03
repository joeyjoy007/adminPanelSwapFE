import axios from 'axios';

export const assignWork = async (data: any) => {
  return await axios.post('/assignWork', data);
};

export const getAssignWork = async () => {
  return await axios.get('/assignWork');
};

export const createAssignWork = async (data: any) => {
  return await axios.post('/assignWork', data);
};

export const updateAssignWork = async (data) => {
  return await axios.patch('/assignWork',data);
};

export const selectEmployeeForWork = async (data) => {
  return await axios.patch('/assignWork/selectEmployee',data);
};

export const deleteWork = async (data) => {
  console.log("DAA",data);
  return await axios.put('/assignWork',data);
};


