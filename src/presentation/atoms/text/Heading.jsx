import styles from "./Heading.module.css";
import PropTypes from "prop-types";

const H1 = ({ children }) => <h1 className={styles.h1}>{children}</h1>;

H1.propTypes = {
  children: PropTypes.node.isRequired,
};

const H2 = ({ children }) => <h2 className={styles.h2}>{children}</h2>;

H2.propTypes = {
  children: PropTypes.node.isRequired,
};

const H3 = ({ children }) => <h3 className={styles.h3}>{children}</h3>;

H3.propTypes = {
  children: PropTypes.node.isRequired,
};

const H4 = ({ children, className }) => (
  <h4 className={`${styles.h4} ${className || ""}`}>{children}</h4>
);

H4.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

const H5 = ({ children, className }) => (
  <h5 className={`${styles.h5} ${className || ""}`}>{children}</h5>
);

H5.propTypes = {
  children: PropTypes.node.isRequired,
};

const H6 = ({ children, className }) => (
  <h6 className={`${styles.h6} ${className || ""}`}>{children}</h6>
);

H6.propTypes = {
  children: PropTypes.node.isRequired,
};

export { H1, H2, H3, H4, H5, H6 };
