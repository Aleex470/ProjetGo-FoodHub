import { useState } from "react";

export default function InscriptionUtilisateur() {
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [codePostal, setCodePostal] = useState("");
  const [identifiant, setIdentifiant] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [error, setError] = useState("");

  const handleInscription = async () => {
    try {
      const response = await fetch("http://localhost:8080/inscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prenom: prenom,
          nom: nom,
          codePostal: codePostal,
          identifiant: identifiant,
          motDePasse: motDePasse,
        }),
      });
  
      if (!response.ok) {
        const data = await response.json();
        setError(data.error || "Erreur lors de l'inscription");
      } else {
        setError("");
        console.log("Inscription réussie");
        console.log("Données envoyées :", {
            prenom: prenom,
            nom: nom,
            codePostal: codePostal,
            identifiant: identifiant,
            motDePasse: motDePasse,
          });
          
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
      setError("Erreur réseau");
    }
  };
  

  return (
    <div>
      <h1>Inscription</h1>
      <div>
        <label>Prénom</label>
        <input type="text" value={prenom} onChange={(e) => setPrenom(e.target.value)} />
      </div>
      <div>
        <label>Nom</label>
        <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} />
      </div>
      <div>
        <label>Code Postal</label>
        <input type="text" value={codePostal} onChange={(e) => setCodePostal(e.target.value)} />
      </div>
      <div>
        <label>Identifiant</label>
        <input type="text" value={identifiant} onChange={(e) => setIdentifiant(e.target.value)} />
      </div>
      <div>
        <label>Mot de Passe</label>
        <input type="password" value={motDePasse} onChange={(e) => setMotDePasse(e.target.value)} />
      </div>
      <p style={{ color: 'red', fontSize: "14px" }}>{error}</p>
      <button onClick={handleInscription}>S'inscrire</button>
    </div>
  );
}
