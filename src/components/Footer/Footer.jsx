import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import logo from '../../img/logo.png';

const Footer = () => {
  return (
    <footer className="highlands-footer">
      <div className="footer-green-strip"></div>
      <div className="footer-content">
        
        <div className="footer-left">
          <div className="footer-logo">
            <img src={logo} alt="Moon VLXD" className="footer-logo-img" />
          </div>
          <p className="footer-copyright">
            ©2026 Moon Vật Liệu Xây Dựng.<br/>All rights reserved.
          </p>
        </div>

        <div className="footer-middle">
          <div className="footer-column">
            <h3 className="footer-column-title">VỀ CHÚNG TÔI</h3>
            <ul className="footer-links">
              <li><Link to="/about">Giới thiệu Moon</Link></li>
              <li><Link to="/policy">Chính sách bảo hành</Link></li>
              <li><Link to="/return">Chính sách đổi trả</Link></li>
              <li><Link to="/contact">Liên hệ hợp tác</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3 className="footer-column-title">HỆ THỐNG PHÂN PHỐI</h3>
            <ul className="footer-links">
              <li><Link to="/stores">Hệ thống kho bãi</Link></li>
              <li><Link to="/delivery">Chính sách vận chuyển</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3 className="footer-column-title">BÁO GIÁ</h3>
            <ul className="footer-links">
              <li><Link to="/price/ximang">Bảng giá Xi Măng</Link></li>
              <li><Link to="/price/satthep">Bảng giá Sắt Thép</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-right">
          <h3 className="footer-column-title">KẾT NỐI VỚI MOON</h3>
          <div className="footer-social-icons">
            <a href="https://facebook.com" className="social-icon facebook" target="_blank" rel="noreferrer">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://instagram.com" className="social-icon instagram" target="_blank" rel="noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://youtube.com" className="social-icon youtube" target="_blank" rel="noreferrer">
              <i className="fab fa-youtube"></i>
            </a>
            <a href="https://tiktok.com" className="social-icon tiktok" target="_blank" rel="noreferrer">
              <i className="fab fa-tiktok"></i>
            </a>
          </div>
          
          <div className="footer-map">
            <iframe
              title="Bản đồ địa điểm Moon"
              className="footer-map__iframe"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.123456789!2d106.623456789!3d10.723456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDQzJzI0LjQiTiAxMDbCsDM3JzI0LjQiRQ!5e0!3m2!1svi!2s!4v1611234567890!5m2!1svi!2s"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <a
              className="footer-map__link"
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Mở trong Google Maps
            </a>
          </div>
        </div>
      </div>

      <div className="footer-chat-icon" title="Chat với chúng tôi">
        <i className="fas fa-comment-dots"></i>
      </div>
    </footer>
  );
};

export default Footer;