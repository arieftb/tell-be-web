import InputField from './InputField.jsx';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';

const PasswordInputField = ({
  id,
  label = 'Password',
  placeholder,
  onChange,
  disabled = false,
  required = false,
  maxLength = 255,
  minLength = 8,
  value = '',
}) => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const validatePassword = useCallback((password) => {
    const valueToValidate = password || '';

    if (required && !valueToValidate.trim()) {
      setError(true);
      setErrorMessage(`${label} is required`);
      return false;
    }

    if (valueToValidate.length > 0 && valueToValidate.length < minLength) {
      setError(true);
      setErrorMessage(`${label} must be at least ${minLength} characters`);
      return false;
    }

    if (valueToValidate.length > maxLength) {
      setError(true);
      setErrorMessage(`${label} must be less than ${maxLength} characters`);
      return false;
    }

    setError(false);
    setErrorMessage('');
    return true;
  }, [minLength, maxLength, required, label]);

  const handleChange = useCallback((newValue) => {
    validatePassword(newValue);
    onChange(newValue);
  }, [onChange, validatePassword]);

  useEffect(() => {
    if (value) {
      validatePassword(value);
    }
  }, [value, validatePassword]);

  return (
    <InputField
      id={id}
      label={label}
      disabled={disabled}
      placeholder={placeholder}
      onChange={handleChange}
      error={error}
      errorMessage={errorMessage}
      required={required}
      maxLength={maxLength}
      minLength={minLength}
      type="password"
      value={value}
    />
  );
};

PasswordInputField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  maxLength: PropTypes.number,
  minLength: PropTypes.number,
  value: PropTypes.string,
};

PasswordInputField.defaultProps = {
  placeholder: '',
  disabled: false,
  required: false,
  maxLength: 255,
  minLength: 8,
  value: '',
};

export default PasswordInputField;
