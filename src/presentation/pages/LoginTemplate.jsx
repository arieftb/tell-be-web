import React from "react";
import styles from "./LoginTemplate.module.css";
import LoginForm from "../organisms/form/LoginForm.jsx";
import PropTypes from "prop-types";

export default function LoginTemplate({ handleSubmit, status, error }) {
  return (
    <section className={styles["login-template"]}>
      <LoginForm
        onSubmit={handleSubmit}
        isSubmitting={status === "loading"}
        successMessage={status === "succeeded" ? "Login successful!" : ""}
        errorMessage={status === "failed" ? error : ""}
      />
    </section>
  );
}

LoginTemplate.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
};
