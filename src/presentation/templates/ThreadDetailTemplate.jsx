import React from "react";
import PropTypes from "prop-types";
import Header from "../organisms/header/Header.jsx";
import ThreadDetailSection from "../organisms/thread/ThreadDetailSection.jsx";
import CommentInputSection from "../organisms/comment/CommentInputSection.jsx";
import CommentSection from "../organisms/comment/CommentSection.jsx";
import styles from "./ThreadDetailTemplate.module.css";

function ThreadDetailTemplate({ thread, status, error }) {
  return (
    <div className={styles.threadDetailTemplate}>
      <Header />
      <main className={styles.mainContent}>
        <ThreadDetailSection thread={thread} status={status} error={error} />
        {status === "succeeded" && <CommentInputSection />}
        {thread && thread.comments && (
          <CommentSection comments={thread.comments} threadId={thread.id} />
        )}
      </main>
    </div>
  );
}

ThreadDetailTemplate.propTypes = {
  thread: PropTypes.shape({
    id: PropTypes.string.isRequired,
    comments: PropTypes.array,
  }),
  status: PropTypes.string.isRequired,
  error: PropTypes.string,
};

export default ThreadDetailTemplate;
