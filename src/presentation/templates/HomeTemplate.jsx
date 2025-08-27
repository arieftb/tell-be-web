import React from "react";
import PropTypes from "prop-types";
import Header from "../organisms/header/Header.jsx";
import ThreadList from "../organisms/thread/ThreadList.jsx";
import CategorySection from "../organisms/category/CategorySection.jsx";
import styles from "./HomeTemplate.module.css";
import { Link } from "react-router-dom";

function HomeTemplate({
  threads,
  status,
  error,
  isLoggedIn,
  categories,
  selectedCategory,
  onSelectCategory,
}) {
  return (
    <div className={styles.homeTemplate}>
      <Header />
      <main className={styles.mainContent}>
        <CategorySection
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={onSelectCategory}
        />
        <ThreadList threads={threads} status={status} error={error} />
      </main>
      {isLoggedIn && (
        <Link to="/submit-thread" className={styles.floatingButton}>
          +
        </Link>
      )}
    </div>
  );
}

HomeTemplate.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.object).isRequired,
  status: PropTypes.string.isRequired,
  error: PropTypes.string,
  isLoggedIn: PropTypes.bool.isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedCategory: PropTypes.string,
  onSelectCategory: PropTypes.func.isRequired,
};

HomeTemplate.defaultProps = {
  selectedCategory: null,
};

export default HomeTemplate;
