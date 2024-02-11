import NavBar from "./navBar/NavBar"
// import LogoutButton from "./Logout/LogoutButton"
import DataTable from "./Admin/DataTable"

// CSS
import './AdminPage.css'

export default function AdminPage(){

    const userData = [
        { id: 1, name: 'Utilisateur 1', role: 'Admin' },
        { id: 2, name: 'Utilisateur 2', role: 'Utilisateur' },
        { id: 3, name: 'Utilisateur 3', role: 'Modérateur' },
        { id: 1, name: 'Utilisateur 1', role: 'Admin' },
        { id: 2, name: 'Utilisateur 2', role: 'Utilisateur' },
        { id: 3, name: 'Utilisateur 3', role: 'Modérateur' },
        { id: 1, name: 'Utilisateur 1', role: 'Admin' },
        { id: 2, name: 'Utilisateur 2', role: 'Utilisateur' },
        { id: 3, name: 'Utilisateur 3', role: 'Modérateur' },
        // ... Ajoutez autant d'utilisateurs que nécessaire
      ];
    
      const restoData = [
        { id: 1, name: 'Resto 1', type: 'Japonais' },
        { id: 2, name: 'Resto 2', type: 'FastFood' },
        { id: 3, name: 'Resto 3', type: 'Mexicain' },
        // ... Ajoutez autant de restaurants que nécessaire
      ];

    return (
        <div> 
            <NavBar />
            <div className="containerTable" tyle={{display: 'flex', justifyContent: 'space-around', marginTop: '6rem'}}>
                <div>
                    <h2>Tableau d'utilisateurs</h2>
                    <DataTable data={userData} dataType="users" />
                </div>
                <div>
                    <h2>Tableau de restaurants</h2>
                    <DataTable data={restoData} dataType="restaurants" />
            </div>
            </div>
        </div>
      );
}