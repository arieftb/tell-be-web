import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchLeaderboards,
  selectAllLeaderboards,
  selectLeaderboardsError,
  selectLeaderboardsStatus,
} from '../redux/leaderboard/leaderboardSlice.js';
import LeaderboardTemplate from '../templates/LeaderboardTemplate.jsx';

const LeaderboardPage = () => {
  const dispatch = useDispatch();
  const leaderboards = useSelector(selectAllLeaderboards);
  const status = useSelector(selectLeaderboardsStatus);
  const error = useSelector(selectLeaderboardsError);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchLeaderboards());
    }
  }, [status, dispatch]);

  return (
    <LeaderboardTemplate
      leaderboards={leaderboards}
      status={status}
      error={error}
    />
  );
};

export default LeaderboardPage;
