const url_base = import.meta.env.VITE_API_URL;
export const list = (username) => {
  return fetch(url_base + `users/${username}/bills`).then((res) => res.json());
};

export const newTransaction = (username, data) => {
  const params = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };
  return fetch(url_base + `users/${username}/bills`, params).then((res) =>
    res.json()
  );
};

export const delTransaction = (username, billId) => {
  const params = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };
  return fetch(url_base + `users/${username}/bills/${billId}`, params).then(
    (res) => res.json()
  );
};
