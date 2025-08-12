import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, selectAuthError, selectAuthStatus } from '../redux/auth/authSlice.js';
import RegisterTemplate from './RegisterTemplate.jsx';
import SignUpForm from '../organisms/form/SignUpForm.jsx';

export default function RegisterPage () {
  const dispatch = useDispatch();
  const status = useSelector(selectAuthStatus);
  const error = useSelector(selectAuthError);

  const handleSubmit = (formData) => {
    dispatch(registerUser(formData));
  };

  return (
    <RegisterTemplate>
      <SignUpForm
        onSubmit={handleSubmit}
        isSubmitting={status === 'loading'}
        successMessage={status === 'succeeded' ? 'Registration successful!' : ''}
        errorMessage={status === 'failed' ? error : ''}
      />
    </RegisterTemplate>
  );
}
