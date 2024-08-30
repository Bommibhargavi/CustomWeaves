
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../Redux/Authslice';
import logo from '../icons/CW_Logo-removebg-preview.png';
import btnicon from '../icons/btn-icon.png';
import Heartred from '../favHearts/HeartRed.png';


const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [open, setOpen] = useState(false);
  
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleClick = () => {
    navigate("/");
  };

  const controleNavbar = () => {
    setMobileMenu(window.innerWidth <= 768);
  };

  useEffect(() => {
    controleNavbar();
    window.addEventListener("resize", controleNavbar);

    return () => {
      window.removeEventListener("resize", controleNavbar);
    };
  }, []);

  const handleToggleMenu = (event) => {
    setOpen((prev) => !prev); // Toggle the menu open/close state
    event.stopPropagation(); // Prevent event bubbling
  };

  useEffect(() => {
    // Add click event listener to close menu on clicking outside
    const handleClickOutside = (event) => {
      if (open && !event.target.closest('.header')) {
        setOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [open]);

  return (
    <div className='header'>
      <img className='logo' onClick={handleClick} src={logo} alt="Logo" />
      {mobileMenu ? (
        <div className={`open ${open? "oppenned" : ""}`} onClick={handleToggleMenu}>
          {/* Cross icon or open icon */}
          <span className="cls" onClick={handleToggleMenu}></span>
          <span>
            <ul className="sub-menu">
              <Link className='Link' to="/">Home</Link>
              <Link className='Link' to="/Fabric">Customize</Link>
              <Link className='Link bag' to="/cart"><i className='bx bxs-shopping-bag'></i></Link>
              <Link className='Link' to="/customDesigns"><img className="btnimage" src={btnicon} alt="Custom Design" /></Link>
              <Link className='Link' to="/Favourites"><img src={Heartred} className="Heart Red" alt="Favorites" /></Link>
              <Link className='Link' to="/Orders">My Orders</Link>
              {user ? (
                <Link className='Link logout' onClick={handleLogout}>Logout</Link>
              ) : (
                <Link className='Link' to="/login">Login</Link>
              )}
            </ul>
          </span>
          {/* Close icon span */}
          <span className="cls" onClick={handleToggleMenu}></span>
        </div>
      ) : (
        <nav className='menu'>
          <Link className='Link' to="/">Home</Link>
          <Link className='Link' to="/Fabric">Customize</Link>
          <Link className='Link bag' to="/cart"><i className='bx bxs-shopping-bag'></i></Link>
          <Link className='Link' to="/customDesigns"><img className="btnimage" src={btnicon} alt="Custom Design" /></Link>
          <Link className='Link' to="/Favourites"><img src={Heartred} className="Heart Red" alt="Favorites" /></Link>
          <Link className='Link' to="/Orders">My Orders</Link>
          {user ? (
            <Link className='Link logout' onClick={handleLogout}>Logout</Link>
          ) : (
            <Link className='Link' to="/login">Login</Link>
          )}
        </nav>
      )}
    </div>
  );
};

export default Navbar;
