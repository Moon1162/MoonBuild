import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .vlxd-page {
    min-height: 100vh;
    background-color: #e8ecef; /* Xám xi măng nhạt */
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
  
  .options-row { display: flex; justify-content: space-between; align-items: center; font-size: 13px; font-weight: 600; margin-bottom: 20px; color: #34495e; }
  .checkbox-label { display: flex; align-items: center; gap: 6px; cursor: pointer; }
  
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

  .bottom-text { text-align: center; font-size: 14px; font-weight: 500; color: #34495e; }
`;

export default function Login({ onGoRegister, onGoForgot }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);

  return (
    <>
      <style>{styles}</style>
      <div className="vlxd-page">
     <div className="brand-header">
          <img src="/logo.png" alt="Logo Vật Liệu Xây Dựng" className="brand-logo-img" />
        </div>

        <h1 className="page-title">ĐĂNG NHẬP</h1>
        <p className="page-subtitle">Chào mừng bạn quay trở lại</p>

        <div className="form-box">
          <div className="form-group">
            <label className="form-label">Email / Mã nhân viên</label>
            <div className="input-wrapper">
              <div className="input-icon">👤</div>
              <input
                type="text"
                className="form-input"
                placeholder="Nhập email hoặc mã nhân viên"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Mật khẩu</label>
            <div className="input-wrapper">
              <div className="input-icon">🔒</div>
              <input
                type={showPw ? "text" : "password"}
                className="form-input"
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button 
                type="button" 
                style={{ background: 'none', border: 'none', padding: '0 15px', cursor: 'pointer', color: '#7f8c8d' }}
                onClick={() => setShowPw(!showPw)}
              >
                👁️
              </button>
            </div>
          </div>

          <div className="options-row">
            <label className="checkbox-label">
              <input type="checkbox" /> Ghi nhớ đăng nhập
            </label>
            <button className="text-link" onClick={onGoForgot}>Quên mật khẩu?</button>
          </div>

          <button className="btn-primary">ĐĂNG NHẬP</button>

          <div className="bottom-text">
            Chưa có tài khoản? <button className="text-link" onClick={onGoRegister}>ĐĂNG KÝ NGAY</button>
          </div>
        </div>
      </div>
    </>
  );
}