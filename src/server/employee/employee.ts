import axios from 'axios';

export const getEmployee = async () => {
  return await axios.get('/employee');
};

export const createEmployee = async (data: any) => {
  console.log("Da",data)
  return await axios.post('/employee',data);
};


export const getEmployeeDetail = async (data: any) => {
  return await axios.post('/employee/getSingleEmployee',{data});
};

