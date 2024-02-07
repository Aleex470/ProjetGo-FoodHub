import React, { useState, useEffect, Children } from 'react';
import Search from '../search/Search';
import CarCollection from '../cardCollection/CardCollection';
import ValidationCommande from '../validationCommande/ValidationCommande';


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
  return (
    <>
      <Search onAdresseChange={handleAdresseChange} />
      <CarCollection adresseRecherche={adresseRecherche}/>
      <div>{username}</div>
    </>
  );
}
