import { BsList, BsCart, BsBell } from "react-icons/bs";
import './ProfilRestaurateur.css'

export default function ProfilRestaurateur(){
    return(
        <>
        <div className='div-entete-pp-resta-et-navBar'>
            <div className='div-entete-pp-restau'>
                <img className="photo-restaurant" src="./image/restaurateur.jpg" alt=""/>
                <h1>Nom du restaurant</h1>
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
        </>
    )
}