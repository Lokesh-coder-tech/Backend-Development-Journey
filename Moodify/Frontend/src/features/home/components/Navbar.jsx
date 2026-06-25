import React from 'react';
import { Link, NavLink } from 'react-router'; // Adjust imports based on your exact router version
import './navbar.scss';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-logo">
                    <Link to="/">
                        Mood<span>ify</span>
                    </Link>
                </div>

                <div className="navbar-auth">
                    <Link to="/login" className="btn-login">Login</Link>
                    <Link to="/register" className="btn-signup">Get Started</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;