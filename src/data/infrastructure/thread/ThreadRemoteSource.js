import AxiosClient from '../api/AxiosClient.js';

async function getAllThreads () {
  const { data } = await AxiosClient.get('/threads');
  return data.data.threads;
}

async function getThreadDetail (threadId) {
  const { data } = await AxiosClient.get(`/threads/${threadId}`);
  return data.data.detailThread;
}

async function submitComment ({ threadId, content }) {
  const token = localStorage.getItem('accessToken');
  const { data } = await AxiosClient.post(`/threads/${threadId}/comments`, {
    content,
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data.data.comment;
}

async function submitThread ({ title, body, category }) {
  const token = localStorage.getItem('accessToken');
  const { data } = await AxiosClient.post('/threads', {
    title,
    body,
    category,
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data.data.thread;
}

export { getAllThreads, getThreadDetail, submitComment, submitThread };
