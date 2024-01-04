import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import { makeStyles } from "@material-ui/core";
import ContextProvider from "./provider/ContextProvider";

function App() {
  const useStyles = makeStyles(() => ({
    App: {
      backgroundColor: "#14161a",
      color: "white",
      minHeight: "100vh",
    },
  }));

  const classes = useStyles();

  return (
    <div className={classes.App}>
      <ContextProvider>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
        </Routes>
      </ContextProvider>
    </div>
  );
};

export default App;
