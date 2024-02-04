import React, { useState, useEffect, Children } from 'react';
import Search from '../search/Search';
import CarCollection from '../cardCollection/CardCollection';




export default function ProfilClient() {
  const [adresseRecherche, setAdresseRecherche] = useState('');
  const [error, setError] = useState({});
  const [donneeRestaurateurs, setDonneeRestaurateurs] = useState([]);
 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/donneerestaurateurs");
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des restaurateurs");
        }

        const data = await response.json();
        setDonneeRestaurateurs(data);
      } catch (error) {
        console.error("Erreur réseau :", error);
        setError("Erreur lors de la récupération des restaurateurs");
      }
    };

    fetchData();

  }, []); 


  const handleAdresseChange = (nouvelleAdresse) => {
    setAdresseRecherche(nouvelleAdresse);
  };

  return (
    <>
      <Search onAdresseChange={handleAdresseChange} />
      <CarCollection adresseRecherche={adresseRecherche} tableauAutreObjet={donneeRestaurateurs} />
    </>
  );
}
