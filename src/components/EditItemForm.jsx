import React, { useState, useEffect } from "react";
import { useMutation, useQueryCache, useQuery } from "react-query";

const fetchItemById = async (key, { id }) => {
  console.log(id);

  const res = await fetch(`http://localhost:1337/shopping-items/${id}`);

  return res.json();
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

  const [item, setItem] = useState(data || {});

  useEffect(() => {
    if (editingIndex !== null && data) {
      setItem(data);
    } else {
      setItem({});
    }
  }, [data, editingIndex]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setItem({ ...item, [name]: value });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    setEditingIndex(null);
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
