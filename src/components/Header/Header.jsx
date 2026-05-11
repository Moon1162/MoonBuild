import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Header.css';
import logoImage from '../../img/logo.png';

const Header = () => {
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [favCount, setFavCount] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const updateHeaderData = () => {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        try {
          const cart = JSON.parse(savedCart);
          const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
          setCartCount(totalItems);
        } catch (e) { setCartCount(0); }
      } else { setCartCount(0); }

      const favs = JSON.parse(localStorage.getItem('favorites')) || [];
      setFavCount(favs.length);

      const savedUser = localStorage.getItem('currentUser');
      if (savedUser) {
        try { setCurrentUser(JSON.parse(savedUser)); } 
        catch (e) { setCurrentUser(null); }
      } else { setCurrentUser(null); }
    };

    updateHeaderData();

    window.addEventListener('cartUpdated', updateHeaderData);
    window.addEventListener('userUpdated', updateHeaderData);
    window.addEventListener('favoritesUpdated', updateHeaderData);
    window.addEventListener('storage', updateHeaderData);

    return () => {
      window.removeEventListener('cartUpdated', updateHeaderData);
      window.removeEventListener('userUpdated', updateHeaderData);
      window.removeEventListener('favoritesUpdated', updateHeaderData);
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/product?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const ximangMenuItems = [
    { text: 'Xi măng Hà Tiên', to: '/product?search=hà%20tiên' },
    { text: 'Xi măng Holcim', to: '/product?search=holcim' },
    { text: 'Xi măng INSEE', to: '/product?search=insee' },
    { text: 'Xi măng Nghi Sơn', to: '/product?search=nghi%20sơn' },
    { text: 'Xi măng Vicem', to: '/product?search=vicem' }
  ];

  return (
    <header className="main-header">
      <div className="header-top-strip">
        <div className="header-container strip-content">
          <div className="strip-left">
            <i className="fas fa-truck"></i> Giao hàng tận nơi
            <span className="strip-divider">|</span>
            <i className="fas fa-phone-alt"></i> Hotline: <strong>1800 6779</strong>
          </div>
          <div className="strip-right">
            <span className="lang-active">VN</span>
            <span className="strip-divider">|</span>
            <span className="lang-option">EN</span>
          </div>
        </div>
      </div>

      <div className="header-main-bar">
        <div className="header-container main-bar-content">
          <Link to="/" className="header-logo">
            <img src={logoImage} alt="Moon VLXD Logo" />
          </Link>

          <form className="header-search-form" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Tìm kiếm xi măng, sắt thép, gạch đá..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-button">
              <i className="fas fa-search"></i>
            </button>
          </form>

          <div className="header-user-actions">
            <div className="action-item" onClick={() => navigate(currentUser ? '/profile' : '/login')}>
              <i className="far fa-user action-icon"></i>
              <div className="action-text">
                <span className="action-title">Tài khoản</span>
                <span className="action-desc">{currentUser ? (currentUser.name || currentUser.user) : 'Đăng nhập'}</span>
              </div>
            </div>

            <div className="action-item" onClick={() => navigate('/favorites')}>
              <div className="cart-icon-wrapper">
                <i className="far fa-heart action-icon"></i>
                {favCount > 0 && <span className="cart-badge">{favCount}</span>}
              </div>
              <div className="action-text">
                <span className="action-title">Yêu thích</span>
                <span className="action-desc">Đã lưu</span>
              </div>
            </div>

            <div className="action-item cart-action" onClick={() => navigate('/cart')}>
              <div className="cart-icon-wrapper">
                <i className="fas fa-shopping-cart action-icon"></i>
                {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
              </div>
              <div className="action-text">
                <span className="action-title">Giỏ hàng</span>
                <span className="action-desc">Sản phẩm</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <nav className="header-navigation">
        <div className="header-container nav-content">
          <Link to="/" className="nav-link">TRANG CHỦ</Link>
          
          <div
            className="nav-item-with-dropdown"
            onMouseEnter={() => setHoveredMenu('ximang')}
            onMouseLeave={() => setHoveredMenu(null)}
          >
            <Link to="/product?category=1" className={`nav-link ${hoveredMenu === 'ximang' ? 'active' : ''}`}>
              XI MĂNG <i className="fas fa-chevron-down nav-arrow"></i>
            </Link>
            {hoveredMenu === 'ximang' && (
              <div className="dropdown-menu">
                {ximangMenuItems.map((item, index) => (
                  <Link key={index} to={item.to} className="dropdown-item">{item.text}</Link>
                ))}
              </div>
            )}
          </div>

          <Link to="/product?category=2" className="nav-link">SẮT THÉP</Link>
          <Link to="/product?category=3" className="nav-link">GẠCH ĐÁ</Link>
          <Link to="/product" className="nav-link">TẤT CẢ SẢN PHẨM</Link>
          <Link to="/quote" className="nav-link">BÁO GIÁ</Link>
          <Link to="/about" className="nav-link">VỀ MOON</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;