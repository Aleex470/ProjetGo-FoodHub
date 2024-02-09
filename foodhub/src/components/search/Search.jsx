// Search.jsx
import React, { useState, useEffect } from 'react';
import { BsList, BsCart, BsBell, BsFillPersonFill } from "react-icons/bs";
import './Search.css';


export default function Search({ onAdresseChange }){

  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenR, setModalOpenR] = useState(false);




  const [adresse, setAdresse] = useState('');

  const handleInputChange = (e) => {
    setAdresse(e.target.value);
  };

  const handleRechercher = () => {
    // Appeler la fonction de gestion de l'adresse du parent
    onAdresseChange(adresse);
  };


  const [showMenuList, setShowMenuList] = useState(window.innerWidth <= 767);

 

  useEffect(() => {
      const handleResize = () => {
          setShowMenuList(window.innerWidth <= 16);
      };

      window.addEventListener('resize', handleResize);

      return () => {
          window.removeEventListener('resize', handleResize);
      };
  }, []);

  return (
      <>
          
          <ul className='div-menu-navbar-pc'>
              <li><button className='btn-menu-accueil-pc'><BsList/></button></li>
              <ul className={showMenuList ? "ul-navbar-responsive" : "ul-navbar" } onClick={() => setShowMenuList(false)}>
                  <li><a className="a" href="#restaurant-disponible">Accueil</a></li>
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
              </ul>
              <li>
                <a className="icone-notification" href="#div-form-con">
                   <BsBell/>
                   <span className="card-item-notification">0</span>
                </a>
              </li>
         </ul>
         <div className='ecart'>

         </div>
        
          {/*modalOpen && <Connection setOpenModal={setModalOpen} />*/}
          {/*modalOpenR && <ConnectionRestaurant setOpenModalR={setModalOpenR} />*/}
      
      </>
  )
}

