import React, { Component } from 'react';
import './CardCollection.css';

class CarCollection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listeDesRestaurants: [
        {
          idRestaurant: "r1",
          imageUrl: '/image/resto.jpg',
          adresse: '94 AV Verdun 93330',
          nomDuRestaurant: 'Nom du restaurant',
          tab : [ {
            imageUrl: "/image/resto.jpg",
            entree: "salade",
            plat: "yassa",
            dessert: "Bissap",
          },
          {
            imageUrl: "/image/resto.jpg",
            entree: "oeuf",
            plat: "filet de boeuf",
            dessert: "glace",
          },
         ]
        },
        {
          idRestaurant: "r2",
          imageUrl: '/image/resto.jpg',
          adresse: '94 AV Verdun 93560',
          nomDuRestaurant: 'Nom du restaurant',
          tab : []
        },
        {
          idRestaurant: "r3",
          imageUrl: '/image/resto.jpg',
          adresse: '94 AV Verdun 75018',
          nomDuRestaurant: 'Nom du restaurant',
          tab : []
        },
        {
          idRestaurant: "r4",
          imageUrl: '/image/resto.jpg',
          adresse: '94 AV Verdun 75018',
          nomDuRestaurant: 'Nom du restaurant',
          tab : []
        },
      ],
      listeDesRestaurantsFiltres: [],
      rechercheEffectuee: false,
    };
  }

  handleResetListe = () => {
    this.setState({
      listeDesRestaurantsFiltres: this.state.listeDesRestaurants,
      rechercheEffectuee: false,
    });
  };

  handleCommander = (index) => {
    const restaurantSelectionne = this.state.listeDesRestaurantsFiltres[index];
    console.log('Détails du restaurant sélectionné :', restaurantSelectionne);

    // Enregistrez le restaurant sélectionné dans le stockage local
    localStorage.setItem('selectedRestaurant', JSON.stringify(restaurantSelectionne));

    // Vous pouvez faire d'autres actions ici en fonction des détails du restaurant sélectionné
    return restaurantSelectionne;
  };

  componentDidMount() {
    const { adresseRecherche } = this.props;

    if (adresseRecherche && adresseRecherche.trim() !== '') {
      // Filtrer les restaurants en fonction de l'adresse
      const restaurantsFiltres = this.state.listeDesRestaurants.filter((restaurant) =>
        restaurant.adresse.includes(adresseRecherche)
      );
      this.setState({
        listeDesRestaurantsFiltres: restaurantsFiltres,
        rechercheEffectuee: true,
      });
    } else {
      // Réinitialiser la liste si l'adresse est vide ou undefined
      this.handleResetListe();
    }
  }

  render() {
    return (
      <>
        <div id="div-carcollection">
          {this.state.rechercheEffectuee ? (
            // Affichez les résultats de la recherche
            this.state.listeDesRestaurantsFiltres.map((restaurant, index) => (
              <div className="car-item" key={index}>
                <img alt='' className='car-image' src={restaurant.imageUrl} />
                <ul className='marque-annee'>
                  <p className="p1" style={{ fontSize: "20px", fontWeight: "600", color: "hsl(210, 11%, 15%)" }}>
                    {restaurant.nomDuRestaurant}
                  </p>
                </ul>
                <p>Adresse : {restaurant.adresse}</p>
                <a href="commande-client" onClick={() => this.handleCommander(index)}>Commander</a>
              </div>
            ))
          ) : (
            // Affichez la liste complète si aucune recherche n'est effectuée
            this.state.listeDesRestaurants.map((restaurant, index) => (
              <div className="car-item" key={index}>
                <img alt='' className='car-image' src={restaurant.imageUrl} />
                <ul className='marque-annee'>
                  <p className="p1" style={{ fontSize: "20px", fontWeight: "600", color: "hsl(210, 11%, 15%)" }}>
                    {restaurant.nomDuRestaurant}
                  </p>
                </ul>
                <p>Adresse : {restaurant.adresse}</p>
                <a href="commande-client" onClick={() => this.handleCommander(index)}>Commander</a>
              </div>
            ))
          )}
        </div>
      </>
    );
  }
}

export const handleCommanderExported = CarCollection.handleCommander;

export default CarCollection;
