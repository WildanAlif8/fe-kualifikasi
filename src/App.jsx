import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Default from "./Layouts/Default";
import Home from "./Pages/Home";
import Penjualan from "./Pages/Penjualan";
import Barang from "./Pages/Barang";
import Pelanggan from "./Pages/Pelanggan";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Default />}>
          <Route index element={<Home />} />
          <Route path="/pelanggan" element={<Pelanggan />} />
          <Route path="/barang" element={<Barang />} />
          <Route path="/penjualan" element={<Penjualan />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
