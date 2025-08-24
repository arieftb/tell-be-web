import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {H5} from '../../atoms/text/Heading.jsx';
import {SmallText} from '../../atoms/text/Text.jsx';
import Avatar from '../../atoms/avatar/Avatar.jsx';
import VoteCount from '../vote/VoteCount.jsx';
import styles from './ThreadItem.module.css';
import {downVoteThread, upVoteThread, neutralVoteThread} from '../../redux/thread/threadSlice.js';

function ThreadItem({thread}) {
  const {
    id, title, body, category, createdAt, ownerName,
    ownerAvatar, totalComments, upVotesBy, downVotesBy,
    isUpVotedByCurrentUser, isDownVotedByCurrentUser,
  } = thread;
  const dispatch = useDispatch();

  const handleUpVote = () => {
    if (isUpVotedByCurrentUser) {
      dispatch(neutralVoteThread(id));
    } else {
      dispatch(upVoteThread(id));
    }
  };

  const handleDownVote = () => {
    if (isDownVotedByCurrentUser) {
      dispatch(neutralVoteThread(id));
    } else {
      dispatch(downVoteThread(id));
    }
  };

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
        <div className={styles.body} dangerouslySetInnerHTML={{__html: body}}/>
        <div className={styles.meta}>
          <div className={styles.ownerInfo}>
            <Avatar src={ownerAvatar} alt={ownerName} size="small"/>
            <SmallText>{ownerName}</SmallText>
          </div>
          <SmallText>On: {formattedDate}</SmallText>
          <SmallText>Comments: {totalComments}</SmallText>
          <VoteCount
            upVotes={upVotesBy.length}
            downVotes={downVotesBy.length}
            onUpVote={handleUpVote}
            onDownVote={handleDownVote}
            isUpVotedByCurrentUser={isUpVotedByCurrentUser}
            isDownVotedByCurrentUser={isDownVotedByCurrentUser}
          />
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
    upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    isUpVotedByCurrentUser: PropTypes.bool,
    isDownVotedByCurrentUser: PropTypes.bool,
  }).isRequired,
};

export default ThreadItem;
