import React from 'react';
import styles from './RegisterTemplate.module.css';
import SignUpForm from '../organisms/form/SignUpForm.jsx';
import PropTypes from 'prop-types';

export default function RegisterTemplate (
  { handleSubmit, status, error }
) {
  return (
    <section className={styles['register-template']}>
      <SignUpForm
        onSubmit={handleSubmit}
        isSubmitting={status === 'loading'}
        successMessage={status === 'succeeded' ? 'Registration successful!' : ''}
        errorMessage={status === 'failed' ? error : ''}
      />
    </section>
  );
}

RegisterTemplate.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
};
