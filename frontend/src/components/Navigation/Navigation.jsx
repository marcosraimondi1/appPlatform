import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Navigation() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      {/* <!-- Navigation--> */}
      <a className="menu-toggle rounded" onClick={() => setOpen((prev) => !prev)} href="#">
        {open ? <FontAwesomeIcon icon="times" /> : <FontAwesomeIcon icon="bars" />}
      </a>
      <nav id="sidebar-wrapper">
        <ul className="sidebar-nav">
          <li className="sidebar-brand">
            <a href="#page-top">Marcos Raimondi</a>
          </li>
          <li className="sidebar-nav-item">
            <a href="#page-top">Home</a>
          </li>
          <li className="sidebar-nav-item">
            <a href="#about">About</a>
          </li>
          <li className="sidebar-nav-item">
            <a href="#services">Services</a>
          </li>
          <li className="sidebar-nav-item">
            <a href="#curriculum">Curriculum Vitae</a>
          </li>
          <li className="sidebar-nav-item">
            <a href="#portfolio">Portfolio</a>
          </li>
          <li className="sidebar-nav-item">
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
