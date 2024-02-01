import React, { useState, useEffect } from 'react';
import {useNavigate} from "react-router-dom"
import './ConnectionClient.css'


function ConnectionRestaurant({ setOpenModalR }) {
    const navigate = useNavigate();
    const [usernameClient, setUsernameClient] = useState('');
    const [passwordClient, setPasswordClient] = useState('');
    const [pageProfil, setPageProfil] = useState(null)

    const handleLoginRestaurateur = () => {
        // Votre logique de vérification des identifiants
        // Ici, j'utilise une condition simple pour simuler une vérification incorrecte
        if (usernameClient === '' && passwordClient === '') {
            setError('');
            navigate('/profil-restaurateur');
            console.log("Connexion résussie")
        } else {
            setError('Identifiants incorrects. Veuillez réessayer.');
        }
    };

    const [error, setError] = useState('');

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModalR(false);
            }}
          >
            X
          </button>
        </div>
        <div className="body">
          <div id='div-form-connection-client'>
              <form  id="form-connection-client">
                  <h1>Connexion restaurateur</h1>
                  <input type="text" className="username" value={usernameClient} onChange={(e) => setUsernameClient(e.target.value)} placeholder="Username..." />
                  <input type="password" className="password" value={passwordClient} onChange={(e) => setPasswordClient(e.target.value)} placeholder="Password..." />
                  <p style={{ color: 'red', fontSize : "14px" }}>{error}</p>
                  <button className="bouton-connexion" onClick={handleLoginRestaurateur}>Connexion</button>
                  <ul className="div-createcmp-mdo">
                      <li><a className="a-connextion" href="creation-compte-client">Créer un compte</a></li>
                      <li><a className="a-connextion" href="#ReinitialisationMDP">Mot de passe oublié</a></li>
                  </ul>  
              </form>
            </div>
        </div>
      </div>
    </div>
  );
}

export default ConnectionRestaurant;













    /*const navigate = useNavigate();


    //Identifiant connexion client
    const [usernameClient, setUsernameClient] = useState('');
    const [passwordClient, setPasswordClient] = useState('');
    const [pageProfil, setPageProfil] = useState(null)
    const handleLoginClient = () => {
        // Votre logique de vérification des identifiants
        // Ici, j'utilise une condition simple pour simuler une vérification incorrecte
        if (usernameClient === '' && passwordClient === '') {
            setError('');
            navigate('/profil-client');
            console.log("Connexion résussie")
        } else {
            setError('Identifiants incorrects. Veuillez réessayer.');
        }
    };

    //Identifiant connexion restaurant
    const [usernameRestaurateur, setUsernameRestaurateur] = useState('');
    const [passwordRestaurateur, setPasswordRestaurateur] = useState('');

    const [error, setError] = useState('');

    const handleLoginRestaurateur = () => {
        // Votre logique de vérification des identifiants
        // Ici, j'utilise une condition simple pour simuler une vérification incorrecte
        if (usernameClient === 'khalifa' && passwordClient === 'khalifa') {
            setError('');
            setPageProfil('profil-client')
            console.log("Connexion résussie")
        } else {
            setError('Identifiants incorrects. Veuillez réessayer.');
        }
    };


    useEffect(() => {
        if (pageProfil) {
            // Effectue la redirection vers la route spécifiée
            window.location.href = pageProfil;
        }
    }, [pageProfil]);
    

    return (
      
         {/ <div id='div-form-connection-client'>
            <img src="/image/client.png" alt=""></img>
            <form  id="form-connection-client">
                <h1>Connexion client</h1>
                <input type="text" className="username" value={usernameClient} onChange={(e) => setUsernameClient(e.target.value)} placeholder="Username..." />
                <input type="password" className="password" value={passwordClient} onChange={(e) => setPasswordClient(e.target.value)} placeholder="Password..." />
                <p style={{ color: 'red', fontSize : "14px" }}>{error}</p>
                <button className="bouton-connexion" onClick={handleLoginClient}>Connexion</button>
                <ul className="div-createcmp-mdo">
                    <li><a className="a-connextion" href="creation-compte-client">Créer un compte</a></li>
                    <li><a className="a-connextion" href="#ReinitialisationMDP">Mot de passe oublié</a></li>
                </ul>  
            </form>
          </div>
          <div id='div-form-connection-restaurant'>
            <img src="/image/restaurateur.jpg" alt=""></img>
            <form  id="form-connection-client" action="/action_page.php">
                <h1>Connexion Restaurateur</h1>
                <input type="text" className="username" value={usernameRestaurateur} onChange={(e) => setUsernameRestaurateur(e.target.value)} placeholder="Username..." />
                <input type="password" className="password" value={passwordRestaurateur} onChange={(e) => setPasswordRestaurateur(e.target.value)} placeholder="Password..." />
                <p style={{ color: 'red', fontSize : "14px" }}>{error}</p>
                <button className="bouton-connexion" onClick={handleLoginRestaurateur}>Connexion</button>
                <ul className="div-createcmp-mdo">
                    <li><a className="a-connextion" href="creation-compte-restaurateur">Créer un compte restaurateur</a></li>
                    <li><a className="a-connextion" href="#ReinitialisationMDP">Mot de passe oublié</a></li>
                </ul>  
            </form>
          </div>/}
        
    );*/

