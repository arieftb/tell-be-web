import React from 'react';
import PropTypes from 'prop-types';
import styles from './Avatar.module.css';

function Avatar ({ src, alt, size = 'medium' }) {
  return (
    <img
      src={src}
      alt={alt}
      className={`${styles.avatar} ${styles[size]}`}
    />
  );
}

Avatar.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

export default Avatar;
