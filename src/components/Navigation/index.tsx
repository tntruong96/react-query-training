import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <div>
      <NavLink to={"/user"}>User</NavLink>
      <NavLink to={"/product"}>Product</NavLink>
    </div>
  );
};

export default Navigation;
