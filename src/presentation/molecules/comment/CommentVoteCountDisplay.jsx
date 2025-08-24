import React from 'react';
import PropTypes from 'prop-types';
import {FiThumbsUp, FiThumbsDown} from 'react-icons/fi';
import {PiThumbsUpFill} from 'react-icons/pi';
import {SmallText} from '../../atoms/text/Text.jsx';
import styles from './CommentVoteCountDisplay.module.css';

const CommentVoteCountDisplay = ({
  upVotesBy, downVotesBy, onUpVote, isUpVotedByCurrentUser,
}) => {
  const handleUpVote = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onUpVote) {
      onUpVote();
    }
  };

  return (
    <div className={styles.container}>
      <button className={styles.voteItem} onClick={handleUpVote}>
        {isUpVotedByCurrentUser ? <PiThumbsUpFill /> : <FiThumbsUp />}
        <SmallText>{upVotesBy.length}</SmallText>
      </button>
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
  onUpVote: PropTypes.func,
  isUpVotedByCurrentUser: PropTypes.bool,
};

export default CommentVoteCountDisplay;
