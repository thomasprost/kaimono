import React, { useState } from "react";
import AddItemForm from "./components/Forms/AddItemForm";
import EditItemForm from "./components/Forms/EditItemForm";
import ShoppingList from "./components/ShoppingList";
import yuzu from "./images/yuzu.png";

function App() {
  const [editingIndex, setEditingIndex] = useState(null);
  return (
    <div className="container">
      <div className="content">
        <h1 id="main-title">
          <img id="logo" src={yuzu} alt="Logo" /> Shopping List
        </h1>
        <div className="flex-row">
          <div className="flex-large one-fourths side-menu">
            {editingIndex !== null ? (
              <>
                <EditItemForm
                  editingIndex={editingIndex}
                  setEditingIndex={setEditingIndex}
                />
              </>
            ) : (
              <AddItemForm />
            )}
          </div>
          <div className="flex-small three-fourths">
            <ShoppingList setEditingIndex={setEditingIndex} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
