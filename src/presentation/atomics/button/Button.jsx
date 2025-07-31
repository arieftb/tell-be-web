import React from 'react';
import PropTypes from 'prop-types';

function Button (
  {
    type = 'button',
    onClick,
    disabled = false,
    children,
    variant = 'primary'
  }
) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`button button-${variant}`}
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger'])
};

export default Button;