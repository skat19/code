import React from "react";
import { NavLink } from "react-router-dom";
import s from "./Header.module.css";

const Header = (props) => {
  return (
    <header className={s.header}>
      <img
        src="https://free-png.ru/wp-content/uploads/2020/04/VK-chb_t.png"
        alt=""
      />
      <span className={s.hedInfo}>
        {props.isLogin ? (
          <span>
            {props.login} - <button onClick={props.logout}>logout</button>
          </span>
        ) : (
          <NavLink to="/login">login</NavLink>
        )}
      </span>
    </header>
  );
};

export default Header;
