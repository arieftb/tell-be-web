import React from "react";
import PropTypes from "prop-types";
import { H1 } from "../atoms/text/Heading.jsx";
import ThreadInputSection from "../organisms/thread/ThreadInputSection.jsx";
import styles from "./ThreadSubmitTemplate.module.css";
import LoadingBar from "../atoms/loadingbar/LoadingBar.jsx";
import Header from "../organisms/header/Header.jsx";

const ThreadSubmitTemplate = ({ onSubmit, isLoading }) => {
  return (
    <>
      <Header />
      <div className={styles.container}>
        {isLoading && <LoadingBar />}
        <H1>Create New Thread</H1>
        <ThreadInputSection onSubmit={onSubmit} isLoading={isLoading} />
      </div>
    </>
  );
};

ThreadSubmitTemplate.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default ThreadSubmitTemplate;
