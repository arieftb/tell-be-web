import InputField from "./InputField.jsx";
import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";

const CategoryInputField = ({
  id,
  label = "Category",
  placeholder,
  onChange,
  disabled = false,
  required = false,
  maxLength = 50,
  minLength = 1,
  value = "",
}) => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const validateCategory = useCallback(
    (category) => {
      const valueToValidate = category || "";

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
      setErrorMessage("");
      return true;
    },
    [minLength, maxLength, required, label],
  );

  const handleChange = useCallback(
    (newValue) => {
      validateCategory(newValue);
      onChange(newValue);
    },
    [onChange, validateCategory],
  );

  useEffect(() => {
    if (value) {
      validateCategory(value);
    }
  }, [value, validateCategory]);

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
      type="text"
      value={value}
    />
  );
};

CategoryInputField.propTypes = {
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

CategoryInputField.defaultProps = {
  placeholder: "",
  disabled: false,
  required: false,
  maxLength: 50,
  minLength: 1,
  value: "",
};

export default CategoryInputField;
