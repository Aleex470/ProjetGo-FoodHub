import React, { useState, useEffect } from "react";
import { BsList, BsCart, BsBell } from "react-icons/bs";
import { useParams } from "react-router-dom";
import "./commandeClient.css";

export default function CommandeClient() {
  const { idRestaurant } = useParams();

  const [showMenuList, setShowMenuList] = useState(window.innerWidth <= 767);
  const [contenuPanier, setContenuPanier] = useState([]);

  const listeDesPlats = [
    {
      imageUrl: "/image/resto.jpg",
      entree: "salade",
      plat: "yassa",
      dessert: "Bissap",
    },
    {
      imageUrl: "/image/resto.jpg",
      entree: "oeuf",
      plat: "filet de boeuf",
      dessert: "glace",
    },
    {
      imageUrl: "/image/resto.jpg",
      entree: "entree",
      plat: "plat",
      dessert: "dessert",
    },
  ];

  const [selectedRestaurant, setSelectedRestaurant] = useState(null)
  const [selectedTab, setSelectedTab] = useState([]);

  useEffect(() => {
    // Récupérez la valeur du stockage local
    const selectedRestaurantString = localStorage.getItem('selectedRestaurant');
    if (selectedRestaurantString) {
      const selectedRestaurant = JSON.parse(selectedRestaurantString);
      setSelectedRestaurant(selectedRestaurantString);
      setSelectedTab(selectedRestaurant.tab || []);
      console.log('Restaurant récupéré dans CommandeClient :', selectedRestaurant);
      // Faites quelque chose avec la valeur récupérée
    }
  }, []);

  const hangleContenuPanier = (index) => {
    const selectedMenu = listeDesPlats[index];
    setContenuPanier([...contenuPanier, selectedMenu]);
    console.log(selectedMenu); // Affichez l'élément ajouté au panier
  };

  const hangleClick = () => {
    setShowMenuList(!showMenuList);
    console.log("L'objet = ")
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
            <a className="IconePC" href="#div-form-connection-client">
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
      <div>
        <p>Contenu du tableau :</p>
        <ul>
          {selectedTab.map((item, index) => (
            <li key={index}>{JSON.stringify(item)}</li>
          ))}
        </ul>
      </div>
    </div>
  </>
  );
}
