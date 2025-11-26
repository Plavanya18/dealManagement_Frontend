const API_URL = "http://localhost:3000";

function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export async function fetchCustomers({
  page = 1,
  limit = 10,
  search = "",
  status = ""
} = {}) {

  try {
    const params = { page, limit, search, status };
    const queryString = new URLSearchParams(params).toString();

    const response = await fetch(`${API_URL}/customer?${queryString}`, {
      method: "GET",
      headers: getAuthHeaders(),
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("Failed to fetch customers:", response.status);
      return { data: [], pagination: { totalPages: 1 } };
    }

    const result = await response.json();

    return {
      data: result.data || [],
      pagination: result.pagination || { totalPages: 1 },
    };

  } catch (error) {
    console.error("Error fetching customers:", error);
    return { data: [], pagination: { totalPages: 1 } };
  }
}

export async function fetchCustomerById(id) {
  try {
    const response = await fetch(`${API_URL}/customer/${id}`, {
      method: "GET",
      headers: getAuthHeaders(),
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("Failed to fetch customer:", response.status);
      return null;
    }

    const result = await response.json();
    return result || null;

  } catch (error) {
    console.error("Error fetching customer:", error);
    return null;
  }
}
