import React from "react";
import ReactDOM from "react-dom";
import { store } from "./app/store";
import { Provider } from "react-redux";

import App from "./App";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
