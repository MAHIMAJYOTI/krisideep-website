import { API_BASE_URL } from "../config";


export async function predictDisease(image: File) {
  const formData = new FormData();
  formData.append("file", image);

  const response = await fetch(`${API_BASE_URL}/predict-disease`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Disease detection API error");
  }

  return response.json();
}
