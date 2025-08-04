import { SmallText } from '../../atomics/text/Text.jsx';
import PropTypes from 'prop-types';
import Input from '../../atomics/input/Input.jsx';
import styles from './InputField.module.css';

const InputField = ({
  id,
  label,
  disabled = false,
  placeholder,
  onChange,
  errorMessage,
  type = 'text',
  error = false,
  required = false,
  maxLength = 255,
  minLength = 0,
  value = '',
  inputMode,
}) => {
  const errorText = error ? errorMessage : '';

  const handleOnChange = (newValue) => {
    onChange(newValue);
  };

  return (
    <div className={styles.inputField}>
      <SmallText className={styles.label}>{label}</SmallText>
      <Input
        id={id}
        name={id}
        placeholder={placeholder}
        value={value}
        onChange={handleOnChange}
        disabled={disabled}
        error={error}
        required={required}
        maxLength={maxLength}
        minLength={minLength}
        type={type}
        inputMode={inputMode}
      />
      {errorText && (
        <SmallText className={styles.error}>{errorText}</SmallText>
      )}
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
  maxLength: PropTypes.number,
  minLength: PropTypes.number,
  type: PropTypes.string,
  value: PropTypes.string,
  inputMode: PropTypes.string,
};

InputField.defaultProps = {
  disabled: false,
  placeholder: '',
  error: false,
  errorMessage: '',
  required: false,
  maxLength: 255,
  minLength: 0,
  type: 'text',
  value: '',
  inputMode: undefined,
};

export default InputField;
