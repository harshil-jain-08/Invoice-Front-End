import React from "react";
import {
  People,
  Box2,
  FileEarmarkText,
  PeopleFill,
  FileEarmarkTextFill,
  Box2Fill,
  HouseFill,
  House,
} from "react-bootstrap-icons";
import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="nav-bar">
      <ul className="nav-list">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-list-item-active" : "nav-list-item"
            }
            style={{ textDecoration: "none", padding: "0px", margin: "0px" }}
          >
            <span>
              <HouseFill />
              <House />
              Home
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/customer"
            className={({ isActive }) =>
              isActive ? "nav-list-item-active" : "nav-list-item"
            }
            style={{ textDecoration: "none", padding: "0px", margin: "0px" }}
          >
            <span>
              <PeopleFill />
              <People />
              Customer
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/items"
            className={({ isActive }) =>
              isActive ? "nav-list-item-active" : "nav-list-item"
            }
            style={{ textDecoration: "none", padding: "0px", margin: "0px" }}
          >
            <span>
              <Box2Fill />
              <Box2 />
              Items
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/invoice"
            className={({ isActive }) =>
              isActive ? "nav-list-item-active" : "nav-list-item"
            }
            style={{ textDecoration: "none", padding: "0px", margin: "0px" }}
          >
            <span>
              <FileEarmarkTextFill />
              <FileEarmarkText />
              Invoices
            </span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
