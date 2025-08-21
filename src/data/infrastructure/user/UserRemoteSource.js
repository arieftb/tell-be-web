import AxiosClient from '../api/AxiosClient.js';

async function getAllUsers() {
  const {data} = await AxiosClient.get('/users');
  return data.data.users;
}

export {getAllUsers};
