import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .vlxd-page {
    min-height: 100vh;
    background-color: #e8ecef; 
    font-family: 'Montserrat', sans-serif;
    display: flex; flex-direction: column; align-items: center; padding: 40px 20px;
  }
  .brand-header { text-align: center; margin-bottom: 20px; }
  .brand-logo { width: 60px; height: 60px; background: #d35400; clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%); margin: 0 auto 10px; display: flex; align-items: center; justify-content: center; }
  .brand-logo-inner { width: 30px; height: 15px; background: #fff; border-radius: 2px; }
  .brand-title { color: #2c3e50; font-weight: 800; font-size: 20px; text-transform: uppercase; letter-spacing: 1px; }
  .brand-slogan { color: #d35400; font-size: 12px; font-weight: 700; letter-spacing: 0.5px; margin-top: 5px; }
  
  .page-title { font-size: 24px; color: #2c3e50; font-weight: 700; margin-top: 10px; text-transform: uppercase; margin-bottom: 5px; }
  .page-subtitle { font-size: 15px; color: #7f8c8d; margin-bottom: 25px; font-weight: 500; }
  
  .form-box { 
    background-color: #ffffff; 
    width: 100%; max-width: 450px; 
    padding: 35px 40px; 
    border-radius: 8px; 
    border-top: 5px solid #d35400;
    box-shadow: 0 10px 30px rgba(0,0,0,0.08); 
  }
  
  .form-group { margin-bottom: 18px; }
  .form-label { display: block; font-size: 13px; font-weight: 600; color: #34495e; margin-bottom: 6px; text-transform: uppercase; }
  .input-wrapper { display: flex; align-items: center; background: #fff; border: 1px solid #dcdde1; border-radius: 5px; overflow: hidden; transition: border 0.3s; }
  .input-wrapper:focus-within { border-color: #d35400; }
  .input-icon { padding: 12px; color: #7f8c8d; background: #f8f9fa; border-right: 1px solid #dcdde1; width: 45px; text-align: center; }
  .form-input { flex: 1; border: none; padding: 12px 15px; font-size: 14px; outline: none; color: #2c3e50; font-weight: 500; }
  .form-input::placeholder { color: #bdc3c7; font-weight: 400; }
  
  .checkbox-row { display: flex; align-items: flex-start; gap: 8px; font-size: 13px; font-weight: 500; margin: 15px 0 20px; color: #34495e; line-height: 1.4; }

  .btn-primary { 
    width: 100%; background-color: #d35400; color: #fff; border: none; 
    padding: 14px; font-size: 15px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;
    cursor: pointer; border-radius: 5px; transition: all 0.2s; 
    box-shadow: 0 4px 6px rgba(211, 84, 0, 0.2); 
    margin-bottom: 20px;
  }
  .btn-primary:hover { background-color: #e67e22; transform: translateY(-1px); box-shadow: 0 6px 10px rgba(211, 84, 0, 0.3); }
  
  .text-link { color: #2980b9; text-decoration: none; cursor: pointer; background: none; border: none; font-family: inherit; font-size: inherit; font-weight: 700; transition: color 0.2s; }
  .text-link:hover { color: #d35400; }

  .divider { display: flex; align-items: center; text-align: center; margin-bottom: 20px; }
  .divider::before, .divider::after { content: ''; flex: 1; border-bottom: 1px solid #ecf0f1; }
  .divider span { padding: 0 15px; font-size: 12px; font-weight: 600; color: #95a5a6; text-transform: uppercase; }
  
  .social-logins { display: flex; justify-content: space-between; margin-bottom: 25px; gap: 10px; }
  .btn-social { flex: 1; display: flex; align-items: center; justify-content: center; gap: 8px; background: #fff; border: 1px solid #dcdde1; padding: 10px; border-radius: 5px; font-size: 13px; font-weight: 600; color: #34495e; cursor: pointer; transition: background 0.2s; }
  .btn-social:hover { background: #f8f9fa; }
  
  .bottom-text { text-align: center; font-size: 14px; font-weight: 500; color: #34495e; }
`;

export default function Register({ onGoLogin }) {
  const [showPw, setShowPw] = useState(false);

  return (
    <>
      <style>{styles}</style>
      <div className="vlxd-page">
      <div className="brand-header">
          <img src="/logo.png" alt="Logo Vật Liệu Xây Dựng" className="brand-logo-img" />
        </div>

        <h1 className="page-title">ĐĂNG KÝ THÀNH VIÊN</h1>
        <p className="page-subtitle">Nền tảng vững chắc, kết nối dài lâu.</p>

        <div className="form-box">
          <div className="form-group">
            <label className="form-label">Họ và Tên</label>
            <div className="input-wrapper">
              <div className="input-icon">👤</div>
              <input type="text" className="form-input" placeholder="Tên của bạn" />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Số Điện Thoại</label>
            <div className="input-wrapper">
              <div className="input-icon">📞</div>
              <input type="tel" className="form-input" placeholder="Để liên hệ tư vấn & giao hàng" />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <div className="input-wrapper">
              <div className="input-icon">✉️</div>
              <input type="email" className="form-input" placeholder="Ví dụ: example@email.com" />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Mật khẩu</label>
            <div className="input-wrapper">
              <div className="input-icon">🔒</div>
              <input type={showPw ? "text" : "password"} className="form-input" placeholder="Ít nhất 8 ký tự" />
              <button type="button" style={{ background: 'none', border: 'none', padding: '0 10px', cursor: 'pointer', color: '#7f8c8d' }} onClick={() => setShowPw(!showPw)}>👁️</button>
            </div>
          </div>

          <div className="form-group">
            <div className="input-wrapper">
              <div className="input-icon">🔒</div>
              <input type={showPw ? "text" : "password"} className="form-input" placeholder="Xác nhận lại mật khẩu" />
            </div>
          </div>

          <label className="checkbox-row">
            <input type="checkbox" />
            <span>Tôi đồng ý với Điều khoản dịch vụ và Chính sách bảo mật</span>
          </label>

          <button className="btn-primary">ĐĂNG KÝ NGAY</button>

          <div className="divider"><span>hoặc đăng ký nhanh với</span></div>

          <div className="social-logins">
            <button className="btn-social"><span style={{color:'#1877F2', fontSize:'16px', fontWeight:'bold'}}>f</span> Facebook</button>
            <button className="btn-social"><span style={{color:'#EA4335', fontSize:'16px', fontWeight:'bold'}}>G</span> Google</button>
            <button className="btn-social"><span style={{color:'#0068FF', fontSize:'16px', fontWeight:'bold'}}>Z</span> Zalo</button>
          </div>

          <div className="bottom-text">
            Đã có tài khoản? <button className="text-link" onClick={onGoLogin}>ĐĂNG NHẬP</button>
          </div>
        </div>
      </div>
    </>
  );
}