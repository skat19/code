import React from "react";
import { NavLink } from "react-router-dom";
import s from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={s.nav}>
      <div className="">
        <NavLink to="/profile" activeClassName={s.active}>
          profile
        </NavLink>
      </div>
      <div className="">
        <NavLink to="/dialogs" activeClassName={s.active}>
          messages
        </NavLink>
      </div>
      <div className="">
        <NavLink to="/users" activeClassName={s.active}>
          users
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
