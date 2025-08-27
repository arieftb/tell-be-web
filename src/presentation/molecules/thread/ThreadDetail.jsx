import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { H3 } from "../../atoms/text/Heading.jsx";
import { SmallText } from "../../atoms/text/Text.jsx";
import Avatar from "../../atoms/avatar/Avatar.jsx";
import VoteCount from "../vote/VoteCount.jsx";
import styles from "./ThreadDetail.module.css";
import { upVoteThread } from "../../redux/thread/threadSlice.js";

function ThreadDetail({ thread }) {
  const {
    id,
    title,
    body,
    category,
    createdAt,
    owner,
    upVotesBy,
    downVotesBy,
  } = thread;
  const dispatch = useDispatch();

  const handleUpVote = () => {
    dispatch(upVoteThread(id));
  };

  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className={styles.threadDetail}>
      <div className={styles.category}>#{category}</div>
      <H3 className={styles.title}>{title}</H3>
      <div className={styles.body} dangerouslySetInnerHTML={{ __html: body }} />
      <div className={styles.meta}>
        <div className={styles.ownerInfo}>
          <Avatar src={owner.avatar} alt={owner.name} size="medium" />
          <SmallText>{owner.name}</SmallText>
        </div>
        <SmallText>On: {formattedDate}</SmallText>
        <VoteCount
          upVotes={upVotesBy.length}
          downVotes={downVotesBy.length}
          onUpVote={handleUpVote}
        />
      </div>
    </div>
  );
}

ThreadDetail.propTypes = {
  thread: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    owner: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
    }).isRequired,
    upVotesBy: PropTypes.array.isRequired,
    downVotesBy: PropTypes.array.isRequired,
    comments: PropTypes.array.isRequired,
  }).isRequired,
};

export default ThreadDetail;
