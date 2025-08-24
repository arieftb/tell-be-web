import AxiosClient from '../api/AxiosClient.js';

async function getAllThreads() {
  const {data} = await AxiosClient.get('/threads');
  return data.data.threads;
}

async function getThreadDetail(threadId) {
  const {data} = await AxiosClient.get(`/threads/${threadId}`);
  return data.data.detailThread;
}

async function submitComment({threadId, content}) {
  const token = localStorage.getItem('accessToken');
  const {data} = await AxiosClient.post(`/threads/${threadId}/comments`, {
    content,
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data.data.comment;
}

async function submitThread({title, body, category}) {
  const token = localStorage.getItem('accessToken');
  const {data} = await AxiosClient.post('/threads', {
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

async function upVoteThread(threadId) {
  const token = localStorage.getItem('accessToken');
  const {data} = await AxiosClient.post(`/threads/${threadId}/up-vote`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data.data.vote;
}

async function downVoteThread(threadId) {
  const token = localStorage.getItem('accessToken');
  const {data} = await AxiosClient.post(`/threads/${threadId}/down-vote`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data.data.vote;
}

async function neutralVoteThread(threadId) {
  const token = localStorage.getItem('accessToken');
  const {data} = await AxiosClient.post(
      `/threads/${threadId}/neutral-vote`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
  );
  return data.data.vote;
}

async function upVoteComment(threadId, commentId) {
  const token = localStorage.getItem('accessToken');
  const {data} = await AxiosClient.post(`/threads/${threadId}/comments/${commentId}/up-vote`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data.data.vote;
}

async function downVoteComment(threadId, commentId) {
  const token = localStorage.getItem('accessToken');
  const {data} = await AxiosClient.post(`/threads/${threadId}/comments/${commentId}/down-vote`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data.data.vote;
}

async function neutralVoteComment(threadId, commentId) {
  const token = localStorage.getItem('accessToken');
  const {data} = await AxiosClient.post(`/threads/${threadId}/comments/${commentId}/neutral-vote`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data.data.vote;
}

export {
  getAllThreads, getThreadDetail, submitComment, submitThread,
  upVoteThread, downVoteThread, neutralVoteThread, upVoteComment, downVoteComment, neutralVoteComment,
};
