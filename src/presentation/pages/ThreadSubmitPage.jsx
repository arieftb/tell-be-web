import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ThreadSubmitTemplate from '../templates/ThreadSubmitTemplate';
import { resetSubmitThreadStatus, selectSubmitThreadStatus, submitThread } from '../redux/thread/threadSlice';

import { selectIsLoggedIn } from '../redux/auth/authSlice';

const ThreadSubmitPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const submitThreadStatus = useSelector(selectSubmitThreadStatus);

  useEffect(() => {
    dispatch(resetSubmitThreadStatus());
  }, [dispatch]);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = (threadData) => {
    dispatch(submitThread(threadData));
  };

  useEffect(() => {
    if (submitThreadStatus === 'succeeded') {
      navigate('/');
    }
  }, [submitThreadStatus, navigate]);

  return (
    <ThreadSubmitTemplate
      onSubmit={handleSubmit}
      isLoading={submitThreadStatus === 'loading'}
    />
  );
};

export default ThreadSubmitPage;