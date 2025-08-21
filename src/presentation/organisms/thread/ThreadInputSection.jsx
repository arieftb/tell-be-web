import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TitleInputField from '../../molecules/input/TitleInputField.jsx';
import CategoryInputField from '../../molecules/input/CategoryInputField.jsx';
import BodyInputField from '../../molecules/input/BodyInputField.jsx';
import Button from '../../atoms/button/Button.jsx';
import styles from './ThreadInputSection.module.css';

const ThreadInputSection = ({ onSubmit, isLoading }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, category, body });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <TitleInputField
        id="title"
        value={title}
        onChange={setTitle}
        disabled={isLoading}
        required
      />
      <CategoryInputField
        id="category"
        value={category}
        onChange={setCategory}
        disabled={isLoading}
        required
      />
      <BodyInputField
        id="body"
        value={body}
        onChange={setBody}
        disabled={isLoading}
        required
      />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Creating...' : 'Create'}
      </Button>
    </form>
  );
};

ThreadInputSection.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default ThreadInputSection;
