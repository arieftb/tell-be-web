import React from 'react';
import PropTypes from 'prop-types';

function InputField ({
  id,
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  required
}) {
  return (
    <input
      id={id}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="input-field"
    />
  );
}

InputField.defaultProps = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool
};

export default InputField;