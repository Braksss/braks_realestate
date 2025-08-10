
export async function fetchProperties(bounds) {
  try {
    // TODO : remplacer par l’URL de l’API réelle + clé si nécessaire.
    const url = '/api/properties';
    const response = await fetch(url, { method: 'GET' });
    if (!response.ok) {
      throw new Error(`Property API returned HTTP ${response.status}`);
    }
    const data = await response.json();
    return Array.isArray(data.properties) ? data.properties : [];
  } catch (err) {
    console.warn('Failed to fetch properties', err);
    return [];
  }
}
