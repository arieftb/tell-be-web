import { H4 } from "../../atoms/text/Heading.jsx";
import styles from "./LoginForm.module.css";
import EmailInputField from "../../molecules/input/EmailInputField.jsx";
import PasswordInputField from "../../molecules/input/PasswordInputField.jsx";
import Button from "../../atoms/button/Button.jsx";
import { useState } from "react";
import { SmallText } from "../../atoms/text/Text.jsx";

const LoginForm = ({
  onSubmit,
  isSubmitting,
  successMessage,
  errorMessage,
}) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({
    email: false,
    password: false,
  });

  const handleInputChange = (field) => (value) => {
    // Clear error for this field
    if (formErrors[field]) {
      setFormErrors((prev) => ({
        ...prev,
        [field]: false,
      }));
    }

    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...formErrors };

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = true;
      valid = false;
    } else {
      const emailRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,6}$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = true;
        valid = false;
      }
    }

    // Validate password
    if (!formData.password.trim()) {
      newErrors.password = true;
      valid = false;
    }

    setFormErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <section className={styles.loginForm}>
      <H4 className={styles.title}>Login</H4>
      <form className={styles.form} onSubmit={handleSubmit}>
        {successMessage && (
          <div className={styles.successMessage}>{successMessage}</div>
        )}
        {errorMessage && (
          <div className={styles.errorMessage}>{errorMessage}</div>
        )}
        <section className={styles.form}>
          <EmailInputField
            id="email"
            label="Email"
            placeholder="Email"
            onChange={handleInputChange("email")}
            value={formData.email}
            required
          />
          <PasswordInputField
            id="password"
            label="Password"
            placeholder="Password"
            onChange={handleInputChange("password")}
            value={formData.password}
            required
          />
          <Button
            variant="primary"
            size="large"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </section>
      </form>

      <section className={styles.register}>
        <SmallText>
          Don't have an account? <a href="/register">Register</a>
        </SmallText>
      </section>
    </section>
  );
};

export default LoginForm;
