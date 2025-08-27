import InputField from "./InputField.jsx";
import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,6}$/;

const EmailInputField = ({
  id,
  label = "Email",
  placeholder = "example@domain.com",
  onChange,
  disabled = false,
  required = false,
  maxLength = 255,
  value = "",
}) => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const validateEmail = useCallback(
    (email) => {
      const valueToValidate = email || "";

      if (required && !valueToValidate.trim()) {
        setError(true);
        setErrorMessage(`${label} is required`);
        return false;
      }

      if (valueToValidate.length > 0 && !EMAIL_REGEX.test(valueToValidate)) {
        setError(true);
        setErrorMessage("Please enter a valid email address");
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
    [label, required, maxLength],
  );

  const handleChange = useCallback(
    (newValue) => {
      validateEmail(newValue);
      onChange(newValue);
    },
    [onChange, validateEmail],
  );

  useEffect(() => {
    if (value) {
      validateEmail(value);
    }
  }, [value, validateEmail]);

  return (
    <InputField
      id={id}
      label={label}
      placeholder={placeholder}
      disabled={disabled}
      required={required}
      maxLength={maxLength}
      type="email"
      error={error}
      errorMessage={errorMessage}
      onChange={handleChange}
      value={value}
      inputMode="email"
    />
  );
};

EmailInputField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  maxLength: PropTypes.number,
  value: PropTypes.string,
};

EmailInputField.defaultProps = {
  label: "Email",
  placeholder: "example@domain.com",
  disabled: false,
  required: false,
  maxLength: 255,
  value: "",
};

export default EmailInputField;
