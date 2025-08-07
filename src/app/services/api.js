const BASE_URL = "http://127.0.0.1:8000/api"

export async function fetchApi(endpoint, options = {}) {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
        headers: {"Content-Type": "application/json"},
        ...options,
    });

    if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
    }
    return response.json();
}