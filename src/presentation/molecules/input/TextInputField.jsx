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
  inputMode,
}) => {
  const [localError, setLocalError] = useState(false);
  const [localErrorMessage, setLocalErrorMessage] = useState('');
  const [localValue, setLocalValue] = useState(value);

  const error = propError !== undefined ? propError : localError;
  const errorMessage = propErrorMessage !== undefined ?
    propErrorMessage : localErrorMessage;

  const validateInput = useCallback((inputValue) => {
    const valueToValidate = inputValue || '';

    if (required && !valueToValidate.trim()) {
      setLocalError(true);
      setLocalErrorMessage(`${label} is required`);
      return false;
    }

    if (valueToValidate.length > 0 && valueToValidate.length < minLength) {
      setLocalError(true);
      setLocalErrorMessage(
        `${label} must be at least ${minLength} characters`);
      return false;
    }

    if (valueToValidate.length > maxLength) {
      setLocalError(true);
      setLocalErrorMessage(
        `${label} must be less than ${maxLength} characters`);
      return false;
    }

    if (
      valueToValidate.length > 0 &&
      validationRegex &&
      !validationRegex.test(valueToValidate)
    ) {
      setLocalError(true);
      setLocalErrorMessage(`Invalid ${label.toLowerCase()} format`);
      return false;
    }

    setLocalError(false);
    setLocalErrorMessage('');
    return true;
  }, [label, minLength, maxLength, required, validationRegex]);

  useEffect(() => {
    if (value) {
      validateInput(value);
    }
  }, [value, validateInput]);

  const handleInputChange = useCallback((newValue) => {
    setLocalValue(newValue);
    if (propError === undefined) {
      validateInput(newValue);
    }
    onChange(newValue);
  }, [onChange, validateInput, propError]);

  return (
    <InputField
      id={id}
      label={label}
      disabled={disabled}
      placeholder={placeholder}
      onChange={handleInputChange}
      error={error}
      errorMessage={errorMessage}
      required={required}
      maxLength={maxLength}
      minLength={minLength}
      value={localValue}
      type="text"
      inputMode={inputMode}
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
  inputMode: PropTypes.string,
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
  inputMode: undefined,
};

export default TextInputField;
