import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GiSpaceShuttle } from "react-icons/gi";
import {
  IoMdPlanet,
  IoIosCamera,
  IoMdCalendar,
  IoIosInformationCircleOutline,
} from "react-icons/io";
import "./NavBar.scss";
import Hamburger from "./Hamburger";
import image from "../../../images/nasaLogo.png"

export const Navbar: React.FunctionComponent = () => {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  const toggleHamburger = () => {
    setHamburgerOpen(!hamburgerOpen);
  };

  return (
    <nav>
      <img className="logo" src={image}/>
      <div className="burger-button" onClick={toggleHamburger}>
        <Hamburger isOpen={hamburgerOpen} />
      </div>
      <ul className={hamburgerOpen ? "hamburger-open" : "hamburger-closed"} id="nav-desktop">
        <li className="nav-item">
          <Link className="navigation-button" to="/">
            <IoMdPlanet />
            <br></br>Home
          </Link>
        </li>
        <li className="nav-item">
          <Link className="navigation-button" to="/journey">
            <GiSpaceShuttle />
            <br />
            Journey
          </Link>
        </li>
        <li className="nav-item">
          <Link className="navigation-button" to="/mars-viewer">
            <IoIosCamera />
            <br />
            Mars Viewer
          </Link>
        </li>
        <li className="nav-item">
          <Link className="navigation-button" to="/birthday">
            <IoMdCalendar />
            <br />
            Birthday
          </Link>
        </li>
        <li className="nav-item">
          <Link className="navigation-button" to="/info">
            <IoIosInformationCircleOutline />
            <br />
            Information
          </Link>
        </li>
      </ul>
    </nav>
  );
};
