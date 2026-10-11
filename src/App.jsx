import React from "react";
import "./App.css";

import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Banner from "./Components/Banner/Banner";
import DisplayRow from "./Components/DisplayRow/DisplayRow";

function App() {
  return (
    <>
      <Header />
      <Banner />
      <DisplayRow />
      <Footer />
    </>
  );
}

export default App;
