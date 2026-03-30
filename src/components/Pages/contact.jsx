import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400;1,600&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  .contact-page {
    min-height: 100vh;
    width: 100%;
    background-color: #f0ebe3;
    background-image:
      radial-gradient(ellipse at 10% 30%, rgba(180,150,110,0.10) 0%, transparent 55%),
      radial-gradient(ellipse at 90% 70%, rgba(140,110,80,0.08) 0%, transparent 50%);
    font-family: 'DM Sans', sans-serif;
    padding: 48px 24px 64px;
  }

  /* ---- HEADER ---- */
  .contact-header {
    text-align: center;
    margin-bottom: 48px;
  }

  .contact-brand {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-bottom: 32px;
  }

  .brand-icon {
    width: 36px;
    height: 36px;
    display: block;
  }

  .brand-name {
    font-family: 'Playfair Display', serif;
    font-size: 13px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: #7a6a55;
    font-weight: 400;
  }

  .contact-title {
    font-family: 'Playfair Display', serif;
    font-size: 42px;
    font-weight: 400;
    color: #2c2416;
    line-height: 1.15;
    letter-spacing: -0.5px;
    margin-bottom: 14px;
  }

  .contact-title em {
    font-style: italic;
    color: #b8935a;
    font-weight: 600;
  }

  .contact-subtitle {
    font-size: 15px;
    font-weight: 300;
    color: #7a6a55;
    max-width: 480px;
    margin: 0 auto;
    line-height: 1.6;
  }

  /* ---- LAYOUT ---- */
  .contact-layout {
    display: grid;
    grid-template-columns: 1fr 1.5fr;
    gap: 28px;
    max-width: 1000px;
    margin: 0 auto;
  }

  @media (max-width: 768px) {
    .contact-layout {
      grid-template-columns: 1fr;
    }
    .contact-title { font-size: 32px; }
  }

  /* ---- CARD CHUNG ---- */
  .card {
    background: #faf7f2;
    border: 1px solid rgba(160,130,90,0.18);
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(100,75,50,0.06), 0 12px 40px rgba(100,75,50,0.08);
    position: relative;
    overflow: hidden;
  }

  .card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: linear-gradient(90deg, #b8935a, #d4a96a, #b8935a);
  }

  /* ---- CARD THÔNG TIN ---- */
  .info-card {
    padding: 36px 32px;
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .info-card-title {
    font-family: 'Playfair Display', serif;
    font-size: 20px;
    font-weight: 600;
    color: #2c2416;
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 1px solid #e8dfd2;
  }

  .info-item {
    display: flex;
    align-items: flex-start;
    gap: 14px;
    padding: 18px 0;
    border-bottom: 1px solid #f0e8dc;
  }

  .info-item:last-of-type {
    border-bottom: none;
  }

  .info-icon-wrap {
    width: 40px;
    height: 40px;
    background: rgba(184,147,90,0.10);
    border-radius: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    border: 1px solid rgba(184,147,90,0.20);
  }

  .info-icon-wrap svg {
    color: #b8935a;
  }

  .info-content {}

  .info-label {
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 1.8px;
    text-transform: uppercase;
    color: #a09080;
    margin-bottom: 4px;
  }

  .info-value {
    font-size: 14px;
    font-weight: 400;
    color: #2c2416;
    line-height: 1.5;
  }

  .info-value a {
    color: #2c2416;
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition: color 0.2s, border-color 0.2s;
  }

  .info-value a:hover {
    color: #b8935a;
    border-bottom-color: #b8935a;
  }

  /* Giờ làm việc */
  .hours-grid {
    display: flex;
    flex-direction: column;
    gap: 3px;
    margin-top: 2px;
  }

  .hours-row {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    color: #5a4e3e;
  }

  .hours-row .day { font-weight: 300; color: #7a6a55; }
  .hours-row .time { font-weight: 400; }
  .hours-row.highlight .day,
  .hours-row.highlight .time { color: #b8935a; font-weight: 500; }

  /* Mạng xã hội */
  .social-wrap {
    display: flex;
    gap: 10px;
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid #e8dfd2;
  }

  .social-btn {
    width: 38px;
    height: 38px;
    border: 1px solid #ddd4c4;
    border-radius: 2px;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s;
    color: #7a6a55;
    text-decoration: none;
  }

  .social-btn:hover {
    border-color: #b8935a;
    color: #b8935a;
    background: rgba(184,147,90,0.05);
  }

  /* ---- CARD FORM ---- */
  .form-card {
    padding: 36px 36px 32px;
  }

  .form-card-title {
    font-family: 'Playfair Display', serif;
    font-size: 20px;
    font-weight: 600;
    color: #2c2416;
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 1px solid #e8dfd2;
  }

  .form-row-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  @media (max-width: 480px) {
    .form-row-2 { grid-template-columns: 1fr; }
    .form-card { padding: 28px 24px; }
    .info-card { padding: 28px 24px; }
  }

  .form-group { margin-bottom: 18px; }

  .form-label {
    display: block;
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 1.8px;
    text-transform: uppercase;
    color: #7a6a55;
    margin-bottom: 8px;
  }

  .input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
  }

  .form-input, .form-textarea, .form-select {
    width: 100%;
    background: #fff;
    border: 1px solid #ddd4c4;
    border-radius: 2px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 300;
    color: #2c2416;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }

  .form-input {
    padding: 13px 40px 13px 14px;
  }

  .form-select {
    padding: 13px 14px;
    appearance: none;
    cursor: pointer;
    background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 7L11 1' stroke='%23b8a898' stroke-width='1.4' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 14px center;
  }

  .form-textarea {
    padding: 13px 14px;
    resize: vertical;
    min-height: 120px;
    line-height: 1.6;
  }

  .form-input::placeholder,
  .form-textarea::placeholder {
    color: #bbb0a0;
    font-size: 13px;
    font-weight: 300;
  }

  .form-input:focus,
  .form-textarea:focus,
  .form-select:focus {
    border-color: #b8935a;
    box-shadow: 0 0 0 3px rgba(184,147,90,0.10);
  }

  .form-input.err, .form-textarea.err, .form-select.err {
    border-color: #c0392b;
  }

  .input-icon {
    position: absolute;
    right: 12px;
    color: #b8a898;
    width: 16px;
    height: 16px;
    pointer-events: none;
  }

  .error-msg {
    margin-top: 6px;
    font-size: 11.5px;
    color: #c0392b;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  /* Char count */
  .char-count {
    text-align: right;
    font-size: 11px;
    color: #b8a898;
    margin-top: 4px;
  }

  /* Submit */
  .form-actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 8px;
    gap: 16px;
  }

  .form-note {
    font-size: 12px;
    font-weight: 300;
    color: #a09080;
    line-height: 1.5;
  }

  .btn-submit {
    flex-shrink: 0;
    padding: 14px 32px;
    background: #1e1810;
    color: #f0ebe3;
    border: none;
    border-radius: 2px;
    font-family: 'DM Sans', sans-serif;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 3px;
    text-transform: uppercase;
    cursor: pointer;
    transition: background 0.2s, transform 0.1s;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .btn-submit:hover { background: #2c2416; }
  .btn-submit:active { transform: translateY(1px); }
  .btn-submit:disabled { background: #8a7e72; cursor: not-allowed; transform: none; }

  /* ---- TOAST SUCCESS ---- */
  .toast {
    position: fixed;
    bottom: 32px;
    left: 50%;
    transform: translateX(-50%) translateY(80px);
    background: #1e1810;
    color: #f0ebe3;
    padding: 14px 24px;
    border-radius: 3px;
    font-size: 13px;
    font-weight: 400;
    display: flex;
    align-items: center;
    gap: 10px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.18);
    transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s;
    opacity: 0;
    z-index: 999;
    white-space: nowrap;
  }

  .toast.show {
    transform: translateX(-50%) translateY(0);
    opacity: 1;
  }

  /* ---- BẢN ĐỒ ---- */
  .map-card {
    max-width: 1000px;
    margin: 28px auto 0;
    border-radius: 4px;
    overflow: hidden;
    border: 1px solid rgba(160,130,90,0.18);
    box-shadow: 0 2px 8px rgba(100,75,50,0.06);
    position: relative;
  }

  .map-label {
    position: absolute;
    top: 14px;
    left: 14px;
    background: #1e1810;
    color: #f0ebe3;
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 2px;
    text-transform: uppercase;
    padding: 6px 12px;
    border-radius: 2px;
    z-index: 1;
  }

  .map-card iframe {
    display: block;
    width: 100%;
    height: 300px;
    border: none;
    filter: sepia(20%) contrast(95%);
  }
`;

const IconError = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
    <circle cx="6.5" cy="6.5" r="6" stroke="#c0392b" strokeWidth="1"/>
    <path d="M6.5 4v3.5M6.5 9v.5" stroke="#c0392b" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);

export default function Contact() {
  const [form, setForm] = useState({
    hoTen: "", soDienThoai: "", email: "", chuDe: "", noiDung: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const validate = () => {
    const errs = {};
    if (!form.hoTen.trim()) errs.hoTen = "Vui lòng nhập họ và tên.";
    if (!form.soDienThoai.trim()) errs.soDienThoai = "Vui lòng nhập số điện thoại.";
    else if (!/^(0[3|5|7|8|9])[0-9]{8}$/.test(form.soDienThoai))
      errs.soDienThoai = "Số điện thoại không hợp lệ.";
    if (!form.email.trim()) errs.email = "Vui lòng nhập email.";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Email không hợp lệ.";
    if (!form.chuDe) errs.chuDe = "Vui lòng chọn chủ đề.";
    if (!form.noiDung.trim()) errs.noiDung = "Vui lòng nhập nội dung tin nhắn.";
    else if (form.noiDung.trim().length < 20) errs.noiDung = "Nội dung ít nhất 20 ký tự.";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    // TODO: gọi API gửi liên hệ tại đây
    setTimeout(() => {
      setLoading(false);
      setForm({ hoTen: "", soDienThoai: "", email: "", chuDe: "", noiDung: "" });
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3500);
    }, 1600);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="contact-page">

        {/* Header */}
        <div className="contact-header">
          <div className="contact-brand">
            <img src="/logo.png" alt="Logo" className="brand-icon" />
            <span className="brand-name">Vật Liệu Xây Dựng</span>
          </div>
          <h1 className="contact-title">Liên hệ <em>với chúng tôi.</em></h1>
          <p className="contact-subtitle">
            Bạn cần tư vấn về vật liệu xây dựng? Đội ngũ của chúng tôi luôn sẵn sàng hỗ trợ bạn nhanh nhất có thể.
          </p>
        </div>

        {/* Layout chính */}
        <div className="contact-layout">

          {/* Cột trái — Thông tin */}
          <div className="card info-card">
            <div className="info-card-title">Thông tin liên hệ</div>

            <div className="info-item">
              <div className="info-icon-wrap">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M10 2C7.24 2 5 4.24 5 7c0 4.25 5 11 5 11s5-6.75 5-11c0-2.76-2.24-5-5-5z"/>
                  <circle cx="10" cy="7" r="1.8"/>
                </svg>
              </div>
              <div className="info-content">
                <div className="info-label">Địa chỉ</div>
                <div className="info-value">
                  123 Đường Nguyễn Văn Linh,<br/>
                  Phường Tân Phong, Quận 7,<br/>
                  TP. Hồ Chí Minh
                </div>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon-wrap">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 2h3l1.5 4-2 1.2a10.1 10.1 0 004.3 4.3L13 9.5l4 1.5v3a1 1 0 01-1 1C7.16 15 2 9.84 2 3a1 1 0 011-1z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="info-content">
                <div className="info-label">Điện thoại</div>
                <div className="info-value">
                  <a href="tel:02812345678">028 1234 5678</a><br/>
                  <a href="tel:0901234567">0901 234 567</a>
                </div>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon-wrap">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="5" width="16" height="12" rx="1.5"/>
                  <path d="M2 6.5L10 12L18 6.5" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="info-content">
                <div className="info-label">Email</div>
                <div className="info-value">
                  <a href="mailto:info@vatlieuxaydung.vn">info@vatlieuxaydung.vn</a><br/>
                  <a href="mailto:kinhdoanh@vatlieuxaydung.vn">kinhdoanh@vatlieuxaydung.vn</a>
                </div>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon-wrap">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="10" cy="10" r="8"/>
                  <path d="M10 6v4l2.5 2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="info-content">
                <div className="info-label">Giờ làm việc</div>
                <div className="hours-grid">
                  <div className="hours-row">
                    <span className="day">Thứ 2 – Thứ 6</span>
                    <span className="time">07:30 – 17:30</span>
                  </div>
                  <div className="hours-row">
                    <span className="day">Thứ 7</span>
                    <span className="time">07:30 – 12:00</span>
                  </div>
                  <div className="hours-row highlight">
                    <span className="day">Chủ nhật</span>
                    <span className="time">Nghỉ</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Mạng xã hội */}
            <div className="social-wrap">
              <a href="#" className="social-btn" title="Facebook">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                </svg>
              </a>
              <a href="#" className="social-btn" title="Zalo">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a href="#" className="social-btn" title="YouTube">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.4a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58z" strokeLinecap="round" strokeLinejoin="round"/>
                  <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none"/>
                </svg>
              </a>
              <a href="#" className="social-btn" title="TikTok">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M9 12a4 4 0 104 4V4a5 5 0 005 5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Cột phải — Form */}
          <div className="card form-card">
            <div className="form-card-title">Gửi tin nhắn cho chúng tôi</div>

            <form onSubmit={handleSubmit} noValidate>
              <div className="form-row-2">
                {/* Họ tên */}
                <div className="form-group">
                  <label className="form-label">Họ và tên</label>
                  <div className="input-wrapper">
                    <input
                      type="text"
                      className={`form-input ${errors.hoTen ? "err" : ""}`}
                      placeholder="Nguyễn Văn A"
                      value={form.hoTen}
                      onChange={set("hoTen")}
                    />
                    <svg className="input-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4">
                      <circle cx="10" cy="7" r="3.5"/>
                      <path d="M3 18c0-3.866 3.134-7 7-7s7 3.134 7 7" strokeLinecap="round"/>
                    </svg>
                  </div>
                  {errors.hoTen && <div className="error-msg"><IconError/>{errors.hoTen}</div>}
                </div>

                {/* SĐT */}
                <div className="form-group">
                  <label className="form-label">Số điện thoại</label>
                  <div className="input-wrapper">
                    <input
                      type="tel"
                      className={`form-input ${errors.soDienThoai ? "err" : ""}`}
                      placeholder="0912 345 678"
                      value={form.soDienThoai}
                      onChange={set("soDienThoai")}
                    />
                    <svg className="input-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4">
                      <path d="M5 2h3l1.5 4-2 1.2a10.1 10.1 0 004.3 4.3L13 9.5l4 1.5v3a1 1 0 01-1 1C7.16 15 2 9.84 2 3a1 1 0 011-1z" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  {errors.soDienThoai && <div className="error-msg"><IconError/>{errors.soDienThoai}</div>}
                </div>
              </div>

              {/* Email */}
              <div className="form-group">
                <label className="form-label">Địa chỉ email</label>
                <div className="input-wrapper">
                  <input
                    type="email"
                    className={`form-input ${errors.email ? "err" : ""}`}
                    placeholder="ban@example.com"
                    value={form.email}
                    onChange={set("email")}
                  />
                  <svg className="input-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4">
                    <rect x="2" y="5" width="16" height="12" rx="1.5"/>
                    <path d="M2 6.5L10 12L18 6.5" strokeLinecap="round"/>
                  </svg>
                </div>
                {errors.email && <div className="error-msg"><IconError/>{errors.email}</div>}
              </div>

              {/* Chủ đề */}
              <div className="form-group">
                <label className="form-label">Chủ đề</label>
                <select
                  className={`form-select ${errors.chuDe ? "err" : ""}`}
                  value={form.chuDe}
                  onChange={set("chuDe")}
                >
                  <option value="">Chọn chủ đề liên hệ...</option>
                  <option value="tu_van_san_pham">Tư vấn sản phẩm</option>
                  <option value="bao_gia">Yêu cầu báo giá</option>
                  <option value="don_hang">Hỏi về đơn hàng</option>
                  <option value="hop_tac">Hợp tác / Đại lý</option>
                  <option value="khieu_nai">Khiếu nại / Phản hồi</option>
                  <option value="khac">Khác</option>
                </select>
                {errors.chuDe && <div className="error-msg"><IconError/>{errors.chuDe}</div>}
              </div>

              {/* Nội dung */}
              <div className="form-group">
                <label className="form-label">Nội dung tin nhắn</label>
                <textarea
                  className={`form-textarea ${errors.noiDung ? "err" : ""}`}
                  placeholder="Mô tả chi tiết yêu cầu của bạn để chúng tôi hỗ trợ tốt nhất..."
                  value={form.noiDung}
                  onChange={set("noiDung")}
                  maxLength={500}
                />
                <div className="char-count">{form.noiDung.length} / 500</div>
                {errors.noiDung && <div className="error-msg"><IconError/>{errors.noiDung}</div>}
              </div>

              {/* Submit */}
              <div className="form-actions">
                <p className="form-note">
                  Chúng tôi sẽ phản hồi trong vòng<br/>
                  <strong style={{ color: "#2c2416" }}>1–2 giờ làm việc</strong>
                </p>
                <button type="submit" className="btn-submit" disabled={loading}>
                  {loading ? (
                    <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: "spin 0.8s linear infinite" }}>
                        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                      </svg>
                      Đang gửi...
                    </>
                  ) : (
                    <>
                      Gửi tin nhắn
                      <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M3 10h14M11 4l6 6-6 6" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bản đồ */}
        <div className="map-card">
          <div className="map-label">Bản đồ</div>
         <iframe
  title="Bản đồ cửa hàng"
  /* Chỉ dán phần link URL vào đây */
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.95434204466!2d106.6974333!3d10.7380025!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752fbd73ec4831%3A0x6b49999a071d7931!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBUw7RuIMSQ4bupYyBUaOG6r25n!5e0!3m2!1svi!2svn!4v1700000000000"
  width="100%"
  height="300"
  style={{ border: 0 }} // Trong JSX, style phải là một object
  allowFullScreen=""
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
/>
        </div>

      </div>

      {/* Toast thông báo */}
      <div className={`toast ${showToast ? "show" : ""}`}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="7" stroke="#27ae60" strokeWidth="1.5"/>
          <path d="M4.5 8.5L7 11L11.5 5.5" stroke="#27ae60" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Tin nhắn đã được gửi thành công! Chúng tôi sẽ liên hệ sớm.
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}