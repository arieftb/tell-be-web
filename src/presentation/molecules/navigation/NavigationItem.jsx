import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function NavigationItem ({ to, children, onClick }) {
  return (
    <li>
      <Link to={to} onClick={onClick}>
        {children}
      </Link>
    </li>
  );
}

NavigationItem.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

export default NavigationItem;