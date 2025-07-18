import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Excel WebApp</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/"> Accueil</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/collection1">DataExcel</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/collection2">Statistiques</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

