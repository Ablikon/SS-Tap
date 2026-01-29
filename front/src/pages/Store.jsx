import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Store.css'

function Store() {
  const navigate = useNavigate()
  const [cartItems, setCartItems] = useState([])
  const [showCart, setShowCart] = useState(false)
  const [activeCategory, setActiveCategory] = useState('Все')
  const [searchQuery, setSearchQuery] = useState('')

  const categories = ['Все', 'Стулья', 'Диваны', 'Шкафы', 'Кровати', 'Кресла']

  const products = [
    { id: 1, name: 'Mebel Style Rumba', desc: 'Стул обеденный красный', category: 'Стулья', price: 14757, image: '/chair.svg', rating: 4.8, reviews: 22, badge: 'new' },
    { id: 2, name: 'Grid Design Pro', desc: 'Стул офисный чёрный', category: 'Стулья', price: 24759, image: '/chair.svg', rating: 4.9, reviews: 15 },
    { id: 3, name: 'Comfort XL', desc: 'Шкаф-купе белый', category: 'Шкафы', price: 64879, image: '/wardrobe.svg', rating: 4.7, reviews: 56, badge: 'sale', oldPrice: 74990 },
    { id: 4, name: 'Elite Comfort', desc: 'Кровать двуспальная', category: 'Кровати', price: 205795, image: '/bed.svg', rating: 4.9, reviews: 203 },
    { id: 5, name: 'Modern Grey', desc: 'Диван угловой серый', category: 'Диваны', price: 189990, image: '/sofa.svg', rating: 4.6, reviews: 78, badge: 'hit' },
    { id: 6, name: 'Lounge Premium', desc: 'Кресло для отдыха', category: 'Кресла', price: 156000, image: '/armchair.svg', rating: 4.8, reviews: 145 },
  ]

  const formatPrice = (price) => price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

  const addToCart = (product) => {
    const existing = cartItems.find(item => item.id === product.id)
    if (existing) {
      setCartItems(cartItems.map(item => 
        item.id === product.id ? { ...item, qty: item.qty + 1 } : item
      ))
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }])
    }
  }

  const updateQty = (id, delta) => {
    setCartItems(prev => prev.map(item => 
      item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
    ))
  }

  const removeItem = (id) => setCartItems(prev => prev.filter(item => item.id !== id))

  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0)
  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0)

  const filtered = activeCategory === 'Все' 
    ? products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.desc.toLowerCase().includes(searchQuery.toLowerCase()))
    : products.filter(p => p.category === activeCategory && (p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.desc.toLowerCase().includes(searchQuery.toLowerCase())))

  return (
    <div className="store-page">
      {/* Navigation */}
      <nav className="store-nav">
        <div className="nav-container">
          <div className="nav-brand">
            <div className="brand-logo">A</div>
            <div className="brand-info">
              <div className="brand-name">TOO "Autodata"</div>
              <div className="brand-rating">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                4.9
              </div>
            </div>
          </div>

          <div className="nav-search">
            <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="M21 21l-4.35-4.35"/>
            </svg>
            <input 
              type="text" 
              placeholder="Поиск по магазину"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="nav-actions">
            <button className="nav-cart-btn" onClick={() => setShowCart(true)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1"/>
                <circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="store-hero">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-dot"></span>
              Официальный магазин
            </div>
            <h1>Мебель для вашего комфорта</h1>
            <p>Качественная мебель с доставкой по Казахстану. Оплата через Kaspi QR.</p>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-value">500+</div>
              <div className="stat-label">товаров</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">2000+</div>
              <div className="stat-label">клиентов</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">4.9</div>
              <div className="stat-label">рейтинг</div>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Section */}
      <section className="store-catalog">
        <div className="catalog-container">
          <div className="catalog-header">
            <h2>Каталог</h2>
            <div className="catalog-count">{filtered.length} товаров</div>
          </div>

          <div className="catalog-tabs">
            {categories.map(cat => (
              <button 
                key={cat}
                className={`catalog-tab ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="catalog-grid">
            {filtered.map((product, i) => (
              <div 
                key={product.id} 
                className="product-card"
              >
                {product.badge && (
                  <div className={`product-badge ${product.badge}`}>
                    {product.badge === 'new' && 'НОВИНКА'}
                    {product.badge === 'hit' && 'ХИТ'}
                    {product.badge === 'sale' && `-${Math.round((1 - product.price / product.oldPrice) * 100)}%`}
                  </div>
                )}
                
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                </div>

                <div className="product-info">
                  <div className="product-category">{product.category.toUpperCase()}</div>
                  <h3 className="product-name">{product.name}</h3>
                  <div className="product-rating">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    {product.rating} ({product.reviews})
                  </div>
                  <div className="product-price-row">
                    <div className="product-price">
                      {product.oldPrice && (
                        <span className="price-old">{formatPrice(product.oldPrice)} ₸</span>
                      )}
                      <span className="price-current">{formatPrice(product.price)} ₸</span>
                    </div>
                    <button className="product-add-btn" onClick={() => addToCart(product)}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="12" y1="5" x2="12" y2="19"/>
                        <line x1="5" y1="12" x2="19" y2="12"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="store-cta">
        <div className="cta-container">
          <div className="cta-content">
            <h2>Хотите такой же магазин?</h2>
            <p>Создайте свой онлайн-магазин за 10 секунд. Бесплатно. Без комиссий за подключение.</p>
            <button className="cta-button" onClick={() => navigate('/dashboard')}>
              Стать продавцом
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="store-footer">
        <div className="footer-container">
          <div className="footer-brand">
            Работает на <span className="footer-ss">SS</span><span className="footer-tap">Tap</span>
          </div>
          <div className="footer-links">
            <a href="#">Доставка</a>
            <a href="#">Оплата</a>
            <a href="#">Контакты</a>
          </div>
        </div>
      </footer>

      {/* Floating Cart Button */}
      {cartCount > 0 && !showCart && (
        <button className="floating-cart" onClick={() => setShowCart(true)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="9" cy="21" r="1"/>
            <circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          <span className="floating-cart-count">{cartCount}</span>
          <span className="floating-cart-text">Корзина</span>
        </button>
      )}

      {/* Cart Sidebar */}
      {showCart && (
        <div className="cart-overlay" onClick={() => setShowCart(false)}>
          <aside className="cart-sidebar" onClick={e => e.stopPropagation()}>
            <div className="cart-header">
              <h3>Корзина</h3>
              <button className="cart-close" onClick={() => setShowCart(false)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            {cartItems.length === 0 ? (
              <div className="cart-empty">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="9" cy="21" r="1"/>
                  <circle cx="20" cy="21" r="1"/>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                </svg>
                <p>Корзина пуста</p>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cartItems.map(item => (
                    <div key={item.id} className="cart-item">
                      <div className="cart-item-image">
                        <img src={item.image} alt={item.name} />
                      </div>
                      <div className="cart-item-info">
                        <h4>{item.name}</h4>
                        <div className="cart-item-price">{formatPrice(item.price)} ₸</div>
                        <div className="cart-item-qty">
                          <button onClick={() => updateQty(item.id, -1)}>−</button>
                          <span>{item.qty}</span>
                          <button onClick={() => updateQty(item.id, 1)}>+</button>
                        </div>
                      </div>
                      <button className="cart-item-remove" onClick={() => removeItem(item.id)}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="3 6 5 6 21 6"/>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
                <div className="cart-footer">
                  <div className="cart-total">
                    <span>Итого:</span>
                    <strong>{formatPrice(cartTotal)} ₸</strong>
                  </div>
                  <button className="cart-checkout">Оформить заказ</button>
                  <div className="cart-payment">
                    Оплата: <span>Kaspi QR</span>
                  </div>
                </div>
              </>
            )}
          </aside>
        </div>
      )}
    </div>
  )
}

export default Store
