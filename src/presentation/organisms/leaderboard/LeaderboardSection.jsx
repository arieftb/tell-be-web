import React from "react";
import PropTypes from "prop-types";
import { H4 } from "../../atoms/text/Heading.jsx";
import UserScoreCard from "../../molecules/leaderboard/UserScoreCard.jsx";
import styles from "./LeaderboardSection.module.css";

const LeaderboardSection = ({ leaderboards }) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <H4>User</H4>
        <H4>Score</H4>
      </div>
      <div className={styles.list}>
        {leaderboards.map((leaderboard) => (
          <UserScoreCard
            key={leaderboard.user.id}
            user={leaderboard.user}
            score={leaderboard.score}
          />
        ))}
      </div>
    </div>
  );
};

LeaderboardSection.propTypes = {
  leaderboards: PropTypes.arrayOf(
    PropTypes.shape({
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
      }).isRequired,
      score: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default LeaderboardSection;
