import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { configPath } from "../../config/configPath";

import logo from "../../assets/images/fpticon.png";
import avatar from "../../assets/avatar/avatar1.png";

import MenuIcon from "@mui/icons-material/Menu";
import LoginIcon from "@mui/icons-material/Login";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import "./header.scss";

const mainNav = [
    {
        path: `${configPath.home}`,
        display: "Home",
    },
    {
        path: `${configPath.reservation}`,
        display: "Room",
    },
    {
        path: `${configPath.schedule}`,
        display: "Schedule",
    },
    {
        path: `${configPath.history}`,
        display: "History",
    },
];

const Header = () => {
    const [isLogined, setIsLogined] = useState(false);

    // SHRINK HEADER
    const headerRef = useRef(null);
    const shrinkHeader = () => {
        if (
            document.body.scrollTop > 80 ||
            document.documentElement.scrollTop > 80
        ) {
            headerRef.current.classList.add("shrink");
        } else {
            headerRef.current.classList.remove("shrink");
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", shrinkHeader);

        return () => {
            window.removeEventListener("scroll", shrinkHeader);
        };
    }, []);

    // ACTIVE MENU
    const menuRef = useRef(null);
    const menuToggle = () => menuRef.current.classList.toggle("active");

    // ACTIVE PATH
    const { pathname } = useLocation();
    const activeNav = mainNav.findIndex((e) => e.path === pathname);

    // MENU MOBILE
    const menuMobileRef = useRef(null);
    const menuMobileToggle = () =>
        menuMobileRef.current.classList.toggle("active");

    return (
        <header className="header" ref={headerRef}>
            <nav className="header__container">
                <Link
                    to={`${configPath.home}`}
                    className="header__container__logo"
                >
                    <img src={logo} alt="logo" />
                </Link>

                <div
                    className="header__container__center__mobile"
                    onClick={menuMobileToggle}
                >
                    <MenuIcon />
                </div>
                <ul className="header__container__center" ref={menuMobileRef}>
                    <div
                        className="header__container__center__mobile__close"
                        onClick={menuMobileToggle}
                    >
                        <ChevronLeftIcon />
                    </div>
                    {mainNav.map((item, index) => (
                        <Link to={item.path} key={index}>
                            <li
                                className={`header__container__center__item ${
                                    index === activeNav ? "active" : ""
                                }`}
                                onClick={menuMobileToggle}
                            >
                                <p>{item.display}</p>
                            </li>
                        </Link>
                    ))}
                </ul>

                <div className="header__container__right">
                    {isLogined ? (
                        <div className="header__container__right__login">
                            <Link to={`${configPath.login}`}>Login</Link>
                            <LoginIcon />
                        </div>
                    ) : (
                        <div className="header__container__right__profile">
                            <div
                                className={`header__container__right__profile__user`}
                                onClick={menuToggle}
                            >
                                <img src={avatar} alt="avatar" />
                            </div>

                            <ul
                                className="header__container__right__profile__item"
                                ref={menuRef}
                                onClick={menuToggle}
                            >
                                <li>
                                    <Link to={`${configPath.profile}`}>
                                        Profile
                                    </Link>
                                </li>
                                <li>
                                    <Link to={`${configPath.changepassword}`}>
                                        Change password
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/logout">Logout</Link>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;
