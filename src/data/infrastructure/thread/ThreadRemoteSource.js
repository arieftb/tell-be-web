import AxiosClient from '../api/AxiosClient.js';

async function getAllThreads () {
  const { data } = await AxiosClient.get('/threads');
  return data.data.threads;
}

async function getThreadDetail (threadId) {
  const { data } = await AxiosClient.get(`/threads/${threadId}`);
  return data.data.detailThread;
}

export { getAllThreads, getThreadDetail };