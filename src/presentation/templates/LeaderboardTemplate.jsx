import React from 'react';
import PropTypes from 'prop-types';
import {H1} from '../atoms/text/Heading.jsx';
import LeaderboardSection from
  '../organisms/leaderboard/LeaderboardSection.jsx';
import styles from './LeaderboardTemplate.module.css';
import LoadingBar from '../atoms/loadingbar/LoadingBar.jsx';
import Header from '../organisms/header/Header.jsx';

const LeaderboardTemplate = ({leaderboards, status, error}) => {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <H1>Leaderboard</H1>
        {status === 'loading' && <LoadingBar />}
        {status === 'failed' && <p>Error: {error}</p>}
        {status === 'succeeded' && leaderboards.length > 0 && (
          <LeaderboardSection leaderboards={leaderboards} />
        )}
        {status === 'succeeded' && leaderboards.length === 0 && (
          <p>No leaderboards found.</p>
        )}
      </div>
    </>
  );
};

LeaderboardTemplate.propTypes = {
  leaderboards: PropTypes.array.isRequired,
  status: PropTypes.string.isRequired,
  error: PropTypes.string,
};

export default LeaderboardTemplate;
