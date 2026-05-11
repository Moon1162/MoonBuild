import React, { useEffect, useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import './DetailProduct.css';
import { imageMap } from '../../utils/productImages';

const DetailProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [product, setProduct] = useState(location.state?.product || null);
  const [isLoading, setIsLoading] = useState(!location.state?.product);
  const [error, setError] = useState(null);

  const [selectedVariant, setSelectedVariant] = useState(0);
  const [mainImage, setMainImage] = useState('');
  const [activeTab, setActiveTab] = useState('desc');

  useEffect(() => {
    if (product) {
      setMainImage(product.image || product.images?.[0] || 'https://via.placeholder.com/500x350');
      return;
    }
    const fetchProduct = async () => {
      try {
        const response = await fetch('/product.json');
        if (!response.ok) throw new Error('Không thể tải thông tin sản phẩm');
        const data = await response.json();
        const found = data.find((item) => String(item.id) === String(id));
        if (!found) throw new Error('Sản phẩm không tồn tại');
        
        const finalProduct = {
          ...found,
          image: imageMap[found.imageKey] || found.image
        };
        
        setProduct(finalProduct);
        setMainImage(finalProduct.image || finalProduct.images?.[0] || 'https://via.placeholder.com/500x350');
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [id, product]);

  if (isLoading) return <div className="detail-container">Đang tải chi tiết...</div>;
  if (error) return <div className="detail-container">Lỗi: {error}</div>;
  if (!product) return null;

  const hasVariants = product.variants && product.variants.length > 0;
  const displayPrice = hasVariants ? product.variants[selectedVariant].price : product.currentPrice;
  const displayOriginal = hasVariants ? product.variants[selectedVariant].originalPrice : product.originalPrice;
  const displayDiscount = hasVariants ? product.variants[selectedVariant].discount : product.discount;

  const handleAddToCart = () => {
    const savedCart = localStorage.getItem('cart');
    const cart = savedCart ? JSON.parse(savedCart) : [];
    const cartItemId = hasVariants ? `${product.id}-${selectedVariant}` : product.id;
    const cartItemName = hasVariants ? `${product.name} - ${product.variants[selectedVariant].name}` : product.name;

    const existingItemIndex = cart.findIndex(item => item.id === cartItemId);
    if (existingItemIndex >= 0) {
      cart[existingItemIndex].quantity += 1;
    } else {
      cart.push({
        ...product,
        id: cartItemId, 
        name: cartItemName,
        currentPrice: displayPrice,
        image: mainImage,
        quantity: 1
      });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cartUpdated'));
    navigate('/cart');
  };

  const galleryImages = product.images || [mainImage];

  return (
    <div className="detail-container">
      <button className="back-button" onClick={() => navigate(-1)}>← Quay lại</button>
      
      <div className="detail-top-section">
        <div className="detail-gallery">
          <div className="detail-image-main">
            <img src={mainImage} alt={product.name} />
          </div>
          
          {galleryImages.length > 1 && (
            <div className="detail-thumbnails">
              {galleryImages.map((img, idx) => (
                <div 
                  key={idx} 
                  className={`thumbnail-item ${mainImage === img ? 'active' : ''}`}
                  onClick={() => setMainImage(img)}
                >
                  <img src={img} alt={`Thumb ${idx}`} />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="detail-info">
          <h2>{product.name}</h2>
          
          <div className="detail-meta">
            {product.rating && <span><i className="fas fa-star" style={{color: '#f59e0b'}}></i> {product.rating}</span>}
            <span className="meta-divider">|</span>
            {product.sold && <span>Đã bán {product.sold}</span>}
          </div>

          <p className="detail-price">
            <span className="current-price">{displayPrice}</span>
            {displayOriginal && <span className="original-price">{displayOriginal}</span>}
            {displayDiscount && <span className="discount">{displayDiscount}</span>}
          </p>

          <div className="detail-sizes">
            <h4 className="section-label">Khối lượng / Kích thước:</h4>
            <div className="size-options">
              {hasVariants ? (
                product.variants.map((variant, index) => (
                  <button
                    key={index}
                    className={`ram-ssd-tag ${selectedVariant === index ? 'active' : ''}`}
                    onClick={() => setSelectedVariant(index)}
                  >
                    {variant.name}
                  </button>
                ))
              ) : (
                <>
                  {product.sizeS && <button className="ram-ssd-tag">{product.sizeS}</button>}
                  {product.sizeM && <button className="ram-ssd-tag">{product.sizeM}</button>}
                  {product.sizeL && <button className="ram-ssd-tag">{product.sizeL}</button>}
                </>
              )}
            </div>
          </div>

          <div className="detail-policies">
            <div className="policy-item"><i className="fas fa-truck"></i> Giao hàng tận công trình</div>
            <div className="policy-item"><i className="fas fa-box-open"></i> Kiểm tra hàng trước khi thanh toán</div>
            <div className="policy-item"><i className="fas fa-undo"></i> Đổi trả 7 ngày nếu lỗi NSX</div>
          </div>

          <button className="buy-now-button" onClick={handleAddToCart}>
            THÊM VÀO GIỎ HÀNG
          </button>
        </div>
      </div>

      <div className="detail-bottom-section">
        <div className="tab-headers">
          <button 
            className={`tab-btn ${activeTab === 'desc' ? 'active' : ''}`}
            onClick={() => setActiveTab('desc')}
          >
            Mô tả sản phẩm
          </button>
          <button 
            className={`tab-btn ${activeTab === 'specs' ? 'active' : ''}`}
            onClick={() => setActiveTab('specs')}
          >
            Thông số kỹ thuật
          </button>
        </div>
        
        <div className="tab-content">
          {activeTab === 'desc' && (
            <div className="content-desc">
              <p style={{ fontSize: "16px", fontWeight: "500" }}>
                {product.description || "Sản phẩm chất lượng cao, phân phối chính hãng bởi Moon VLXD."}
              </p>

              <div className="generic-description" style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px dashed #e2e8f0' }}>
                <h4 style={{ color: '#1e293b', marginBottom: '12px' }}>1. Đặc điểm nổi bật</h4>
                <ul style={{ paddingLeft: '20px', marginBottom: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <li>Được sản xuất trên dây chuyền công nghệ hiện đại, đáp ứng các tiêu chuẩn khắt khe nhất về chất lượng tại Việt Nam.</li>
                  <li>Độ bền cao, khả năng chống thấm và chịu lực tốt, phù hợp với điều kiện khí hậu nhiệt đới gió mùa.</li>
                  <li>Đảm bảo an toàn cho sức khỏe người thi công và thân thiện với môi trường xung quanh.</li>
                </ul>

                <h4 style={{ color: '#1e293b', marginBottom: '12px' }}>2. Hướng dẫn bảo quản & Sử dụng</h4>
                <ul style={{ paddingLeft: '20px', marginBottom: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <li>Bảo quản nơi khô ráo, thoáng mát, tuyệt đối tránh tiếp xúc trực tiếp với ánh nắng mặt trời và khu vực ngập nước.</li>
                  <li>Sản phẩm dạng bao cần đặt trên pallet, cách mặt đất ít nhất 10cm và cách tường 20cm.</li>
                  <li>Khi thi công cần tuân thủ đúng tỷ lệ pha trộn và hướng dẫn kỹ thuật in trên bao bì hoặc theo khuyến cáo của nhà sản xuất để đạt hiệu quả kết cấu tối đa.</li>
                </ul>

                <h4 style={{ color: '#1e293b', marginBottom: '12px' }}>3. Cam kết từ Moon VLXD</h4>
                <p style={{ textAlign: 'justify', lineHeight: '1.6' }}>
                  Chúng tôi tự hào là đơn vị cung cấp vật liệu xây dựng uy tín hàng đầu khu vực. Cam kết hàng chính hãng 100%, đền bù gấp 10 lần giá trị đơn hàng nếu phát hiện hàng giả, hàng nhái, hàng kém chất lượng. Hỗ trợ vận chuyển tận chân công trình với đội ngũ xe tải chuyên dụng, giao hàng nhanh chóng đúng tiến độ trong vòng 24h. Khách hàng được kiểm tra kỹ lưỡng số lượng và chất lượng trước khi thanh toán.
                </p>
              </div>
            </div>
          )}
          {activeTab === 'specs' && (
            <div className="content-specs">
              {product.specs ? (
                <table className="specs-table">
                  <tbody>
                    {Object.entries(product.specs).map(([key, value], idx) => (
                      <tr key={idx}>
                        <td className="spec-key">{key}</td>
                        <td className="spec-value">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>Chưa có thông số kỹ thuật.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailProduct;