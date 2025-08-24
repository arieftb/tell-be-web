import React from 'react';
import PropTypes from 'prop-types';
import {FiThumbsUp, FiThumbsDown} from 'react-icons/fi';
import {SmallText} from '../../atoms/text/Text.jsx';
import styles from './VoteCount.module.css';

const VoteCount = ({upVotes, downVotes, onUpVote, onDownVote}) => {
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
        <FiThumbsUp />
        <SmallText>{upVotes}</SmallText>
      </button>
      <button className={styles.voteItem} onClick={handleDownVote}>
        <FiThumbsDown />
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
};

export default VoteCount;
