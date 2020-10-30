import React, { useState } from "react";
import AddItemForm from "./components/Forms/AddItemForm";
import EditItemForm from "./components/Forms/EditItemForm";
import ShoppingList from "./components/ShoppingList";

function App() {
  const [editingIndex, setEditingIndex] = useState(null);
  return (
    <div className="container">
      <header className="app-header">Yooo pelo</header>
      <div className="content">
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
