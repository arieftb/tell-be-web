import React from "react";
import PropTypes from "prop-types";
import CategoryItem from "../../molecules/category/CategoryItem.jsx";
import styles from "./CategorySection.module.css";
import { H4 } from "../../atoms/text/Heading.jsx";

const CategorySection = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  const handleCategoryClick = (category) => {
    if (selectedCategory === category) {
      onSelectCategory(null); // Unselect if already selected
    } else {
      onSelectCategory(category); // Select the new category
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.categoryList}>
        {categories.map((category) => (
          <CategoryItem
            key={category}
            category={category}
            onClick={handleCategoryClick} // Use the new handler
            isSelected={selectedCategory === category}
          />
        ))}
      </div>
    </div>
  );
};

CategorySection.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedCategory: PropTypes.string,
  onSelectCategory: PropTypes.func.isRequired,
};

CategorySection.defaultProps = {
  selectedCategory: null,
};

export default CategorySection;
