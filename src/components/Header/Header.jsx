import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Header.css';
import logoImage from '../../img/logo.png'; 

const Header = () => {
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);
  
  const navigate = useNavigate();
  const location = useLocation(); 

  useEffect(() => {
    const updateCartCount = () => {
      const savedCart = localStorage.getItem('cart');
      if (!savedCart) {
        setCartCount(0);
      } else {
        try {
          const cart = JSON.parse(savedCart);
          const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
          setCartCount(totalItems);
        } catch (error) {
          console.error('Lỗi đọc giỏ hàng:', error);
          setCartCount(0);
        }
      }
    };

    const updateCurrentUser = () => {
      const savedUser = localStorage.getItem('currentUser');
      if (!savedUser) {
        setCurrentUser(null);
        return;
      }
      try {
        const user = JSON.parse(savedUser);
        setCurrentUser(user);
      } catch (error) {
        console.error('Lỗi đọc thông tin người dùng:', error);
        setCurrentUser(null);
      }
    };

    updateCartCount();
    updateCurrentUser();

    window.addEventListener('cartUpdated', updateCartCount);
    window.addEventListener('userUpdated', updateCurrentUser);
    window.addEventListener('storage', () => {
      updateCartCount();
      updateCurrentUser();
    });

    return () => {
      window.removeEventListener('cartUpdated', updateCartCount);
      window.removeEventListener('userUpdated', updateCurrentUser);
    };
  }, []);

  const categoriesMenuItems = [
    { text: 'Cát, Đá, Xi măng', href: '/categories/1' },
    { text: 'Sắt Thép Xây Dựng', href: '/categories/2' },
    { text: 'Gạch Xây Các Loại', href: '/categories/3' },
    { text: 'Gạch Ốp Lát', href: '/categories/4' },
    { text: 'Sơn & Chống Thấm', href: '/categories/5' },
    { text: 'Thiết Bị Điện', href: '/categories/6' },
    { text: 'Ống Nước & Phụ Kiện', href: '/categories/7' },
    { text: 'Thiết Bị Vệ Sinh', href: '/categories/8' },
    { text: 'Nhôm Kính', href: '/categories/9' },
    { text: 'Thạch Cao & Keo Bả', href: '/categories/10' }
  ];

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <header className="moonbuild-header">
      <div className="header-top-bar">
        <div className="header-top-content">
          
          <div className="header-delivery-info">
            <span className="delivery-text">Tư Vấn 24/7</span>
            <span className="delivery-icon">📞</span>
            <span className="delivery-phone">1900 1234</span>
          </div>

          <div className="header-logo-container">
            <div className="moonbuild-logo" onClick={() => navigate('/')}>
              <img src={logoImage} alt="MoonBuild Logo" className="header-logo-image" />
            </div>
          </div>

          <div className="header-user-actions">
            <button className="login-link" onClick={() => navigate('/login')}>
              {currentUser ? (currentUser.name || currentUser.user) : 'Đăng nhập'}
            </button>
            <span className="action-separator">|</span>
            <button className="cart-button" onClick={() => navigate('/cart')}>
              <span>Giỏ hàng</span>
              <span className="cart-badge">{cartCount}</span>
            </button>
          </div>
        </div>
      </div>

      <nav className="header-navigation">
        <div className="nav-content">
          <span className={`nav-link ${isActive('/')}`} onClick={() => navigate('/')}>
            TRANG CHỦ
          </span>

          <span className={`nav-link ${isActive('/products')}`} onClick={() => navigate('/products')}>
            SẢN PHẨM
          </span>

          <div 
            className="nav-item-with-dropdown"
            onMouseEnter={() => setHoveredMenu('categories')}
            onMouseLeave={() => setHoveredMenu(null)}
          >
            <span className={`nav-link ${isActive('/categories')}`} onClick={() => navigate('/categories')}>
              DANH MỤC ▾
            </span>
            {hoveredMenu === 'categories' && (
              <div className="dropdown-menu">
                {categoriesMenuItems.map((item, index) => (
                  <span 
                    key={index}
                    onClick={() => navigate(item.href)}
                    className="dropdown-item"
                  >
                    {item.text}
                  </span>
                ))}
              </div>
            )}
          </div>

          <span className={`nav-link ${isActive('/contact')}`} onClick={() => navigate('/contact')}>
            LIÊN HỆ
          </span>
        </div>
      </nav>
    </header>
  );
};

export default Header;