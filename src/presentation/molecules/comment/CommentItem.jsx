import React from 'react';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import {SmallText} from '../../atoms/text/Text.jsx';
import Avatar from '../../atoms/avatar/Avatar.jsx';
import styles from './CommentItem.module.css';
import CommentVoteCountDisplay from './CommentVoteCountDisplay.jsx';
import {upVoteComment, downVoteComment, neutralVoteComment} from '../../redux/thread/threadSlice.js';

function CommentItem({comment, threadId}) {
  const {content, createdAt, owner, isUpVotedByCurrentUser, isDownVotedByCurrentUser} = comment;
  const dispatch = useDispatch();

  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const onUpVote = () => {
    if (isUpVotedByCurrentUser) {
      dispatch(neutralVoteComment({threadId, commentId: comment.id}));
    } else {
      dispatch(upVoteComment({threadId, commentId: comment.id}));
    }
  };

  const onDownVote = () => {
    if (isDownVotedByCurrentUser) {
      dispatch(neutralVoteComment({threadId, commentId: comment.id}));
    } else {
      dispatch(downVoteComment({threadId, commentId: comment.id}));
    }
  };

  return (
    <div className={styles.commentItem}>
      <div className={styles.commentHeader}>
        <div className={styles.ownerInfo}>
          <Avatar src={owner.avatar} alt={owner.name} size="small"/>
          <SmallText>{owner.name}</SmallText>
        </div>
        <SmallText>{formattedDate}</SmallText>
      </div>
      <div
        className={styles.commentContent}
        dangerouslySetInnerHTML={{__html: content}}
      />
      <CommentVoteCountDisplay
        upVotesBy={comment.upVotesBy}
        downVotesBy={comment.downVotesBy}
        onUpVote={onUpVote}
        onDownVote={onDownVote}
        isUpVotedByCurrentUser={isUpVotedByCurrentUser}
        isDownVotedByCurrentUser={isDownVotedByCurrentUser}
      />
    </div>
  );
}

CommentItem.propTypes = {
  comment: PropTypes.shape({
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
    isUpVotedByCurrentUser: PropTypes.bool.isRequired,
    isDownVotedByCurrentUser: PropTypes.bool.isRequired,
  }).isRequired,
  threadId: PropTypes.string.isRequired,
};

export default CommentItem;
