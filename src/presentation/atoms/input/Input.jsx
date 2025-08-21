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
  maxLength = 255,
  inputMode,
  multiline = false,
  rows = 3,
}) {
  const handleOnChange = (e) => {
    onChange(e.target.value);
  };

  if (multiline) {
    return (
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={handleOnChange}
        placeholder={placeholder}
        required={required}
        className={`${styles.input} ${error ? styles.error : ''}`}
        disabled={disabled}
        maxLength={maxLength}
        rows={rows}
      />
    );
  }

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
      maxLength={maxLength}
      inputMode={inputMode}
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
  maxLength: PropTypes.number,
  inputMode: PropTypes.string,
  multiline: PropTypes.bool,
  rows: PropTypes.number,
};

export default Input;
