import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { CartContext } from '../context/CartContext';
import { Sun, Moon, ShoppingBag, Cpu } from 'lucide-react';

export const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { cartCount } = useContext(CartContext);

  return (
    <header className="navbar">
      <div className="nav-container">
        <NavLink to="/" className="nav-logo">
          <Cpu className="gradient-text" size={28} />
          <span>TechFest <span className="gradient-text">2026</span></span>
        </NavLink>

        <ul className="nav-links">
          <li>
            <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/events" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              Events
            </NavLink>
          </li>
          <li>
            <NavLink to="/register" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              Registration
            </NavLink>
          </li>
          <li>
            <NavLink to="/gallery" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              Gallery
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              Contact
            </NavLink>
          </li>
        </ul>

        <div className="nav-actions">
          <button 
            className="icon-btn" 
            onClick={toggleTheme} 
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={20} color="#f59e0b" /> : <Moon size={20} color="#6366f1" />}
          </button>

          <NavLink to="/cart" className="icon-btn" title="View Cart" aria-label="Cart">
            <ShoppingBag size={20} />
            {cartCount > 0 && <span className="badge">{cartCount}</span>}
          </NavLink>
        </div>
      </div>
    </header>
  );
};
