import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ItemsContext = createContext();

const ItemsProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [selectedItem, setSelectedItem] = useState();
  const [items, setItems] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);

    if (!userInfo) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <ItemsContext.Provider
      value={{ user, setUser, selectedItem, setSelectedItem, items, setItems }}
    >
      {children}
    </ItemsContext.Provider>
  );
};

export const ItemsState = () => {
  return useContext(ItemsContext);
};

export default ItemsProvider;
