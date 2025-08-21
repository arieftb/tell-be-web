import InputField from './InputField.jsx';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';

const BodyInputField = ({
  id,
  label = 'Body',
  placeholder,
  onChange,
  disabled = false,
  required = false,
  maxLength = 1000,
  minLength = 1,
  value = '',
  rows = 5,
}) => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const validateBody = useCallback((body) => {
    const valueToValidate = body || '';

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
    validateBody(newValue);
    onChange(newValue);
  }, [onChange, validateBody]);

  useEffect(() => {
    if (value) {
      validateBody(value);
    }
  }, [value, validateBody]);

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
      value={value}
      multiline={true}
      rows={rows}
    />
  );
};

BodyInputField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  maxLength: PropTypes.number,
  minLength: PropTypes.number,
  value: PropTypes.string,
  rows: PropTypes.number,
};

BodyInputField.defaultProps = {
  placeholder: '',
  disabled: false,
  required: false,
  maxLength: 1000,
  minLength: 1,
  value: '',
  rows: 5,
};

export default BodyInputField;
