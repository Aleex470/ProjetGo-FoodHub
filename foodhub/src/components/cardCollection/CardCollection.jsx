import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CardCollection.css';
import { addDoc, collection, serverTimestamp, onSnapshot } from "firebase/firestore";
import { db } from '../../API/firebase';

export default function CardCollection({ adresseRecherche }) {

  const [error, setError] = useState({});
  const [donneeRestaurateursBD, setDonneeRestaurateursBD] = useState([]);
  const [donneeFirebase, setDonneeFirebase] = useState([]);
  const [tabIdentifiantRestaurateur, settabIdentifiantRestaurateur] = useState(["lagondole", "katia", "otacos"]);
  const navigate = useNavigate();

  const createSnapshotListener = (username) => {
    return onSnapshot(collection(db, username), (snapshot) => {
      let list = [];
      snapshot.docs.forEach((doc) => {
        list.push({ ...doc.data() });
      });
      setDonneeFirebase((prevList) => [...prevList, ...list]);

    }, (error) => {
      console.log(`Erreur lors de la récupération des données pour ${username}:`, error);
    });
  };

  useEffect(() => {
    setDonneeFirebase([]);

    const unsubscribers = [];

    tabIdentifiantRestaurateur.forEach((username) => {
      const unsubscribe = createSnapshotListener(username);
      unsubscribers.push(unsubscribe);
    });

    return () => {
      unsubscribers.forEach((unsubscribe) => unsubscribe());
    };

  }, [tabIdentifiantRestaurateur]);

  function transformeTableauEnObjet(gtab) {
    const result = [];

    gtab.forEach((menu) => {
      const {
        dessert,
        entree,
        imgMenu,
        imgPP,
        nomMenu,
        plat,
        timestamp,
        userNameRestaurateur,
      } = menu;

      const existingUserIndex = result.findIndex(
        (user) => user[userNameRestaurateur]
      );

      if (existingUserIndex === -1) {
        const newUser = {
          [userNameRestaurateur]: {
            imgPP,
            menus: [
              {
                dessert,
                entree,
                imgMenu,
                nomMenu,
                plat,
              },
            ],
            timestamp,
          },
        };
        result.push(newUser);
      } else {
        result[existingUserIndex][userNameRestaurateur].menus.push({
          dessert,
          entree,
          imgMenu,
          nomMenu,
          plat,
        });
      }
    });

    return result;
  }

  const donneeFirebaseMap = transformeTableauEnObjet(donneeFirebase)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/donneerestaurateurs");
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des restaurateurs");
        }

        const data = await response.json();
        setDonneeRestaurateursBD(data);
        console.log(data);
      } catch (error) {
        console.error("Erreur réseau :", error);
        setError("Erreur lors de la récupération des restaurateurs");
      }
    };

    fetchData();
  }, []);

  let valee = ""

  for (let i = 0; i < donneeFirebaseMap.length; i++) {
    for (let j = 0; j < donneeRestaurateursBD.length; j++) {
      const userName = Object.keys(donneeFirebaseMap[i])[0];
      const identifiant = donneeRestaurateursBD[j].identifiant;

      if (userName.includes(identifiant.toString())) {
        donneeFirebaseMap[i][userName].nomRestaurant = donneeRestaurateursBD[j].nomRestaurant;
        donneeFirebaseMap[i][userName].codePostal = donneeRestaurateursBD[j].codePostal
        valee = valee + donneeFirebaseMap[i][userName].nomRestaurant;
      }
    }
  }

  const filteredRestaurants = adresseRecherche
    ? donneeFirebaseMap.filter(restaurateur =>
      restaurateur[Object.keys(restaurateur)[0]].codePostal.includes(adresseRecherche)
    )
    : donneeFirebaseMap;

  const handleClickCommander = (menus) => {
    if (menus && menus.length > 0) {
      console.log(`Menus du restaurant :`, menus);
      navigate('/commande-client', { state: { menus } });
    } else {
      console.error("Aucune donnée de menus à transmettre.");
    }
  };

  return (
    <div id="div-carcollection">
      {filteredRestaurants.map((restaurateur, index) => {
        const [username, { imgPP, nomRestaurant, codePostal, menus, timestamp }] = Object.entries(restaurateur)[0];

        return (
          <div className="car-item" key={index}>
            <img alt='' className='car-image' src={imgPP} />
            <ul className='marque-annee'>
              <p className="p1" style={{ fontSize: "20px", fontWeight: "600", color: "hsl(210, 11%, 15%)" }}>
                {nomRestaurant}
              </p>
              <p>{codePostal}</p>
            </ul>
            <button onClick={() => handleClickCommander(menus)}>Commander</button>
          </div>
        );
      })}
    </div>
  );
}
