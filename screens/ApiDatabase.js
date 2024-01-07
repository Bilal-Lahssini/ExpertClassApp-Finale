const BASE_URL = 'https://bilal.vaw.be/api.php';

export const loginUser = (email, password) => {
  const requestBody = JSON.stringify({ email, password });

  return fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: requestBody,
  })
  .then((response) => {
    if (!response.ok) {
      // Handle non-2xx HTTP responses
      return response.json().then((errorData) => {
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      });
    }
    return response.json();
  })
  .then((data) => {
    // The API response is returned here
    return data;
  })
  .catch((error) => {
    // Errors are re-thrown to be handled where the function is called
    throw error;
  });
};