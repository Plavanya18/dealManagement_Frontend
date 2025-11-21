const API_URL = "http://localhost:3000";

function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export async function fetchDeals() {
  try {
    const response = await fetch(`${API_URL}/deal`, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      console.error("Failed to fetch deals:", response.status);
      return [];
    }

    const result = await response.json();
    return result?.data || [];

  } catch (error) {
    console.error("Error fetching deals:", error);
    return [];
  }
}
