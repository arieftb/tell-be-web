import React from 'react';
import PropTypes from 'prop-types';
import Header from '../organisms/header/Header.jsx';
import ThreadList from '../organisms/thread/ThreadList.jsx';
import styles from './HomeTemplate.module.css';

function HomeTemplate (
  { threads, status, error },
) {
  return (
    <div className={styles.homeTemplate}>
      <Header/>
      <main className={styles.mainContent}>
        <ThreadList threads={threads} status={status} error={error}/>
      </main>
    </div>
  );
}

HomeTemplate.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.object).isRequired,
  status: PropTypes.string.isRequired,
  error: PropTypes.string,
};

export default HomeTemplate;
