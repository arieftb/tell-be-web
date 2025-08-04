import React from 'react';
import PropTypes from 'prop-types';
import styles from './Input.module.css';

function Input ({
  id,
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  error = false,
}) {
  const handleOnChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <input
      id={id}
      type={type}
      name={name}
      value={value}
      onChange={handleOnChange}
      placeholder={placeholder}
      required={required}
      className={`${styles.input} ${error ? styles.error : ''}`}
      disabled={disabled}
    />
  );
}

Input.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
};

export default Input;