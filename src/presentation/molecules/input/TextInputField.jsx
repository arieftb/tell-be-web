import InputField from './InputField.jsx';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';

const TextInputField = ({
  id,
  label,
  placeholder = '',
  onChange,
  error: propError,
  errorMessage: propErrorMessage,
  disabled = false,
  required = false,
  maxLength = 255,
  minLength = 0,
  validationRegex,
  value = '',
}) => {
  const [localError, setLocalError] = useState(false);
  const [localErrorMessage, setLocalErrorMessage] = useState('');

  const error = propError !== undefined ? propError : localError;
  const errorMessage = propErrorMessage !== undefined ? propErrorMessage : localErrorMessage;

  const validateInput = useCallback((inputValue) => {
    const valueToValidate = inputValue || '';

    if (required && !valueToValidate.trim()) {
      setLocalError(true);
      setLocalErrorMessage(`${label} is required`);
      return false;
    }

    if (valueToValidate.length > 0 && valueToValidate.length < minLength) {
      setLocalError(true);
      setLocalErrorMessage(`${label} must be at least ${minLength} characters`);
      return false;
    }

    if (valueToValidate.length > maxLength) {
      setLocalError(true);
      setLocalErrorMessage(`${label} must be less than ${maxLength} characters`);
      return false;
    }

    if (valueToValidate.length > 0 && validationRegex && !validationRegex.test(valueToValidate)) {
      setLocalError(true);
      setLocalErrorMessage(`Invalid ${label.toLowerCase()} format`);
      return false;
    }

    setLocalError(false);
    setLocalErrorMessage('');
    return true;
  }, [label, minLength, maxLength, required, validationRegex]);

  const handleChange = useCallback((newValue) => {
    if (propError === undefined) {
      validateInput(newValue);
    }
    onChange(newValue);
  }, [onChange, validateInput, propError]);

  useEffect(() => {
    if (value) {
      validateInput(value);
    }
  }, [value, validateInput]);

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
      type="text"
    />
  );
};

TextInputField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  error: PropTypes.bool,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  maxLength: PropTypes.number,
  minLength: PropTypes.number,
  validationRegex: PropTypes.instanceOf(RegExp),
  value: PropTypes.string,
};

TextInputField.defaultProps = {
  placeholder: '',
  errorMessage: undefined,
  error: undefined,
  disabled: false,
  required: false,
  maxLength: 255,
  minLength: 0,
  validationRegex: undefined,
  value: '',
};

export default TextInputField;
