import PropTypes from 'prop-types';
import styles from './Text.module.css';

const Text = ({ children, variant, className }) => {
  const variants = {
    large: styles.large,
    small: styles.small,
    paragraph: styles.paragraph,
    x_small: styles.xSmall
  };

  return (
    <p className={`${styles.text} ${variants[variant]} ${className}`}>{children}</p>
  );
};

Text.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.string,
  className: PropTypes.string,
};

const LargeText = ({ children }) => (
  Text({ children, variant: 'large' })
);

LargeText.propTypes = {
  children: PropTypes.node.isRequired,
};

const ParagraphText = ({ children }) => (
  Text({ children, variant: 'paragraph' })
);

ParagraphText.propTypes = {
  children: PropTypes.node.isRequired,
};

const SmallText = ({ children, className }) => (
  Text({ children, variant: 'small', className })
);

SmallText.propTypes = {
  children: PropTypes.node.isRequired,
};

const XSmallText = ({ children }) => (
  Text({ children, variant: 'x_small' })
);

XSmallText.propTypes = {
  children: PropTypes.node.isRequired,
};

export { LargeText, ParagraphText, SmallText, XSmallText };