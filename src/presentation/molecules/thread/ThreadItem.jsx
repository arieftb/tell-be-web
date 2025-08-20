import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { H5 } from '../../atoms/text/Heading.jsx';
import { SmallText } from '../../atoms/text/Text.jsx';
import Avatar from '../../atoms/avatar/Avatar.jsx';
import styles from './ThreadItem.module.css';

function ThreadItem ({ thread }) {
  const {
    id, title, body, category, createdAt, ownerName,
    ownerAvatar, totalComments,
  } = thread;

  // Basic date formatting
  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Link to={`/threads/${id}`} className={styles.threadItemLink}>
      <div className={styles.threadItem}>
        <div className={styles.category}>#{category}</div>
        <H5 className={styles.title}>{title}</H5>
        <div className={styles.body} dangerouslySetInnerHTML={{ __html: body }}/>
        <div className={styles.meta}>
          <div className={styles.ownerInfo}>
            <Avatar src={ownerAvatar} alt={ownerName} size="small"/>
            <SmallText>{ownerName}</SmallText>
          </div>
          <SmallText>On: {formattedDate}</SmallText>
          <SmallText>Comments: {totalComments}</SmallText>
        </div>
      </div>
    </Link>
  );
}

ThreadItem.propTypes = {
  thread: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    ownerId: PropTypes.string.isRequired,
    totalComments: PropTypes.number.isRequired,
    ownerName: PropTypes.string.isRequired,
    ownerAvatar: PropTypes.string.isRequired,
  }).isRequired,
};

export default ThreadItem;
