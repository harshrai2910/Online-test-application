const API_URL = import.meta.env.VITE_API_URL;

export const testQuestionsFromServer = async () => {
  const response = await fetch(`${API_URL}/api/test/send`, {
    credentials: "include",
  });

  return await response.json();
};

export const verifyResultFromServer = async (data) => {
  const response = await fetch(`${API_URL}/api/test/verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  const result = await response.json();
  return result;
};

export const testHistoryFromServer = async () => {
  const response = await fetch(`${API_URL}/api/test/history`, {
    credentials: "include",
  });

  return await response.json();
};
