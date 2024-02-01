import React, { useState } from "react";
import { BsList, BsCart } from "react-icons/bs";
import './cardHomePage.css'


export default function CardHomePage() {
  const [showMenuList, setShowMenuList] = useState(window.innerWidth <= 767);
  const [contenuPanier, setContenuPanier] = useState([]);

  const listeDesPlats = [
    {
      imageUrl: '/image/resto.jpg',
      entree: "salade",
      plat: "yassa",
      dessert: "Bissap",
      description : "Se connecter en tant que restaurateur",
      url : "",
      href : "#div-form-connection-restaurateur"
    },
    {
      imageUrl: '/image/resto.jpg',
      entree: "oeuf",
      plat: "filet de boeuf",
      dessert: "glace",
      description : "Vous pouvez créer facilement un compte client",
      url : "Ajouter un compte client",
      href : 'creation-compte-client'
    },
    {
      imageUrl: '/image/resto.jpg',
      entree: "entree",
      plat: "plat",
      dessert: "dessert",
      description : "Livrez avec FoodHub",
      url : "Livrez avec FoodHub",
      href : ""
    },
  ];

  const hangleContenuPanier = (index) => {
    const selectedMenu = listeDesPlats[index];
    setContenuPanier([...contenuPanier, selectedMenu]);
    console.log(contenuPanier[index])
  };

  const hangleClick = () => {
    setShowMenuList(!showMenuList);
  };

  return (
    <>
      <div className="div-img-homePage">

      </div>
      <div id="div-cardHomePage">
        {listeDesPlats.map((car, index) => (
          <div className='car-item-homePage' key={index}>
            <img alt='' className='car-image' src={car.imageUrl} />
            <ul className='ul-connect-restau'>
              <h2>{car.description}</h2>
              <a href={car.href}>{car.url}</a>
            </ul>
          </div>
        ))
        }
      </div>
    </>
  );
}
