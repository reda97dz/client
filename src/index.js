import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import store from "./store";
import { Provider } from "react-redux";

import GlobalStyles from "./Components/GlobalStyles";
import { StyledEngineProvider } from "@mui/material";

ReactDOM.render(
  <StyledEngineProvider injectfirst>
    <GlobalStyles />
    <Provider store={store}>
      <App />
    </Provider>
  </StyledEngineProvider>,
  document.getElementById("root")
);
