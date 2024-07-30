// apiClient.js

const remoteHostUrl = process.env.VITE_GENESIS_API_DEV_URL || "http://localhost:3000";

// Example function to fetch data from the backend
async function fetchData() {
  const response = await fetch(`${remoteHostUrl}/api/data`);
  const data = await response.json();
  return data;
}

export { fetchData };
