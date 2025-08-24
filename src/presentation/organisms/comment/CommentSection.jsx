import React from 'react';
import PropTypes from 'prop-types';
import {H6} from '../../atoms/text/Heading.jsx';
import CommentList from '../../molecules/comment/CommentList.jsx';
import styles from './CommentSection.module.css';

function CommentSection({comments, threadId}) {
  return (
    <section className={styles.commentSection}>
      <H6 className={styles.commentCount}>Comments ({comments.length})</H6>
      <CommentList comments={comments} threadId={threadId}/>
    </section>
  );
}

CommentSection.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
  threadId: PropTypes.string.isRequired,
};

export default CommentSection;
