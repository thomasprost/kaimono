import React, { useState } from "react";
import AddItemForm from "./components/Forms/AddItemForm";
import EditItemForm from "./components/Forms/EditItemForm";
import ShoppingList from "./components/ShoppingList";

function App() {
  const [editingIndex, setEditingIndex] = useState(null);
  return (
    <div className="container">
      <div className="content">
        <h1 className="text-center">Shopping List</h1>
        <ShoppingList setEditingIndex={setEditingIndex} />
        {editingIndex !== null ? (
          <>
            <EditItemForm
              editingIndex={editingIndex}
              setEditingIndex={setEditingIndex}
            />
            <hr />
          </>
        ) : null}
        <AddItemForm />
      </div>
    </div>
  );
}

export default App;
