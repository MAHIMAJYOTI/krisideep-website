import { API_BASE_URL } from "../config";

export async function predictCrop(data: any) {
  const response = await fetch(`${API_BASE_URL}/predict-crop`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("API error");
  }

  return response.json();
}