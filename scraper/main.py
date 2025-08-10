# scraper/main.py
import requests
from bs4 import BeautifulSoup
import json
import time

# --- CONFIGURATION ---
# REMPLACEZ "VOTRE_CLE_API_SCRAPINGBEE" PAR LA CLÉ DE VOTRE TABLEAU DE BORD SCRAPINGBEE
API_KEY = "V2S0MOATW2NJB0HYJ4ORACE73PQMPD51MQGQEI3MWM6S64CIDYRZ87MI6WQOSHZOL0T59MN8ZGPY30UJ"

# L'URL que nous voulons scraper
TARGET_URL = "https://www.idealista.com/fr/recherche-vente-maisons/costa-brava-gerone/avec-photos/publie-depuis-1-jour/liste-pagina-{}.htm"

def save_data_to_json(data):
    filename = 'idealista_listings_yesterday.json'
    print(f"--- Sauvegarde de {len(data)} biens dans le fichier {filename} ---")
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)
    print("Sauvegarde terminée.")

def scrape_idealista_daily():
    print("Lancement du scraping via le service ScrapingBee (URL corrigée)...")
    
    all_properties = []
    page_number = 1
    
    while True:
        url_to_scrape = TARGET_URL.format(page_number)
        print(f"Demande de la page {page_number} à ScrapingBee...")
        
        try:
            # --- CORRECTION DE L'URL DE L'API ICI ---
            # On utilise 'http' au lieu de 'https', comme indiqué dans certaines de leurs documentations.
            response = requests.get(
                'http://app.scrapingbee.com/api/v1/',
                params={
                    'api_key': API_KEY,
                    'url': url_to_scrape,
                    'premium_proxy': 'true',
                    'country_code': 'es'
                },
                timeout=120 # On augmente le temps d'attente maximum
            )
            
            response.raise_for_status()
            
            soup = BeautifulSoup(response.content, 'html.parser')
            articles = soup.find_all('article', class_='item')
            
            if not articles:
                print(f"Aucune annonce trouvée sur la page {page_number}. Fin du scraping.")
                break
            
            print(f"Trouvé {len(articles)} annonces.")
            
            # (Le reste du code est inchangé)
            for article in articles:
                title_element = article.find('a', class_='item-link')
                price_element = article.find('span', 'item-price')
                if not all((title_element, price_element)): continue
                property_id = article.get('data-adid')
                if any(prop['id'] == property_id for prop in all_properties): continue
                title = title_element.get_text(strip=True)
                price = price_element.get_text(strip=True)
                link = "https://www.idealista.com" + title_element['href']
                surface_text = None
                details_elements = article.find_all('span', class_='item-detail')
                if len(details_elements) > 1: surface_text = details_elements[1].get_text(strip=True)
                property_data = { "id": property_id, "title": title, "price": price, "surface": surface_text, "link": link, "source": "Idealista (Daily)" }
                all_properties.append(property_data)
            
            page_number += 1
            time.sleep(1)

        except requests.exceptions.RequestException as e:
            print(f"Erreur de réseau ou de l'API : {e}")
            break
            
    if all_properties:
        save_data_to_json(all_properties)
    else:
        print("Aucune annonce n'a été trouvée pour la journée d'hier.")

if __name__ == "__main__":
    if "VOTRE_CLE_API" in API_KEY:
        print("ERREUR : Veuillez remplacer 'VOTRE_CLE_API_SCRAPINGBEE' par votre vraie clé dans le fichier main.py")
    else:
        scrape_idealista_daily()