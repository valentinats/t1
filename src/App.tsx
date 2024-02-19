import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Catalog from "./components/Catalog/Catalog";
import About from "./components/About/About";
import Quiz from "./components/Quiz/Quiz";
import Team from "./components/Team/Team";
import FAQ from "./components/FAQ/FAQ";
import Footer from "./components/Footer/Footer";
import "./components/Burger/Burger.css";
import Products from "./pages/Products";
import Item from "./pages/Item";
 
class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/t1/" element={<Home />} />
          <Route path="/t1/staff" element={<Products />} />
          <Route path="/t1/item" element={<Item />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

function Home() {
  return (
    <div>
      <Header />
      <Catalog />
      <About />
      <Quiz />
      <Team />
      <FAQ />
      <Footer />
    </div>
  );
}

export default App;
