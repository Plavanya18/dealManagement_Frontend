const API_URL = "http://localhost:3000";

function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export async function fetchBranches({ page = 1, limit = 10, search } = {}) {
  try {
    const params = { page, limit };

    if (search) params.search = search;

    const queryString = new URLSearchParams(params).toString();

    const response = await fetch(`${API_URL}/branch?${queryString}`, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      console.error("Failed to fetch branches:", response.status);
      return [];
    }

    const result = await response.json();
    return result?.data || [];

  } catch (error) {
    console.error("Error fetching branches:", error);
    return [];
  }
}
