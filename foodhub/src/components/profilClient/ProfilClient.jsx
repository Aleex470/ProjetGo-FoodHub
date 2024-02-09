import React, { useState, useEffect, Children } from 'react';
import Search from '../search/Search';
import CarCollection from '../cardCollection/CardCollection';
import ValidationCommande from '../validationCommande/ValidationCommande';
import Notification from '../profilRestaurateur/notification';


export default function ProfilClient() {
  const [adresseRecherche, setAdresseRecherche] = useState('');
  const [username, setUsername] = useState(null);
 
  useEffect(()=>{

    const storedUsername = sessionStorage.getItem('username');
    if (storedUsername) {
       setUsername(storedUsername);
       console.log("username = " + storedUsername);
    }
  })

  const handleAdresseChange = (nouvelleAdresse) => {
    setAdresseRecherche(nouvelleAdresse);
  };

  const senderType = "client";
  const senderID = "lesenf"; // Remplacez "client1" par l'identifiant du client réel
  const receiverID = "lagondole"; // Remplacez "restaurateur1" par l'identifiant du restaurateur réel

  return (
    <>
      <Search onAdresseChange={handleAdresseChange} />
      <CarCollection adresseRecherche={adresseRecherche}/>
      <div>{username}</div>
      <ValidationCommande senderType={senderType} senderID={senderID} receiverID={receiverID} />
      <Notification senderType={senderType} senderID={senderID} receiverID={receiverID}/>
    </>
  );
}
