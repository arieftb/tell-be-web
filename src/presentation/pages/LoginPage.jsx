import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser, selectAuthError, selectAuthStatus, selectAuthToken } from '../redux/auth/authSlice.js';
import LoginTemplate from './LoginTemplate.jsx';

export default function LoginPage () {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const status = useSelector(selectAuthStatus);
  const error = useSelector(selectAuthError);
  const token = useSelector(selectAuthToken);

  useEffect(() => {
    if (status === 'succeeded' && token) {
      navigate('/'); // Redirect to home or dashboard after successful login
    }
  }, [status, token, navigate]);

  const handleSubmit = (formData) => {
    dispatch(loginUser(formData));
  };

  return (
    <LoginTemplate handleSubmit={handleSubmit} status={status} error={error}/>
  );
}