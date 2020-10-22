import React, { useEffect, useState } from "react";
import AddItemForm from "./components/AddItemForm";
import EditItemForm from "./components/EditItemForm";
import ShoppingList from "./components/ShoppingList";
import People from "./components/People";
import { useQuery } from "react-query";

const fetchPeoples = async () => {
  const res = await fetch("http://swapi.dev/api/people/");

  return res.json();
};

function App() {
  // Inital Data
  const initialList = [
    {
      id: 1,
      name: "banana",
      quantity: "1 Pack",
      info: null,
    },
    {
      id: 2,
      name: "apples",
      quantity: "2",
      info: "yellow ones",
    },
    {
      id: 3,
      name: "にんにく",
      quantity: "1",
      info: "国産",
    },
  ];
  const initialFormState = { id: null, name: "", quantity: "", info: "" };

  const { data, status } = useQuery("peoples", fetchPeoples);

  // State Hooks
  const [shoppingList, setList] = useState(initialList);
  const [editing, setEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState(initialFormState);

  const editRow = (item) => {
    setEditing(true);

    setCurrentItem({ id: item.id, name: item.name, quantity: item.quantity });
  };

  const addItem = (item) => {
    item.id = shoppingList.length + 1;
    setList([...shoppingList, item]);
  };

  const removeItem = (id) => {
    setList(shoppingList.filter((item) => item.id !== id));
  };

  const updateItem = (id, updatedItem) => {
    setEditing(false);

    setList(shoppingList.map((item) => (item.id === id ? updatedItem : item)));
  };

  return (
    <div className="container">
      <header className="app-header">Yooo pelo</header>
      <div className="content">
        <People data={data} status={status} />
        <ShoppingList
          list={shoppingList}
          removeItem={removeItem}
          editRow={editRow}
          setEditing={setEditing}
        />
        {editing ? (
          <EditItemForm
            currentItem={currentItem}
            setEditing={setEditing}
            updateItem={updateItem}
          />
        ) : (
          <AddItemForm addItem={addItem} />
        )}
      </div>
    </div>
  );
}

export default App;
