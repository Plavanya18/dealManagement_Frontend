const API_URL = "http://localhost:3000";

function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export async function fetchFxRate({ page = 1, limit = 1, orderBy = "created_at" } = {}) {
  try {
    const params = { page, limit, orderBy };
    const queryString = new URLSearchParams(params).toString();

    const response = await fetch(`${API_URL}/fxrate?${queryString}`, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      console.error("Failed to fetch fxrate:", response.status);
      return [];
    }

    const result = await response.json();
    return result?.data || [];

  } catch (error) {
    console.error("Error fetching fxrate:", error);
    return [];
  }
}
