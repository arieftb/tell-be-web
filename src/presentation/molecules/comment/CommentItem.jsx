import React from 'react';
import PropTypes from 'prop-types';
import { SmallText } from '../../atoms/text/Text.jsx';
import Avatar from '../../atoms/avatar/Avatar.jsx';
import styles from './CommentItem.module.css';

function CommentItem ({ comment }) {
  const { content, createdAt, owner } = comment;

  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

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
        dangerouslySetInnerHTML={{ __html: content }}
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
  }).isRequired,
};

export default CommentItem;
