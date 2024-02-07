import React, { useState, useEffect } from "react";
import { BsList, BsCart, BsBell } from "react-icons/bs";
import { Link, useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import "./commandeClient.css";

export default function CommandeClient() {

  const navigate = useNavigate();

  const location = useLocation();
  const menus = location.state ? location.state.menus : [];

  const [showMenuList, setShowMenuList] = useState(window.innerWidth <= 767);
  const [contenuPanier, setContenuPanier] = useState([]);
  const [selectedTab, setSelectedTab] = useState([]);
  const [commandeAValider, setCommandeAValider] = useState()
 

  const hangleContenuPanier = (index) => {
    // Ajoutez le menu sélectionné à l'état du panier
      setContenuPanier((prevPanier) => {
        const nouveauPanier = [...prevPanier, menus[index]];
        console.log(nouveauPanier);
        setCommandeAValider(nouveauPanier)
        return nouveauPanier;
      });
  };

  const hangleClick = () => {
    setShowMenuList(!showMenuList);
    console.log("L'objet =", menus);
  };

  const handleClickValidationCommande = () => {
    // Naviguer vers la page de validation de la commande avec le panier comme paramètre
    console.log('Contenu du panier à transmettre :', contenuPanier);
    navigate('/valider-commande', { state: { panier: contenuPanier } });
  };

  return (
    <>
      <div className="navBarPC">
        <ul className="navBarPC-option">
          <li style={{ listStyle: "none" }}>
            <button onClick={hangleClick} className="menu">
              <BsList />
            </button>
          </li>
          <li>
            <a className="aPC" href="#restaurant-disponible">
              <BsBell />
            </a>
          </li>
          <div>
            <input
              type="text"
              className="search-bar-PC"
              placeholder="Plats..."
            />
          </div>
          <li>
            <a className="IconePC" href="valider-commande" onClick={handleClickValidationCommande}>
              <BsCart />
              {contenuPanier.length > 0 && (
                <span className="cart-item-count">
                  {contenuPanier.length}
                </span>
              )}
            </a>
          </li>
        </ul>
      </div>
      <div id="div-listePLatePP">
        {selectedTab.map((car, index) => (
          <div className="car-itemPP" key={index}>
            <img alt="" className="car-image" src={car.imageUrl} />
            <ul className="marque-annee">
              <p
                className="p1"
                style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  color: "hsl(210, 11%, 15%)",
                }}
              >
                Menu
              </p>
            </ul>
            <p>Type d'entrée : {car.entree}</p>
            <p>Type de plat : {car.plat}</p>
            <p>Type de dessert : {car.dessert}</p>
            <button onClick={() => hangleContenuPanier(index)}>
              Ajouter au panier
            </button>
          </div>
        ))}
      </div>
      <h1>CommandeClient</h1>
      <div className="div-card-menu-restaurant">
        {menus.map((menu, index) => (
          <div key={index}>
            <div className="proprite-menu">
              <img src={menu.imgMenu} alt={menu.nomMenu} sizes="medium" />
              <p>Dessert: {menu.dessert}</p>
              <p>Entrée: {menu.entree}</p>
              <p>Nom du Menu: {menu.nomMenu}</p>
              <p>Plat: {menu.plat}</p>
            </div>
            <button onClick={() => hangleContenuPanier(index)}>
              Ajouter
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
