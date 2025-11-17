import React from "react";
import PropTypes from "prop-types";
import { FiThumbsUp, FiThumbsDown } from "react-icons/fi";
import { PiThumbsUpFill, PiThumbsDownFill } from "react-icons/pi";
import { SmallText } from "../../atoms/text/Text.jsx";
import styles from "./CommentVoteCountDisplay.module.css";

const CommentVoteCountDisplay = ({
  upVotesBy,
  downVotesBy,
  onUpVote,
  isUpVotedByCurrentUser,
  onDownVote,
  isDownVotedByCurrentUser,
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
        <SmallText>{upVotesBy.length}</SmallText>
      </button>
      <button className={styles.voteItem} onClick={handleDownVote}>
        {isDownVotedByCurrentUser ? <PiThumbsDownFill /> : <FiThumbsDown />}
        <SmallText>{downVotesBy.length}</SmallText>
      </button>
    </div>
  );
};

CommentVoteCountDisplay.propTypes = {
  upVotesBy: PropTypes.array.isRequired,
  downVotesBy: PropTypes.array.isRequired,
  onUpVote: PropTypes.func,
  isUpVotedByCurrentUser: PropTypes.bool,
  onDownVote: PropTypes.func,
  isDownVotedByCurrentUser: PropTypes.bool,
};

export default CommentVoteCountDisplay;
