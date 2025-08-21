import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '../../atoms/avatar/Avatar.jsx';
import {ParagraphText, SmallText} from '../../atoms/text/Text.jsx';
import styles from './UserScoreCard.module.css';

const UserScoreCard = ({user, score}) => {
  return (
    <div className={styles.card}>
      <div className={styles.userInfo}>
        <Avatar src={user.avatar} alt={user.name} size="medium" />
        <ParagraphText className={styles.userName}>{user.name}</ParagraphText>
      </div>
      <SmallText className={styles.score}>{score}</SmallText>
    </div>
  );
};

UserScoreCard.propTypes = {
  user: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  score: PropTypes.number.isRequired,
};

export default UserScoreCard;
