import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  fetchThreadDetail,
  selectDetailThread,
  selectDetailThreadError,
  selectDetailThreadStatus
} from '../redux/thread/threadSlice.js';
import ThreadDetailTemplate from '../templates/ThreadDetailTemplate.jsx';

function ThreadDetailPage () {
  const { threadId } = useParams();
  const dispatch = useDispatch();
  const thread = useSelector(selectDetailThread);
  const status = useSelector(selectDetailThreadStatus);
  const error = useSelector(selectDetailThreadError);

  useEffect(() => {
    if (status === 'idle' || (status === 'succeeded' && thread && thread.id !== threadId)) {
      dispatch(fetchThreadDetail(threadId));
    }
  }, [threadId, status, thread, dispatch]);

  return (
    <ThreadDetailTemplate thread={thread} status={status} error={error}/>
  );
}

export default ThreadDetailPage;