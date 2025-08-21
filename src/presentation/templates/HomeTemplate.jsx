import React from 'react';
import PropTypes from 'prop-types';
import Header from '../organisms/header/Header.jsx';
import ThreadList from '../organisms/thread/ThreadList.jsx';
import styles from './HomeTemplate.module.css';
import { Link } from 'react-router-dom';

function HomeTemplate (
  { threads, status, error, isLoggedIn },
) {
  return (
    <div className={styles.homeTemplate}>
      <Header/>
      <main className={styles.mainContent}>
        <ThreadList threads={threads} status={status} error={error}/>
      </main>
      {isLoggedIn && (
        <Link to="/submit-thread" className={styles.floatingButton}>
          +
        </Link>
      )}
    </div>
  );
}

HomeTemplate.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.object).isRequired,
  status: PropTypes.string.isRequired,
  error: PropTypes.string,
  isLoggedIn: PropTypes.bool.isRequired,
};

export default HomeTemplate;
