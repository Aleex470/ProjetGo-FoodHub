package connexionClient

import (
	"database/sql"
	"github.com/gorilla/websocket"
	"log"
	"net/http"
)

// VérifierIdentifiantsClient vérifie les identifiants du client
func VerifierIdentifiantsClient(username string, password string, db *sql.DB) (bool, error) {
	var count int
	err := db.QueryRow("SELECT COUNT(*) FROM client WHERE identifiant = ? AND motDePasse = ?", username, password).Scan(&count)
	if err != nil {
		return false, err
	}
	return count > 0, nil
}

// HandleLoginClient gère la connexion du client en vérifiant les identifiants
func HandleLoginClient(w http.ResponseWriter, r *http.Request, db *sql.DB) {
	usernameClient := r.FormValue("username")
	passwordClient := r.FormValue("password")

	// Vérification des identifiants
	ok, err := VerifierIdentifiantsClient(usernameClient, passwordClient, db)
	if err != nil {
		log.Println("Erreur lors de la vérification des identifiants :", err)
		respondWithError(w, http.StatusInternalServerError, "Erreur serveur")
		return
	}

	if ok {
		// Connexion réussie
		respondWithJSON(w, http.StatusOK, map[string]string{"message": "Connexion réussie"})
		log.Println("Connexion réussie :)")

	} else {
		// Identifiants incorrects
		log.Println("Connexion impossible :(")
		respondWithError(w, http.StatusUnauthorized, "Identifiants incorrects. Veuillez réessayer.")
	}
}

type SocketConnection struct {
	Conn   *websocket.Conn
	IsUser bool // true pour un utilisateur, false pour un restaurateur
}

var clients = make(map[*SocketConnection]bool)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func wsHandler(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
		return
	}
	defer conn.Close()

	// Lire le type d'utilisateur depuis la requête (vous devez implémenter cela)
	isUser := r.Header.Get("User-Type") == "user"

	// Envoyer un message au client lorsque la connexion est établie
	conn.WriteMessage(websocket.TextMessage, []byte("Le serveur est connecté au socket"))

	// Ajouter la connexion à la liste avec le type d'utilisateur
	socketConn := &SocketConnection{Conn: conn, IsUser: isUser}
	clients[socketConn] = true

	for {
		messageType, p, err := conn.ReadMessage()
		if err != nil {
			log.Println(err)
			delete(clients, socketConn)
			return
		}

		for client := range clients {
			// Vérifier que le type d'utilisateur correspond avant d'envoyer le message
			if client.IsUser != socketConn.IsUser {
				continue
			}

			err := client.Conn.WriteMessage(messageType, p)
			if err != nil {
				log.Println(err)
				client.Conn.Close()
				delete(clients, client)
			}
		}
	}
}
