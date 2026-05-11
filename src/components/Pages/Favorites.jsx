import React, { useState, useEffect } from "react";
import ProductCard from "../Products/ProductCard";
import "../Products/ProductList.css"; // Tái sử dụng CSS của danh sách sản phẩm

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const loadFavorites = () => {
      const savedFavs = JSON.parse(localStorage.getItem("favorites")) || [];
      setFavorites(savedFavs);
    };
    
    loadFavorites();
    window.addEventListener("favoritesUpdated", loadFavorites);
    return () => window.removeEventListener("favoritesUpdated", loadFavorites);
  }, []);

  return (
    <div className="product-list-container">
      <div className="product-list-layout" style={{ display: 'block' }}>
        <h2 style={{ marginBottom: "24px", color: "#1e293b", fontSize: "24px" }}>
          Sản phẩm yêu thích ({favorites.length})
        </h2>
        
        {favorites.length === 0 ? (
          <div className="product-list-empty">
            <p>Bạn chưa có sản phẩm yêu thích nào.</p>
          </div>
        ) : (
          <div className="product-list">
            {favorites.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;