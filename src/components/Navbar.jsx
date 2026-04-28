import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Compass, Menu } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="glass-nav">
      <div className="container flex justify-between items-center py-4">
        <div className="flex items-center gap-2">
          <Compass size={28} className="text-secondary" />
          <span className="text-xl font-bold text-gradient">CareerNav</span>
        </div>

        <div className="hidden md:flex gap-8 items-center font-medium" style={{ display: 'none', '@media (min-width: 768px)': { display: 'flex' } }}>
          <a href="#features" className="hover:text-primary transition-colors text-white text-decoration-none">Features</a>
          <a href="#admin" className="hover:text-primary transition-colors text-white text-decoration-none">Admin Area</a>
          <a href="#student" className="hover:text-primary transition-colors text-white text-decoration-none">Student Portal</a>
        </div>

        <div className="hidden md:flex gap-4" style={{ display: 'none', '@media (min-width: 768px)': { display: 'flex' } }}>
          <button onClick={() => navigate('/login/admin')} className="btn btn-secondary border border-secondary text-secondary hover:bg-secondary hover:text-white transition-colors" style={{ color: '#D8B4FE', borderColor: 'rgba(147,51,234,0.5)' }}>Admin Portal</button>
          <button onClick={() => navigate('/login/student')} className="btn btn-primary">Student Login</button>
        </div>

        <button className="md:hidden text-white bg-transparent border-0 cursor-pointer" style={{ '@media (min-width: 768px)': { display: 'none' } }}>
          <Menu size={24} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
