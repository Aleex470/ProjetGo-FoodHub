import React, { useState, useEffect } from 'react';
import './DonneeClient.css'


function DonneeClient({ setModalOpenDonneeClient }) {
     const [donneeClient, setDonneeClient] = useState([])
     const [error, setError] = useState({});

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch("http://localhost:8080/donneeclients");
            if (!response.ok) {
              throw new Error("Erreur lors de la récupération des clients");
            }
    
            const data = await response.json();
            setDonneeClient(data);
            console.log("Donnée restaurateur = " +data);
          } catch (error) {
            console.error("Erreur réseau :", error);
            setError("Erreur lors de la récupération des restaurateurs");
          }
        };
    
        fetchData();
      }, []);
   
  

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
                setModalOpenDonneeClient(false);
            }}
          >
            Fermer
          </button>
        </div>
        <div className="body">
            <div id='div-form-connection-client'>
               Donnée client
            </div>
        </div>
      </div>
    </div>
  );
}

export default DonneeClient;










