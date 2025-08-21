import React from 'react';
import PropTypes from 'prop-types';
import {SmallText} from '../../atoms/text/Text.jsx';
import styles from './VoteCount.module.css';

const VoteCount = ({upVotes, downVotes}) => {
  return (
    <div className={styles.container}>
      <div className={styles.voteItem}>
        <span role="img" aria-label="thumbs up">👍</span>
        <SmallText>{upVotes}</SmallText>
      </div>
      <div className={styles.voteItem}>
        <span role="img" aria-label="thumbs down">👎</span>
        <SmallText>{downVotes}</SmallText>
      </div>
    </div>
  );
};

VoteCount.propTypes = {
  upVotes: PropTypes.number.isRequired,
  downVotes: PropTypes.number.isRequired,
};

export default VoteCount;
