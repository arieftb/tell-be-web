import { SmallText } from '../../atomics/text/Text.jsx';
import PropTypes from 'prop-types';
import Input from '../../atomics/input/Input.jsx';
import { useState } from 'react';
import styles from './InputField.module.css';

const InputField = ({
  id,
  label,
  disabled = false,
  placeholder,
  onChange,
  error = false,
  errorMessage,
  required = false,
}) => {
  const [value, setValue] = useState('');

  const errorText = error ? errorMessage : '';

  const handleOnChange = (value) => {
    setValue(value);
    onChange(value);
  };

  return (
    <div className={`${styles.inputField}`}>
      <SmallText className={`${styles.label}`}>{label}</SmallText>
      <Input
        id={id}
        name={id}
        placeholder={placeholder}
        value={value}
        onChange={
          value => handleOnChange(value)
        }
        disabled={disabled}
        error={error}
        required={required}/>
      {
        (errorText && (
          <SmallText className={`${styles.error}`}>{errorText}</SmallText>
        ))
      }
    </div>
  );
};

InputField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  required: PropTypes.bool,
};

export default InputField;