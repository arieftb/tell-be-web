import React from 'react';
import PropTypes from 'prop-types';
import ThreadItem from '../../molecules/thread/ThreadItem.jsx';
import LoadingBar from '../../atoms/loadingbar/LoadingBar.jsx';
import styles from './ThreadList.module.css';

function ThreadList ({ threads, status, error }) {
  if (status === 'loading') {
    return <LoadingBar/>;
  }

  if (status === 'failed') {
    return <div className={styles.message}>Error: {error}</div>;
  }

  if (threads.length === 0) {
    return <div className={styles.message}>No threads available.</div>;
  }

  return (
    <div className={styles.threadList}>
      {threads.map((thread) => (
        <ThreadItem key={thread.id} thread={thread}/>
      ))}
    </div>
  );
}

ThreadList.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    ownerId: PropTypes.string.isRequired,
    totalComments: PropTypes.number.isRequired,
    upVotesBy: PropTypes.array.isRequired,
    downVotesBy: PropTypes.array.isRequired,
  })).isRequired,
  status: PropTypes.string.isRequired,
  error: PropTypes.string,
};

export default ThreadList;