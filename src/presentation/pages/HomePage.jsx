import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchThreads,
  selectAllThreads,
  selectThreadsError,
  selectThreadsStatus
} from '../redux/thread/threadSlice.js';
import HomeTemplate from '../templates/HomeTemplate.jsx';

function HomePage () {
  const dispatch = useDispatch();
  const threads = useSelector(selectAllThreads);
  const status = useSelector(selectThreadsStatus);
  const error = useSelector(selectThreadsError);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchThreads());
    }
  }, [status, dispatch]);

  return (
    <HomeTemplate threads={threads} status={status} error={error}/>
  );
}

export default HomePage;