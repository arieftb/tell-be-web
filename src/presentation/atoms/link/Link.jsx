import React from 'react';
import {Link as RouterLink, useLocation} from 'react-router-dom';
import styles from './Link.module.css';
import PropTypes from 'prop-types';

const Link = ({
  children,
  to,
  external = false,
  disabled = false,
  onClick,
  ...props
}) => {
  const location = useLocation();
  const isActive = !external && !disabled && location.pathname === to;

  const className = `
    ${styles.link}
    ${disabled ? styles.disabled : ''}
    ${external ? styles.external : ''}
  `;

  const handleClick = (e) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    onClick?.(e);
  };

  if (external) {
    return (
      <a
        href={disabled ? undefined : to}
        className={className}
        aria-disabled={disabled}
        onClick={handleClick}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <RouterLink
      to={disabled ? '#' : to}
      className={className}
      onClick={handleClick}
      aria-disabled={disabled}
      aria-current={isActive ? 'page' : undefined}
      {...props}
    >
      {children}
    </RouterLink>
  );
};

Link.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
  external: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Link;
