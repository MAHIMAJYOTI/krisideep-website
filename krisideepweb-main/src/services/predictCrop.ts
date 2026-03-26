import { API_BASE_URL } from "../config";


export async function predictCrop() {
  const response = await fetch(`${API_BASE_URL}/predict-crop`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      N: 90,
      P: 42,
      K: 43,
      temperature: 21,
      humidity: 80,
      ph: 6.5,
      rainfall: 200,
      soil_moisture_avg: 30,
    }),
  });

  if (!response.ok) {
    throw new Error("API error");
  }

  return response.json();
}
