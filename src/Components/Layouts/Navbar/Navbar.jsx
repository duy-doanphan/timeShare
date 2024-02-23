import React, { useContext, useState } from "react";
import "./navbar.css";
import { MdApartment } from "react-icons/md";
import { FaWindowClose } from "react-icons/fa";
import { TbGridDots } from "react-icons/tb";
import { Link } from "react-router-dom";
import Avatar from "../../../Assets/avatar.png";
import { GlobalContext } from "../../../provide";

const Navbar = () => {
  const [active, setActive] = useState("navBar");
  const loginContext = useContext(GlobalContext);
  const { isLogin, setIsLogin, userInformation, setUserInformation } =
    loginContext;

  const handleLogout = () => {
    setIsLogin(false);
    setUserInformation({});
  };
  const showNav = () => {
    setActive("navBar activeNavbar");
  };

  const removeNavbar = () => {
    setActive("navBar");
  };

  return (
    <section className="navBarSection">
      <header className="navbarHeader flex">
        <div className="logoDiv">
          <Link to="/" className="navbarLogo flex">
            <h1>
              <MdApartment className="icon" />
              Timeshare
            </h1>
          </Link>
        </div>

        <div className={active}>
          <ul className="navbarLists flex">
            <li className="navbarItem">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="navbarItem">
              <Link to="/ViewHomestay" className="nav-link">
                View Timeshare Project
              </Link>
            </li>
            <li className="navbarItem">
              <Link to="/Post" className="nav-link">
                Post Your Timeshare
              </Link>
            </li>
            <li className="navbarItem">
              <Link to="/view-profile" className="nav-link">
                View Profile
              </Link>
            </li>
            <li className="navbarItem">
              <Link to="/Works" className="nav-link">
                How it works
              </Link>
            </li>
            <button className="btn">
              <Link to="/" className="nav-link">
                BOOK NOW
              </Link>
            </button>
            {!isLogin ? (
              <li className="navbarItem loginItem">
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </li>
            ) : (
              <li
                className="btn"
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={handleLogout}
              >
                <img
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                  }}
                  alt="avatar"
                  src={Avatar}
                />
                &nbsp;
                <p style={{ color: "#972417" }}> {userInformation?.Name}</p>
              </li>
            )}
          </ul>

          <div
            onClick={removeNavbar}
            className="closeNavbar actionNavbarbutton"
          >
            <FaWindowClose className="icon" />
          </div>
          <div onClick={showNav} className="toggleNavbar actionNavbarbutton">
            <TbGridDots className="icon" />
          </div>
        </div>
      </header>
    </section>
  );
};

export default Navbar;
