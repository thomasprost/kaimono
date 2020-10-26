import React, { useState } from "react";
import { useMutation, useQueryCache } from "react-query";

const postItem = async (body) => {
  const settings = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
  try {
    const fetchResponse = await fetch(
      `http://localhost:1337/shopping-items`,
      settings
    );
    const data = await fetchResponse.json();
    return data;
  } catch (e) {
    return e;
  }
};

function AddItemForm(props) {
  const cache = useQueryCache();
  const initialFormState = { Name: "", Quantity: "", Info: "" };
  const [item, setItem] = useState(initialFormState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setItem({ ...item, [name]: value });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    mutate(item);
    setItem(initialFormState);
  };

  const [mutate, { status, error }] = useMutation(postItem, {
    onSuccess: () => {
      cache.invalidateQueries("shopping");
    },
  });

  return (
    <div>
      <h2>Add an Item</h2>
      <form onSubmit={handleFormSubmit}>
        <label>Name</label>
        <input
          type="text"
          name="Name"
          value={item.Name}
          onChange={handleInputChange}
        />
        <label>Quantity</label>
        <input
          type="text"
          name="Quantity"
          value={item.Quantity}
          onChange={handleInputChange}
        />
        <label>Info</label>
        <input
          type="text"
          name="Info"
          value={item.Info}
          onChange={handleInputChange}
        />
        <button onClick={handleFormSubmit}>Add item</button>
      </form>
    </div>
  );
}

export default AddItemForm;
