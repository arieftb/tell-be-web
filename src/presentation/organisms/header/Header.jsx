import React from 'react';
import { H1 } from '../../atoms/text/Heading.jsx';
import Navigation from '../../molecules/navigation/Navigation.jsx';
import styles from './Header.module.css';

function Header () {
  return (
    <header className={styles.header}>
      <H1 className={styles.logo}>Tell Be</H1>
      <Navigation/>
    </header>
  );
}

export default Header;
