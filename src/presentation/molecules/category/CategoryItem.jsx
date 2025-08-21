import React from 'react';
import PropTypes from 'prop-types';
import styles from './CategoryItem.module.css';
import {SmallText} from '../../atoms/text/Text.jsx';

const CategoryItem = ({category, onClick, isSelected}) => {
  return (
    <button
      className={`${styles.categoryItem} ${isSelected ? styles.selected : ''}`}
      onClick={() => onClick(category)}
    >
      <SmallText>#{category}</SmallText>
    </button>
  );
};

CategoryItem.propTypes = {
  category: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
};

export default CategoryItem;
