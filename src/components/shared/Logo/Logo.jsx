import React from 'react';
import { Link } from 'react-router';

const Logo = () => {
    return (
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-primary">
          <img src="/logo.png" alt="logo" className="w-8 h-8" />
          <span>
            Employetica
          </span>
        </Link>
    );
};

export default Logo;