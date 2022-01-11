import React from "react";
import { Provider } from "react-redux";
import configureStore from "./src/store";
import Root from "./src/components/Root";

const App = () => {
  return (
    <Provider store={configureStore()}>
      <Root />
    </Provider>
  );
};

export default App;
