import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './navbar.css';

const Navbar = () => {
  return (
    <div className="navbar">
      <motion.div
        className="navContainer"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.3,
          delay: 0,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
        <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
          <span className="logo">BookingApp</span>
        </Link>
        <div className="navItems">
          <button className="navButton">Register</button>
          <button className="navButton">Login</button>
        </div>
      </motion.div>
    </div>
  );
};

export default Navbar;
