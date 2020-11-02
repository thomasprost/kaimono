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
  const { status, data, isFetching, error, failureCount, refetch } = useQuery(
    ["item", { id: editingIndex }],
    fetchItemById,
    {
      enabled: editingIndex !== null,
    }
  );

  const [mutate, mutationState] = useMutation(patchItem, {
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
          <button className="muted-button" onClick={handleFormSubmit}>
            Update item
          </button>
          <button
            className="muted-button"
            onClick={() => setEditingIndex(null)}
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  );
}

export default EditItemForm;
