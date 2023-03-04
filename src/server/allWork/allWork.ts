import axios from 'axios';

export const allworkCreate = async (data) => {
  return await axios.post('/createWork',data);
};

export const updateStatus = async (data) => {
  return await axios.patch('/employee/updateStatus',data);
};

export const deleteItems = async (data) => {
  console.log("Data",data);
  return await axios.put('/createWork',data);
};

export const deleteCompleteFile = async (data) => {
  console.log("Data",data);
  return await axios.patch('/createWork/deleteCompleted',data);
};


