import React from 'react';
import styles from './RegisterTemplate.module.css';

export default function RegisterTemplate ({ children }) {
  return (
    <div className={styles['register-template']}>
      {children}
    </div>
  );
}
