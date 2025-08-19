import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function NavigationItem ({ to, children }) {
  return (
    <li>
      <Link to={to}>
        {children}
      </Link>
    </li>
  );
}

NavigationItem.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default NavigationItem;