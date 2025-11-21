const API_URL = "http://localhost:3000";

function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export async function fetchDeals({
  search,
  baseCurrencyCode,
  quoteCurrencyCode,
  startDate,
  endDate,
  dealType,
  statusName,
  downloadreport,
  exportType,
} = {}) {
  try {
    const params = {};

    if (search) params.search = search;
    if (baseCurrencyCode) params.baseCurrencyCode = baseCurrencyCode;
    if (quoteCurrencyCode) params.quoteCurrencyCode = quoteCurrencyCode;
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
    if (dealType) params.dealType = dealType;
    if (statusName) params.statusName = statusName;
    if (downloadreport !== undefined) params.downloadreport = downloadreport;
    if (exportType) params.exportType = exportType;

    const queryString = new URLSearchParams(params).toString();

    const response = await fetch(`${API_URL}/deal?${queryString}`, {
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
