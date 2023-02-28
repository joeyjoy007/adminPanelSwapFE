import axios from 'axios';

export const loginAdmin = async (data: any) => {
  return await axios.post('/admin/login', data);
};


