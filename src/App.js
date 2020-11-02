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
        <div className="flex-row">
          <div className="flex-large one-fourths">
            <AddItemForm />
          </div>
          <div className="flex-large three-fourths">
            <ShoppingList setEditingIndex={setEditingIndex} />
            {editingIndex !== null ? (
              <>
                <EditItemForm
                  editingIndex={editingIndex}
                  setEditingIndex={setEditingIndex}
                />
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
