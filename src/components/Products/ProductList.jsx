import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import { imageMap } from "../../utils/productImages";
import "./ProductList.css";

const PRODUCTS_PER_PAGE = 6;
const jsonBase = import.meta.env.BASE_URL || "/";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  // Lấy các tham số từ URL (?category=... & search=...)
  const searchParams = new URLSearchParams(location.search);
  const categoryQuery = searchParams.get("category");
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";

  // 1. Tải dữ liệu từ JSON
  useEffect(() => {
    const loadData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          fetch(`${jsonBase}product.json`),
          fetch(`${jsonBase}category.json`),
        ]);

        if (!productsRes.ok) throw new Error("Không thể tải dữ liệu sản phẩm");

        const data = await productsRes.json();
        const mappedProducts = data.map((item) => ({
          ...item,
          image: imageMap[item.imageKey] || item.image,
        }));

        setProducts(mappedProducts);

        if (categoriesRes.ok) {
          const catData = await categoriesRes.json();
          setCategories(Array.isArray(catData) ? catData : []);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  // 2. ĐỒNG BỘ: Khi URL thay đổi (bấm từ Header), cập nhật State để lọc sản phẩm
  useEffect(() => {
    if (categoryQuery) {
      setSelectedCategoryId(categoryQuery);
    } else {
      setSelectedCategoryId(null);
    }
    setCurrentPage(1); // Reset về trang 1 khi đổi danh mục
  }, [categoryQuery]);

  // 3. Hàm xử lý khi bấm vào Sidebar: Chuyển hướng URL thay vì chỉ set State
  const handleCategoryClick = (id) => {
    if (id) {
      // Giữ lại search query nếu có khi đổi danh mục (tùy chọn)
      navigate(`/product?category=${id}`);
    } else {
      navigate("/product");
    }
  };

  // 4. Logic lọc sản phẩm (Kết hợp cả Danh mục và Tìm kiếm)
  const filteredProducts = products.filter((p) => {
    const matchCategory =
      selectedCategoryId == null ||
      String(p.categoryid) === String(selectedCategoryId);
    
    const matchSearch = (p.name || "").toLowerCase().includes(searchQuery);
    
    return matchCategory && matchSearch;
  });

  // 5. Phân trang
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const start = (safePage - 1) * PRODUCTS_PER_PAGE;
  const visibleProducts = filteredProducts.slice(start, start + PRODUCTS_PER_PAGE);

  const goPrev = () => setCurrentPage((p) => Math.max(1, p - 1));
  const goNext = () => setCurrentPage((p) => Math.min(totalPages, p + 1));

  if (isLoading) return <div className="product-list-container">Đang tải sản phẩm...</div>;
  if (error) return <div className="product-list-container">Lỗi: {error}</div>;

  return (
    <div className="product-list-container">
      <div className="product-list-layout">
        {/* Sidebar Danh mục */}
        <aside className="product-list-sidebar">
          <h2 className="product-list-sidebar__title">Danh mục</h2>
          <ul className="product-list-sidebar__list">
            <li>
              <button
                className={`product-list-sidebar__btn ${selectedCategoryId == null ? "product-list-sidebar__btn--active" : ""}`}
                onClick={() => handleCategoryClick(null)}
              >
                Tất cả
              </button>
            </li>
            {categories.map((cat) => (
              <li key={cat.id}>
                <button
                  className={`product-list-sidebar__btn ${String(selectedCategoryId) === String(cat.id) ? "product-list-sidebar__btn--active" : ""}`}
                  onClick={() => handleCategoryClick(cat.id)}
                >
                  {cat.name}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Danh sách sản phẩm chính */}
        <div className="product-list-main">
          {/* Hiện trạng thái tìm kiếm */}
          {searchQuery && (
            <div className="search-status" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3>Kết quả tìm kiếm cho: <span style={{ color: '#f59e0b' }}>"{searchQuery}"</span></h3>
              <button 
                onClick={() => navigate("/product")}
                style={{ background: '#fee2e2', color: '#dc2626', border: 'none', padding: '8px 15px', borderRadius: '8px', cursor: 'pointer' }}
              >
                ✕ Xóa tìm kiếm
              </button>
            </div>
          )}

          {filteredProducts.length === 0 ? (
            <div className="product-list-empty">
              <p>Không tìm thấy sản phẩm nào phù hợp.</p>
              <button className="back-home-btn" onClick={() => navigate("/product")}>Xem tất cả sản phẩm</button>
            </div>
          ) : (
            <>
              <div className="product-list">
                {visibleProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              
              {filteredProducts.length > PRODUCTS_PER_PAGE && (
                <div className="product-list-pagination">
                  <button className="product-list-pagination__btn" onClick={goPrev} disabled={safePage <= 1}>← Trước</button>
                  <span className="product-list-pagination__info">Trang {safePage} / {totalPages}</span>
                  <button className="product-list-pagination__btn" onClick={goNext} disabled={safePage >= totalPages}>Sau →</button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;