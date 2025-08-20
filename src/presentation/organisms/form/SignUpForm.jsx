import { H4 } from '../../atoms/text/Heading.jsx';
import styles from './SignUpForm.module.css';
import TextInputField from '../../molecules/input/TextInputField.jsx';
import EmailInputField from '../../molecules/input/EmailInputField.jsx';
import PasswordInputField from '../../molecules/input/PasswordInputField.jsx';
import Button from '../../atoms/button/Button.jsx';
import { useState } from 'react';
import { SmallText } from '../../atoms/text/Text.jsx';

const SignUpForm = ({ onSubmit, isSubmitting, successMessage, errorMessage }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState({
    name: false,
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

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = true;
      valid = false;
    }

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = true;
      valid = false;
    } else {
      // eslint-disable-next-line max-len
      const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,6}$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = true;
        valid = false;
      }
    }

    // Validate password
    if (!formData.password.trim()) {
      newErrors.password = true;
      valid = false;
    } else if (formData.password.length < 6) {
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
    <section className={styles.signUpForm}>
      <H4 className={styles.title}>Sign Up</H4>
      <form className={styles.form} onSubmit={handleSubmit}>
        {successMessage && (
          <div className={styles.successMessage}>
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className={styles.errorMessage}>
            {errorMessage}
          </div>
        )}
        <section className={styles.form}>
          <TextInputField
            id="name"
            label="Name"
            placeholder="Name"
            onChange={handleInputChange('name')}
            value={formData.name}
            required
          />
          <EmailInputField
            id="email"
            label="Email"
            placeholder="Email"
            onChange={handleInputChange('email')}
            value={formData.email}
            required
          />
          <PasswordInputField
            id="password"
            label="Password"
            placeholder="Password"
            onChange={handleInputChange('password')}
            value={formData.password}
            validateStrength
            required
          />
          <Button
            variant="primary"
            size="large"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Registering...' : 'Register'}
          </Button>
        </section>
      </form>

      <section className={styles.login}>
        <SmallText>
          Already have an account? <a href="/login">Register</a>
        </SmallText>
      </section>
    </section>
  );
};

export default SignUpForm;
