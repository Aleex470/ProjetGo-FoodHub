// Search.jsx
import React, { useState, useEffect } from 'react';
import { BsList, BsCart, BsBell, BsFillPersonFill } from "react-icons/bs";
import './Search.css';
import {useNavigate} from "react-router-dom"
import Notification from '../profilClient/notification';
import ListDesNotifs from '../profilClient/listeDesNotifs';

export default function Search({ onAdresseChange, senderType, senderID, receiverID }){
  const [modalOpenNotifClient, setModalOpenNotifClient] = useState(false);

  const navigate = useNavigate();




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

  const handleDeconnecte = ()=>{
    navigate("/")
  } 

  return (
      <>
          <ul className='div-menu-navbar-pc'>
              <button onClick={handleDeconnecte} className='btn-deconnec-menu-pc'>Deconnexion</button>
              <ul className={showMenuList ? "ul-navbar-responsive" : "ul-navbar" } onClick={() => setShowMenuList(false)}>
              
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
                <a className="icone-notification" href="#div-form-con"
                      onClick={() => {
                        setModalOpenNotifClient(true);
                       }}
                    >
                   <BsBell/>
                   <span className="card-item-notification"><Notification senderType={senderType} senderID={senderID} receiverID={receiverID}/></span>
                </a>
              </li>
         </ul>
         <div className='ecart'>

         </div>
        
          {modalOpenNotifClient && <ListDesNotifs setModalOpenNotifClient={setModalOpenNotifClient}/>}
          
      
      </>
  )
}

