import React from 'react';
import PropTypes from 'prop-types';
import {FiThumbsUp, FiThumbsDown} from 'react-icons/fi';
import {PiThumbsUpFill, PiThumbsDownFill} from 'react-icons/pi';
import {SmallText} from '../../atoms/text/Text.jsx';
import styles from './VoteCount.module.css';

const VoteCount = ({
  upVotes, downVotes, onUpVote, onDownVote,
  isUpVotedByCurrentUser, isDownVotedByCurrentUser,
}) => {
  const handleUpVote = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onUpVote) {
      onUpVote();
    }
  };

  const handleDownVote = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onDownVote) {
      onDownVote();
    }
  };

  return (
    <div className={styles.container}>
      <button className={styles.voteItem} onClick={handleUpVote}>
        {isUpVotedByCurrentUser ? <PiThumbsUpFill /> : <FiThumbsUp />}
        <SmallText>{upVotes}</SmallText>
      </button>
      <button className={styles.voteItem} onClick={handleDownVote}>
        {isDownVotedByCurrentUser ? <PiThumbsDownFill /> : <FiThumbsDown />}
        <SmallText>{downVotes}</SmallText>
      </button>
    </div>
  );
};

VoteCount.propTypes = {
  upVotes: PropTypes.number.isRequired,
  downVotes: PropTypes.number.isRequired,
  onUpVote: PropTypes.func,
  onDownVote: PropTypes.func,
  isUpVotedByCurrentUser: PropTypes.bool,
  isDownVotedByCurrentUser: PropTypes.bool,
};

export default VoteCount;
