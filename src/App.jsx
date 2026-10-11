import React from "react";
import "./App.css";

import Header from "./Components/Header/header";
import Footer from "./Components/Footer/footer";
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
