import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import ItemsProvider from "./Context/ItemsProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ItemsProvider>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </ItemsProvider>
  </BrowserRouter>
);
