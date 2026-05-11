import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ProductList from "./components/Products/ProductList";
import DetailProduct from "./components/Products/DetailProduct";
import Cart from "./components/Pages/Cart";
import Login from "./components/Pages/Login";
import Signup from "./components/Pages/Signup"; 
import Profile from "./components/Pages/Profile"; 
import Favorites from "./components/Pages/Favorites";


export default function App() {
  return (
    <>
      <div className="app-wrapper" style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Header />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/product" element={<ProductList />} />
            <Route path="/product/:id" element={<DetailProduct />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/favorites" element={<Favorites />} />
            
            <Route path="/quote" element={<div style={{padding: "50px", textAlign: "center"}}><h2>Đang cập nhật bảng giá...</h2></div>} />
            <Route path="/about" element={<div style={{padding: "50px", textAlign: "center"}}><h2>Giới thiệu về Moon VLXD đang được cập nhật...</h2></div>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}