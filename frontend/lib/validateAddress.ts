// lib/validateAddress.ts
export const validateAddress = async (line1: string, postalCode: string, city: string, country: string) => {
  const query = `${line1}, ${postalCode}, ${city}, ${country}`;
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json`;

  try {
    const res = await fetch(url, {
      headers: {
        "Accept-Language": "en", // pour des résultats cohérents
      },
    });
    const data = await res.json();
    return data.length > 0; // ✅ adresse valide si des résultats sont trouvés
  } catch (error) {
    console.error("Nominatim error:", error);
    return false;
  }
};
