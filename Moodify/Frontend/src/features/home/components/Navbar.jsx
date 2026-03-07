import React from 'react';
import { Link } from 'react-router' ; // Assuming you use react-router
import './navbar.scss';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">
                    Mood<span>ify</span>
                </Link>
            </div>

            <div className="navbar-auth">
                <Link to="/login" className="btn-login">Login</Link>
                <Link to="/register" className="btn-signup">Sign Up</Link>
            </div>
        </nav>
    );
};

export default Navbar;