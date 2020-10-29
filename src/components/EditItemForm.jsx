import React, { useState, useEffect } from "react";
import { useMutation, useQueryCache, useQuery } from "react-query";

const fetchItemById = async (key, { id }) => {

  const res = await fetch(`http://localhost:1337/shopping-items/${id}`);

  return res.json();
};

const emptyItem = {
  "Name" : "",
  "Quantity": "",
  "Info": ""
}

const patchItem = async (body) => {  
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
      `http://localhost:1337/shopping-items/${body.id}`,
      settings
    );
    const data = await fetchResponse.json();
    return data;
  } catch (e) {
    return e;
  }
};

function EditItemForm({ editingIndex, setEditingIndex }) {
  const cache = useQueryCache();

  // Don't attempt to query until editingIndex is truthy
  const { status, data, isFetching, error, failureCount, refetch } = useQuery(
    ["item", { id: editingIndex }],
    fetchItemById,
    {
      enabled: editingIndex !== null,
    }
  );

  const [mutate, mutationState] = useMutation(patchItem, {
    onSuccess: (data) => {
      // Update `todos` and the individual todo queries when this mutation succeeds
      cache.invalidateQueries("shopping");
      cache.setQueryData(["item", { id: editingIndex }], data);
      setEditingIndex(null);
    },
  });

  const [item, setItem] = useState(data || emptyItem);

  useEffect(() => {
    if (editingIndex !== null && data) {
      setItem(data);
    } else {
      setItem(emptyItem);
    }    
  }, [data, editingIndex]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setItem({ ...item, [name]: value });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    mutate(item);
  };


  return (
    <div>
      <h2>Edit an Item</h2>
      {item && (
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
          <button onClick={handleFormSubmit}>Update item</button>
          <button onClick={() => setEditingIndex(null)}>Cancel</button>
        </form>
      )}
    </div>
  );
}

export default EditItemForm;
