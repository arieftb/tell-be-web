import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  registerAndLoginUser, selectAuthError, selectAuthStatus,
} from '../redux/auth/authSlice.js';
import RegisterTemplate from './RegisterTemplate.jsx';

export default function RegisterPage() {
  const dispatch = useDispatch();
  const status = useSelector(selectAuthStatus);
  const error = useSelector(selectAuthError);

  const handleSubmit = (formData) => {
    dispatch(registerAndLoginUser(formData));
  };

  return (
    <RegisterTemplate
      handleSubmit={handleSubmit}
      status={status}
      error={error}
    />
  );
}
