
import { useEffect, useState } from 'react';
import './AdministrateurProfil.css'
import { BsFillPersonFill, BsList } from "react-icons/bs";
import Connection from '../connection/ConnectionClient';
import DonneeClient from './bdclient/DonneeClient';


function ProfilAdmin() {

    const [modalOpenDonneeClient, setModalOpenDonneeClient] = useState(false);
   

    const [showMenuList, setShowMenuList] = useState(window.innerWidth <= 767);

    const hangleClick = () => {
        setShowMenuList(!showMenuList);
    }

    useEffect(() => {
        const handleResize = () => {
            setShowMenuList(window.innerWidth <= 16);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            <ul className='div-menu-navbar'>
                <li><button onClick={hangleClick} className='btn-menu-accueil'><BsList/></button></li>
                <ul className={showMenuList ? "ul-navbar-responsive" : "ul-navbar" } onClick={() => setShowMenuList(false)}>
                    <li><a className="a" href="#restaurant-disponible">Accueil</a></li>
                    <li><a className="a" href="#Footer-div">A propos</a></li>
                    <li><a className="a" href="#Footer-div"
                         onClick={() => {
                            setModalOpenDonneeClient(true);
                        }}
                    >Base de données clients</a></li>
                    <li><a className="a" href="#Footer-div"
                       onClick={() => {
                        //setModalOpenDonneeClient(true);
                       }}
                    >Base de données restaurateurs</a></li>
                    <li><a className='Explorer' href="ac">Administrateur</a></li>   
                </ul>
                <li><a className="Icone" href="#div-form-connection-client" 
                      onClick={() => {
                      //setModalOpen(true);
                      }}
                 ><BsFillPersonFill/></a></li>
            </ul>
          
            {modalOpenDonneeClient && <DonneeClient setModalOpenDonneeClient={setModalOpenDonneeClient} />}
           
        </>
    )
}

export default ProfilAdmin;
