import { BsList, BsCart, BsBell } from "react-icons/bs";
import './ProfilRestaurateur.css'
import { useEffect, useState } from "react";
import { storage } from "../../API/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db } from "../../API/firebase"; // Assurez-vous d'ajuster le chemin d'accès en fonction de votre structure de projet Firebase
import { addDoc, collection, serverTimestamp,onSnapshot  } from "firebase/firestore";
import CommandeRecu from "./CommandeRecu"

import ValidationCommande from "../validationCommande/ValidationCommande";


export default function ProfilRestaurateur(){

    const initialise = {
        userNameRestaurateur : "",
        nomMenu : "",
        entree : "",
        plat : "",
        dessert : "",
        imgMenu : ""
    }

    const [data, setData] = useState(initialise);
    const {nomMenu, entree, plat, dessert} = data;
    const [file, setFile] = useState(null);
    const [photoProfil, setPhotoProfil] = useState(null);
    const [progress, setProgress] = useState(null);
    const [isSubmit, setIsSubmit] = useState(false);
    const [username, setUsername] = useState(null);
    const [error, setError] = useState({})
    const [loading, setLoading] = useState(false)

    const [users, setUsers] = useState([]);

    const [restaurateurs, setRestaurateurs] = useState([]);


    //Mise à jour des fichiers ajoutés
    useEffect(()=>{
        const fetchData = async () => {
            try {
              const response = await fetch("http://localhost:8080/donneerestaurateurs");
              if (!response.ok) {
                throw new Error("Erreur lors de la récupération des restaurateurs");
              }
      
              const data = await response.json();
              setRestaurateurs(data);
            } catch (error) {
              console.error("Erreur réseau :", error);
              setError("Erreur lors de la récupération des restaurateurs");
            }
          };
      
          //fetchData();
          
        const uploadFile = () =>{ 

        if (photoProfil) {  
            const name = new Date().getTime() + file.name;
            const storageRef = ref(storage, file.name)
            const uploadTask = uploadBytesResumable(storageRef,file);

            const namepp = new Date().getTime() + photoProfil.name;
            const storageRefPp = ref(storage, photoProfil.name)
            const uploadTaskPp = uploadBytesResumable(storageRefPp,photoProfil);
            
            //Chargement photo de profil restaurant
            uploadTaskPp.on("state_changed", (snapshot)=>{
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes)*100
                setProgress(progress);
                switch (snapshot.state) {
                    case "paused" : 
                    console.log("Upload is pause");
                    break;
                    case 'running' : 
                    console.log("Upload is running");
                    break;
                    default : 
                    break;
                }
            }, (error) => {
                console.log(error)
            },
            () =>{
                getDownloadURL(uploadTaskPp.snapshot.ref).then((downloadURL) => {
                    console.log("Photo de profil uploaded successfully:", downloadURL);
                    setData((prev) => ({...prev, imgPP : downloadURL}))
                })
            }
            );

            uploadTask.on("state_changed", (snapshot)=>{
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes)*100
                setProgress(progress);
                switch (snapshot.state) {
                    case "paused" : 
                    console.log("Upload is pause");
                    break;
                    case 'running' : 
                    console.log("Upload is running");
                    break;
                    default : 
                    break;
                }
            }, (error) => {
                console.log(error)
            },
            () =>{
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log("Photo de profil uploaded successfully:", downloadURL);
                    setData((prev) => ({...prev, imgMenu : downloadURL}))
                })
            }
            );
        } else {
            console.log("Les fichiers ou leurs noms sont null");
        }
        }

       file && uploadFile()
    
    },[file, photoProfil, restaurateurs])

    useEffect(() => {
        // Récupérer le nom d'utilisateur depuis sessionStorage
        const storedUsername = sessionStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
            console.log("username = " + storedUsername);
    
            // Récupération donnée firebase
            const unsub = onSnapshot(collection(db, storedUsername), (snapshot) => {
                let list = [];
                snapshot.docs.forEach((doc) => {
                    list.push({ ...doc.data() });
                });
                setUsers(list);
            }, (error) => {
                console.log("Erreur de récupération des données Firestore", error);
            });
    
            return () => {
                unsub();
            };
        }
    }, []);
    

    const handleChange = (e)=>{
         setData({...data, [e.target.name] : e.target.value})
    }

    const handleSubmit = async (e, userName) => {
        e.preventDefault();
        setIsSubmit(true);
        
        try {
            // Utilisation de la valeur du paramètre 'userName' comme nom de collection
            data.userNameRestaurateur = userName
            await addDoc(collection(db, userName), {
                ...data,
                timestamp: serverTimestamp(),
            });
    
            // Réinitialiser le formulaire après la soumission réussie
            setData(initialise);
            setFile(null);
            setPhotoProfil(null)
            setProgress(null);
            setIsSubmit(false);
        } catch (error) {
            console.error("Erreur lors de l'ajout du document :", error);
            // Gérer les erreurs ici
        }
    };
    
    const senderType = "restaurateur";
    const senderID = "lagondole"; // Remplacez "restaurateur1" par l'identifiant du restaurateur réel
    const receiverID = "lesenf"

    return(
        <>
        <div className='div-entete-pp-resta-et-navBar'>
            <div className='div-entete-pp-restau'>
                <img className="photo-restaurant" src={users.length > 0 ? users[0].imgPP : ""} alt=""/>
                <h1>{username}</h1>
            </div>
            <div className='div-entete-pp-restau-icone'>
                <button className='menu'>
                  <BsBell />
                </button>
                <button className='menu'>
                  <BsList />
                </button>
            </div>
        </div>
        <div className='div-entete-pp-restau'>
            <ul>
                <li>Ajouter un menu</li>
                <li>Supprimer un menu</li>
            </ul>
        </div>
    <form onSubmit={(e) => handleSubmit(e, username)}>
        <CommandeRecu senderType={senderType} senderID={senderID} receiverID={receiverID} />
        <label>Nom du menu </label>
        <input type="text" name="nomMenu" onChange={handleChange} value={nomMenu}/>
        <br></br>
        <label>Nom Entrée </label>
        <input type="text" name="entree" onChange={handleChange} value={entree}/>
         <br></br>
        <label>Nom plat </label>
        <input type="text" name="plat" onChange={handleChange} value={plat}/>
        <br></br>
        <label>Nom dessert </label>
        <input type="text" name="dessert" onChange={handleChange} value={dessert}/>
        <br></br>
        <label>Image </label>
        <input type="file"  onChange={(e)=>setFile(e.target.files[0])}/>
        <br></br>
        <label>Image profil </label>
        <input type="file"  onChange={(e)=>setPhotoProfil(e.target.files[0])}/>
        <br></br>
        <button primary type="submit"
         disabled={progress !== null && progress < 100}
        >Ajouter</button>
        <p>{username}</p>
        <p className="p-image">
        {
          users.map((user, index) => (
          <div className="car-item" key={index}>
            Nom du restaurant : {user.userNameReastaurateur}, Menu : {user.nomMenu}, Plat : {user.plat}, Dessert : {user.dessert}
            <img className="car-image" sizes="medium" src={user.imgMenu} alt=''/>
         </div>))
        }
      </p>
     </form>
     
    </>
    )
}