import { useState } from "react";

export default function CompteClient(){
    //Identifiant connexion client
    const [usernameClient, setUsernameClient] = useState('');
    const [passwordClient, setPasswordClient] = useState('');
    const handleLoginClient = () => {
        // Votre logique de vérification des identifiants
        // Ici, j'utilise une condition simple pour simuler une vérification incorrecte
        if (usernameClient === 'khalifa' && passwordClient === 'khalifa') {
            setError('');
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
            console.log("Connexion résussie")
        } else {
            setError('Identifiants incorrects. Veuillez réessayer.');
        }
    };

    return (
          <div id='div-form-connection-restaurant'>
            <img src="/image/client.png" alt=""></img>
            <form  id="form-connection-client" action="/action_page.php">
                <h1>Compte Client</h1>
                <div>
                    <label for="prenomRestaurateur">Prénom*</label><br></br>
                    <input type="text" className="username" value={usernameRestaurateur} onChange={(e) => setUsernameRestaurateur(e.target.value)} placeholder="Nom du restaurant..." />
                </div>
                <div>
                    <label for="prenomRestaurateur">Nom*</label><br></br>
                    <input type="text" className="username" value={usernameRestaurateur} onChange={(e) => setUsernameRestaurateur(e.target.value)} placeholder="Nom du restaurant..." />
                </div>
                <div>
                    <label for="codePostalRestaurateur">Code postal*</label><br></br>
                    <input type="text" className="username" value={usernameRestaurateur} onChange={(e) => setUsernameRestaurateur(e.target.value)} placeholder="Nom du restaurant..." />
                </div>
                <div>
                    <label for="identifiantRestaurateur">Identifiant*</label><br></br>
                    <input type="text" className="username" value={usernameRestaurateur} onChange={(e) => setUsernameRestaurateur(e.target.value)} placeholder="Nom du restaurant..." />
                </div>
                <div>
                    <label for="mdpRestaurateur">Mot de passe*</label><br></br>
                    <input type="password" className="username" value={usernameRestaurateur} onChange={(e) => setUsernameRestaurateur(e.target.value)} placeholder="Nom du restaurant..." />
                </div>
                <p style={{ color: 'red', fontSize : "14px" }}>{error}</p>
                <button className="bouton-connexion" onClick={handleLoginRestaurateur}>Créer le compte</button>
                <ul className="div-createcmp-mdo">
                    <li><a className="a-connextion" href="#crationCompte">Se connecter</a></li>
                    <li><a className="a-connextion" href="#ReinitialisationMDP">Aide</a></li>
                </ul>  
            </form>
          </div>
    );
}