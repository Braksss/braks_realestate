# main.py - Script principal pour le scraping des données
import requests
from bs4 import BeautifulSoup
import json
import time

# URL de recherche pour les villas à vendre sur la Costa Brava sur Idealista
BASE_URL = "https://www.idealista.com/fr/recherche-vente-maisons/costa-brava-gerone/"

# Headers pour simuler un navigateur et éviter un blocage
HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
}

def save_to_supabase(data):
    """
    Fonction de substitution pour sauvegarder les données.
    Dans un vrai projet, ici on se connecterait à Supabase.
    Pour l'exemple, nous allons écrire dans un fichier JSON.
    """
    print(f"--- Sauvegarde de {len(data)} biens dans la base de données (simulation) ---")
    with open('scraped_data.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)
    print("Données sauvegardées dans scraped_data.json")


def scrape_idealista():
    """
    Fonction principale pour scraper Idealista.
    """
    print("Lancement du scraping sur Idealista pour la Costa Brava...")
    
    try:
        response = requests.get(BASE_URL, headers=HEADERS)
        # Lève une exception si le statut n'est pas 200
        response.raise_for_status()
        
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # On cible les cartes de chaque annonce
        articles = soup.find_all('article', class_='item')
        
        print(f"Trouvé {len(articles)} annonces sur la première page.")
        
        all_properties = []
        
        for article in articles:
            title_element = article.find('a', class_='item-link')
            price_element = article.find('span', class_='item-price')
            details_elements = article.find_all('span', class_='item-detail')
            
            # Vérification que les éléments existent
            if not all( (title_element, price_element, details_elements) ):
                continue

            title = title_element.get_text(strip=True)
            price = price_element.get_text(strip=True).replace('€', '').replace('.', '').strip()
            link = "https://www.idealista.com" + title_element['href']
            
            surface = None
            rooms = None
            
            if len(details_elements) > 0:
                rooms_text = details_elements[0].get_text(strip=True)
                if 'pièce' in rooms_text:
                    rooms = rooms_text
            
            if len(details_elements) > 1:
                surface_text = details_elements[1].get_text(strip=True)
                if 'm²' in surface_text:
                    surface = surface_text

            # On ne garde que les biens avec un prix et un titre
            if title and price:
                property_data = {
                    "id": article.get('data-adid'),
                    "title": title,
                    "price": int(price) if price.isdigit() else price,
                    "rooms": rooms,
                    "surface": surface,
                    "link": link,
                    "source": "Idealista"
                }
                all_properties.append(property_data)
                
            # Petite pause pour ne pas surcharger le serveur
            time.sleep(0.1)

        if all_properties:
            save_to_supabase(all_properties)
        else:
            print("Aucune annonce n'a pu être extraite. La structure du site a peut-être changé.")

    except requests.exceptions.RequestException as e:
        print(f"Erreur de réseau ou HTTP: {e}")
    except Exception as e:
        print(f"Une erreur inattendue est survenue: {e}")

if __name__ == "__main__":
    scrape_idealista()