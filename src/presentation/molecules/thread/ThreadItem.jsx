import React from 'react';
import PropTypes from 'prop-types';
import { H5 } from '../../atoms/text/Heading.jsx';
import { SmallText } from '../../atoms/text/Text.jsx';
import styles from './ThreadItem.module.css';

function ThreadItem ({ thread }) {
  const { title, body, category, createdAt, ownerId, totalComments } = thread;

  // Basic date formatting
  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className={styles.threadItem}>
      <div className={styles.category}>#{category}</div>
      <H5 className={styles.title}>{title}</H5>
      <div className={styles.body} dangerouslySetInnerHTML={{ __html: body }}/>
      <div className={styles.meta}>
        <SmallText>Created by: {ownerId}</SmallText>
        <SmallText>On: {formattedDate}</SmallText>
        <SmallText>Comments: {totalComments}</SmallText>
      </div>
    </div>
  );
}

ThreadItem.propTypes = {
  thread: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    totalComments: PropTypes.number.isRequired,
  }).isRequired,
};

export default ThreadItem;