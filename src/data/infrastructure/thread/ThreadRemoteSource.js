import AxiosClient from '../api/AxiosClient.js';

async function getAllThreads () {
  const { data } = await AxiosClient.get('/threads');
  return data.data.threads;
}

export { getAllThreads };