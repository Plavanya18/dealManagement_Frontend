const API_URL = "http://localhost:3000"; 

function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

/**
 * Fetch users from API with pagination and sorting
 * @param {Object} options
 * @param {number} options.page - page number
 * @param {number} options.limit - items per page
 * @param {string} options.orderBy - field to sort by
 * @param {string} options.direction - sort direction ("asc" or "desc")
 * @returns {Promise<Array>} array of users
 */
export async function fetchUsers({ page = 1, limit = 10, orderBy = "full_name", direction = "asc" } = {}) {
  try {
    const params = { page, limit, orderBy, direction };
    const queryString = new URLSearchParams(params).toString();

    const response = await fetch(`${API_URL}/user?${queryString}`, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      console.error("Failed to fetch users:", response.status);
      return [];
    }

    const result = await response.json();
    return result?.data || [];

  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}
