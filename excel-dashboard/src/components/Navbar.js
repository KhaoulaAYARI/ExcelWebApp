import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{
      backgroundColor: '#1e88e5',
      padding: '10px 20px',
      marginBottom: '20px',
      color: 'white',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <h2 style={{ margin: 0 }}>Excel WebApp</h2>
      <div style={{ display: 'flex', gap: '15px' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>🏠 Accueil</Link>
        <Link to="/collection1" style={{ color: 'white', textDecoration: 'none' }}>📄 Données Excel</Link>
        <Link to="/collection2" style={{ color: 'white', textDecoration: 'none' }}>📊 Statistiques</Link>
      </div>
    </nav>
  );
};

export default Navbar;
