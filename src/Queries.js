const apiUrl = process.env.REACT_APP_API_URL;

// Fetch All

export const fetchShoppingItems = async () => {
  const res = await fetch(`${apiUrl}shopping-items`);
  console.log(res);

  return res.json();
};

// Fetch One
export const fetchItemById = async (key, { id }) => {
  const res = await fetch(`${apiUrl}shopping-items/${id}`);

  return res.json();
};

// Create
export const postItem = async (body) => {
  const settings = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
  try {
    const fetchResponse = await fetch(`${apiUrl}shopping-items`, settings);
    const data = await fetchResponse.json();
    return data;
  } catch (e) {
    return e;
  }
};

// Update
export const patchItem = async (body) => {
  const settings = {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
  try {
    const fetchResponse = await fetch(
      `${apiUrl}shopping-items/${body.id}`,
      settings
    );
    const data = await fetchResponse.json();
    return data;
  } catch (e) {
    return e;
  }
};

// Delete
export const deleteItem = async (id) => {
  const settings = {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  try {
    const fetchResponse = await fetch(
      `${apiUrl}shopping-items/${id}`,
      settings
    );
    const data = await fetchResponse.json();
    return data;
  } catch (e) {
    return e;
  }
};
