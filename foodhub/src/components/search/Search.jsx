// Search.jsx
import React, { useState } from 'react';
import { BsList, BsCart, BsBell } from "react-icons/bs";
import './Search.css';

export default function Search({ onAdresseChange }) {
  const [adresse, setAdresse] = useState('');

  const handleInputChange = (e) => {
    setAdresse(e.target.value);
  };

  const handleRechercher = () => {
    // Appeler la fonction de gestion de l'adresse du parent
    onAdresseChange(adresse);
  };

  return (
    <div className="container-filtre">
      <button className='menu'><BsList /></button>
      <div>
        <input
          type="text"
          value={adresse}
          onChange={handleInputChange}
          className="search-bar-nomRest"
          placeholder="Saisir l'adresse"
        />
        <button onClick={handleRechercher} className="bouton-rechercher">
          Trouver un restaurant
        </button>
      </div>
      <a className="aPC" href="#restaurant-disponible">
        <BsBell/>
        <span>0</span>
      </a>
      
    </div>
  );
}
