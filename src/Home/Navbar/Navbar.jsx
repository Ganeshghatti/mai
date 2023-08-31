import React from "react";
import "./Navbar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  return (
    <nav>
      <img
        src="https://png.pngtree.com/templates/sm/20180611/sm_5b1edb6d03c39.jpg"
        alt="logo"
        className="navbar-logo"
      />
      {window.innerWidth > 700 ? (
        <ul>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#app">Explore</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#team">Team</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      ) : (
        <FontAwesomeIcon
          icon={faBars}
          style={{
            fontSize: "25px",
            color: "white",
            cursor:"pointer"
          }}
        />
      )}
    </nav>
  );
}
