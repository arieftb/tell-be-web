import AxiosClient from '../api/AxiosClient.js';

async function getAllUsers() {
  const {data} = await AxiosClient.get('/users');
  return data.data.users;
}

async function getLeaderboards() {
  const {data} = await AxiosClient.get('/leaderboards');
  return data.data.leaderboards;
}

export {getAllUsers, getLeaderboards};
