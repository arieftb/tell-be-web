import React from 'react';
import PropTypes from 'prop-types';
import CommentItem from './CommentItem.jsx';
import styles from './CommentList.module.css';

function CommentList ({ comments }) {
  if (!comments || comments.length === 0) {
    return <div className={styles.noComments}>No comments yet.</div>;
  }

  return (
    <div className={styles.commentList}>
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment}/>
      ))}
    </div>
  );
}

CommentList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    owner: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
    }).isRequired,
    upVotesBy: PropTypes.array.isRequired,
    downVotesBy: PropTypes.array.isRequired,
  })).isRequired,
};

export default CommentList;