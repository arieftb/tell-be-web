import React from "react";
import { Link } from "react-router-dom";
import styles from "./NonLoginInfo.module.css";

const NonLoginInfo = () => {
  return (
    <div className={styles.nonLoginInfo}>
      Please <Link to="/login">log in</Link> to comment.
    </div>
  );
};

export default NonLoginInfo;
