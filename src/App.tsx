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
          <Route path="/t1-goods4you" element={<Home />} />
          <Route path="/staff" element={<Products />} />
          <Route path="/item" element={<Item />} />
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
