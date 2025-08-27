import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NavigationItem from "./NavigationItem.jsx";
import styles from "./Navigation.module.css";
import { logout, selectAuthToken } from "../../redux/auth/authSlice.js";

function Navigation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(selectAuthToken);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className={styles.navigation}>
      <ul>
        <NavigationItem to="/">Home</NavigationItem>
        <NavigationItem to="/leaderboards">Leaderboard</NavigationItem>
        {token ? (
          <NavigationItem to="/logout" onClick={handleLogout}>
            Logout
          </NavigationItem>
        ) : (
          <NavigationItem to="/login">Login</NavigationItem>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;
