import React from 'react';
import styles from './LoadingBar.module.css';

function LoadingBar() {
  return (
    <div className={styles.loadingBarContainer}>
      <div className={styles.loadingBar}/>
    </div>
  );
}

export default LoadingBar;
