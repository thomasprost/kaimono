import React, { useEffect, useState } from "react";
import AddItemForm from "./components/AddItemForm";
import EditItemForm from "./components/EditItemForm";
import ShoppingList from "./components/ShoppingList";
import People from "./components/People";
import { useQuery } from "react-query";

const fetchShoppingItems = async () => {
  const res = await fetch("http://localhost:1337/shopping-items");

  return res.json();
};

function App() {
  const { data } = useQuery("peoples", fetchShoppingItems);

  // State Hooks
  const [shoppingList, setList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  // const [currentItem, setCurrentItem] = useState(initialFormState);

  const addItem = (item) => {
    item.id = shoppingList.length + 1;
    setList([...shoppingList, item]);
  };

  const removeItem = (id) => {
    setList(shoppingList.filter((item) => item.id !== id));
  };

  const updateItem = (id, updatedItem) => {
    setList(shoppingList.map((i) => (i.id === id ? updatedItem : i)));
  };

  useEffect(() => {
    if (data) {
      setList(data);
      console.log(shoppingList);
    } else {
      setList([]);
    }
  }, [data]);

  return (
    <div className="container">
      <header className="app-header">Yooo pelo</header>
      <div className="content">
        {/* <People data={data} status={status} /> */}
        <ShoppingList
          list={shoppingList}
          removeItem={removeItem}
          setEditingIndex={setEditingIndex}
        />
        {editingIndex !== null ? (
          <>
            <EditItemForm
              data={shoppingList}
              updateItem={updateItem}
              editingIndex={editingIndex}
              setEditingIndex={setEditingIndex}
            />
            <hr />
          </>
        ) : null}
        <AddItemForm addItem={addItem} />
      </div>
    </div>
  );
}

export default App;
