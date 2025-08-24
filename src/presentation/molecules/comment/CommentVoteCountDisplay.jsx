import React from 'react';
import PropTypes from 'prop-types';
import {FiThumbsUp, FiThumbsDown} from 'react-icons/fi';
import {SmallText} from '../../atoms/text/Text.jsx';
import styles from './CommentVoteCountDisplay.module.css';

const CommentVoteCountDisplay = ({
  upVotesBy, downVotesBy,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.voteItem}>
        <FiThumbsUp />
        <SmallText>{upVotesBy.length}</SmallText>
      </div>
      <div className={styles.voteItem}>
        <FiThumbsDown />
        <SmallText>{downVotesBy.length}</SmallText>
      </div>
    </div>
  );
};

CommentVoteCountDisplay.propTypes = {
  upVotesBy: PropTypes.array.isRequired,
  downVotesBy: PropTypes.array.isRequired,
};

export default CommentVoteCountDisplay;
