import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styles from './CommentForm.module.css';
import Button from '../../atoms/button/Button.jsx';
import { selectSubmitCommentStatus, submitComment, } from '../../redux/thread/threadSlice.js';
import { H5 } from '../../atoms/text/Heading.jsx';

const CommentForm = () => {
  const [content, setContent] = useState('');
  const dispatch = useDispatch();
  const { threadId } = useParams();
  const submitStatus = useSelector(selectSubmitCommentStatus);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim()) {
      dispatch(submitComment({ threadId, content }));
      setContent('');
    }
  };

  return (
    <form className={styles.commentForm} onSubmit={handleSubmit}>
      <H5 className={styles.commentFormTitle}>Give Comment</H5>
      <textarea
        className={styles.commentInput}
        placeholder="Add a comment..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        disabled={submitStatus === 'loading'}
      />
      <Button type="submit" disabled={submitStatus === 'loading'}>
        {submitStatus === 'loading' ? 'Submitting...' : 'Comment'}
      </Button>
    </form>
  );
};

export default CommentForm;
