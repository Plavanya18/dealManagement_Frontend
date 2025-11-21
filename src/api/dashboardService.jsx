const API_URL = "http://localhost:3000";

function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export async function fetchDashboardData() {
  try {
    const response = await fetch(`${API_URL}/data`, {
      method: "GET",
      headers: getAuthHeaders(),
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("Failed to fetch dashboard:", response.status);
      return null;
    }

    const result = await response.json();
    return result?.data || null;

  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return null;
  }
}
