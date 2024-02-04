import React, { useEffect, useState } from 'react';
import './CardCollection.css';
import { addDoc, collection, serverTimestamp,onSnapshot  } from "firebase/firestore";
import { db } from '../../API/firebase';

export default function CarCollection() {


    const firebaseConfig = {
      apiKey: "AIzaSyCrQ9L8bHTe6z9Ll7jC2VtuvM4_jAaj-lU",
      authDomain: "restaurateur-menu-image.firebaseapp.com",
      projectId: "restaurateur-menu-image",
      storageBucket: "restaurateur-menu-image.appspot.com",
      messagingSenderId: "894309102385",
      appId: "1:894309102385:web:7e157fbc696b9fdbc0f610"
    };

    const [error, setError] = useState({});
    const [donneeRestaurateursBD, setDonneeRestaurateursBD] = useState([]);
    const [donneeFirebase, setDonneeFirebase] = useState([]);
    const [tabIdentifiantRestaurateur, settabIdentifiantRestaurateur] = useState(["lagondole", "katia", "otacos"]);



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
      // Nettoyez les données à chaque changement de monTab
      setDonneeFirebase([]);

      // Tableau d'annulateurs pour stocker les fonctions d'annulation de chaque écouteur
      const unsubscribers = [];

      // Créer des écouteurs pour chaque utilisateur dans monTab
      tabIdentifiantRestaurateur.forEach((username) => {
        const unsubscribe = createSnapshotListener(username);
        unsubscribers.push(unsubscribe);
      });

      // Retourne une fonction pour annuler tous les écouteurs lors du prochain changement de monTab
      return () => {
        unsubscribers.forEach((unsubscribe) => unsubscribe());
      };

    }, [tabIdentifiantRestaurateur]);/// useEffect avec monTab comme dépendance



  /*useEffect(() => {
     //Récupération donnée firebase
     const unsub = onSnapshot(collection(db, "lagondole"), (snapshot) => {
      let list = [];
      snapshot.docs.forEach((doc) => {
        list.push({ ...doc.data() });
      });
      setDonneeFirebase(list);
      console.log("1 = "+list[0].userNameRestaurateur)
      console.log("2 = "+list[1].userNameRestaurateur)
    }, (error) => {
      console.log("Erreur de récupération des données Firestore", error);
    });

    return () => {
      unsub();
    };
  }, []);*/

   

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
  }, []); // useEffect avec une dépendance vide pour l'exécuter uniquement au montage

   let valee = ""
 
    for (let i = 0; i < donneeFirebaseMap.length; i++) {
      for (let j = 0; j < donneeRestaurateursBD.length; j++) {
        const userName = Object.keys(donneeFirebaseMap[i])[0]; // Obtenez le nom d'utilisateur de tabMap
        const identifiant = donneeRestaurateursBD[j].identifiant;
    
        if (userName.includes(identifiant.toString())) {
          donneeFirebaseMap[i][userName].nomRestaurant = donneeRestaurateursBD[j].nomRestaurant;
          donneeFirebaseMap[i][userName].codePostal = donneeRestaurateursBD[j].codePostal
          valee = valee + donneeFirebaseMap[i][userName].nomRestaurant;
        }
      }
    }
  
  
  
  return (
    <div id="div-carcollection">
    
      {donneeFirebaseMap.map((restaurateur, index) => {
        // Extraire les clés et les valeurs de chaque restaurateur
        const [username, { imgPP,nomRestaurant,codePostal, menus, timestamp }] = Object.entries(restaurateur)[0];

        return (
          <div className="car-item" key={index}>
            <img alt='' className='car-image' src={imgPP} />
            <ul className='marque-annee'>
              <p className="p1" style={{ fontSize: "20px", fontWeight: "600", color: "hsl(210, 11%, 15%)" }}>
                {nomRestaurant}
              </p>
              <p>{codePostal}</p>
            </ul>
            {/*<p>Timestamp: {timestamp.seconds}</p>
            <ul>
              {/* Afficher la liste des menus /}
              {menus.map((menu, menuIndex) => (
                <li key={menuIndex}>
                  <p>Dessert: {menu.dessert}</p>
                  <p>Entrée: {menu.entree}</p>
                  <p>Image du Menu: <img src={menu.imgMenu} alt={menu.nomMenu} /></p>
                  <p>Nom du Menu: {menu.nomMenu}</p>
                  <p>Plat: {menu.plat}</p>
                </li>
              ))}
            </ul>*/}
            <a href="commande-client">Commander</a>
          </div>
        );
      })}
    </div>
  );

}

/* {tabMap && tabMap.length > 0 && tabMap[0].lagondole && (
          <img alt='' className='car-image' src={tabMap[0].lagondole.imgPP} />
        )} */