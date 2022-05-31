import React from "react";

import "./menu.scss";

function Menu({ menuOpen }) {
  return (
  <div className={`menu-container ${menuOpen ? "menuOpen" : "" }`}>
    <div>Menu</div>
    <div>Menu</div>
    <div>Menu</div>
    <div>Menu</div>
    <div>Menu</div>
    <div>Menu</div>
    <div>Menu</div>
    <div>Menu</div>
    <div>Menu</div>
  </div>
  );
}

export default Menu;
