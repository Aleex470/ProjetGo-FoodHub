import NavBar from "./navBar/NavBar"
import "./HomePage.css"
import Connection from "./connection/ConnectionClient"
import ConnectionRestaurateur from "./connection/ConnectionRestaurateur"
import CardGoogleMap from "./card/cardGoogleMap"
import CardHomePage from "./cardCollection/cardHomePage"

export default function HomePage(){

    return(
        <>
            <div className="homePage">
                <NavBar/>
            {  /*<RestaurantTrouve/>*/}
                <CardHomePage/>
                <Connection/>
                <CardGoogleMap/>
                
            </div>
        
        </>
    )
}