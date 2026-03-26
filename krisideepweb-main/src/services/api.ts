import { API_BASE_URL } from "../config";

export async function predictCrop(payload: {
  N: number;
  P: number;
  K: number;
  temperature: number;
  humidity: number;
  ph: number;
  rainfall: number;
  soil_moisture_avg: number;
}) {
  const response = await fetch(`${API_BASE_URL}/predict-crop`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Crop prediction API error");
  }

  return response.json();
}
