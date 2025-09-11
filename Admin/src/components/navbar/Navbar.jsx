import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.scss";

const Navbar = () => {
    const [active, setActive] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {       
        const token = localStorage.getItem("token");
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const handleClick = () => {
        setActive(!active);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");  
        setIsAuthenticated(false);         
        setActive(false);                  
        navigate("/login");                
    };

    return (
        <div className="navbar">
            <div className="navbarContainer">
                <div className="items">
                    <div className="item account-item">
                        <button className="btn-avatar">
                            <img
                                src="/assets/person/DefaultProfile.jpg"
                                alt=""
                                className="profileImg"
                                onClick={handleClick}
                            />
                        </button>
                        {active && (
                            <ul className="sub-item">
                                {isAuthenticated && (
                                    <>
                                        <Link to="/changePassword" style={{ textDecoration: 'none' }}>
                                            <li onClick={() => setActive(false)}>Đổi mật khẩu</li>
                                        </Link>                                       
                                        <li onClick={handleLogout}>Đăng xuất</li>
                                    </>
                                )}
                                {!isAuthenticated && (
                                    <Link to="/login" style={{ textDecoration: 'none' }}>
                                        <li onClick={() => setActive(false)}>Đăng nhập</li>
                                    </Link>
                                )}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
