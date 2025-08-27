import React from "react";
import PropTypes from "prop-types";
import ThreadDetail from "../../molecules/thread/ThreadDetail.jsx";
import LoadingBar from "../../atoms/loadingbar/LoadingBar.jsx";
import styles from "./ThreadDetailSection.module.css";

function ThreadDetailSection({ thread, status, error }) {
  if (status === "loading") {
    return <LoadingBar />;
  }

  if (status === "failed") {
    return <div className={styles.message}>Error: {error}</div>;
  }

  if (!thread) {
    return <div className={styles.message}>Thread not found.</div>;
  }

  return (
    <div className={styles.threadDetailSection}>
      <ThreadDetail thread={thread} />
    </div>
  );
}

ThreadDetailSection.propTypes = {
  thread: PropTypes.object,
  status: PropTypes.string.isRequired,
  error: PropTypes.string,
};

export default ThreadDetailSection;
