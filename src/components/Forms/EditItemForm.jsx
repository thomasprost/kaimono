import React, { useState, useEffect } from "react";
import { useMutation, useQueryCache, useQuery } from "react-query";
import { fetchItemById, patchItem } from "../../Queries.js";

const emptyItem = {
  Name: "",
  Quantity: "",
  Info: "",
};

function EditItemForm({ editingIndex, setEditingIndex }) {
  const cache = useQueryCache();

  // Don't attempt to query until editingIndex is truthy
  const { data } = useQuery(["item", { id: editingIndex }], fetchItemById, {
    enabled: editingIndex !== null,
  });

  const [mutate] = useMutation(patchItem, {
    onSuccess: (data) => {
      // Update `items` query when this mutation succeeds
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
    <>
      <h2>Editing {item.Name}</h2>
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
          <br />
          <div className="edit-actions">
            <button onClick={handleFormSubmit}>Update item</button>
            <button onClick={() => setEditingIndex(null)}>Cancel</button>
          </div>
        </form>
      )}
    </>
  );
}

export default EditItemForm;
