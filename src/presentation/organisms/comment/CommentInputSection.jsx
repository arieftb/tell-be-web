import React, {useMemo} from 'react';
import styles from './CommentInputSection.module.css';
import IsLoggedInUseCase from '../../../application/auth/IsLoggedInUseCase.js';
import CommentForm from '../../molecules/comment/CommentForm.jsx';
import NonLoginInfo from '../../molecules/comment/NonLoginInfo.jsx';

const CommentInputSection = () => {
  const isLoggedInUseCase = useMemo(() => new IsLoggedInUseCase(), []);
  const isLoggedIn = isLoggedInUseCase.execute();

  return (
    <div className={styles.commentInputSection}>
      {isLoggedIn ? <CommentForm/> : <NonLoginInfo/>}
    </div>
  );
};

export default CommentInputSection;
