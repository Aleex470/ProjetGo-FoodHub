// ParentComponent.jsx
import React, { useState } from 'react';
import Search from '../search/Search';
import CarCollection from '../cardCollection/CardCollection';

export default function ProfilClient() {
  const [adresseRecherche, setAdresseRecherche] = useState('');

  const handleAdresseChange = (nouvelleAdresse) => {
    setAdresseRecherche(nouvelleAdresse);
  };

  return (
    <>
      <Search onAdresseChange={handleAdresseChange} />
      <CarCollection adresseRecherche={adresseRecherche} />
    </>
  );
}
