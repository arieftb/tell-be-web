import React from 'react';
import NavigationItem from './NavigationItem.jsx';
import styles from './Navigation.module.css';

function Navigation () {
  return (
    <nav className={styles.navigation}>
      <ul>
        <NavigationItem to="/">Home</NavigationItem>
        <NavigationItem to="/leaderboard">Leaderboard</NavigationItem>
        <NavigationItem to="/logout">Logout</NavigationItem>
      </ul>
    </nav>
  );
}

export default Navigation;