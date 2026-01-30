import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Store.css'

function Store() {
  const navigate = useNavigate()
  const [cartItems, setCartItems] = useState([])
  const [showCart, setShowCart] = useState(false)
  const [showCheckout, setShowCheckout] = useState(false)
  const [activeCategory, setActiveCategory] = useState('Все')
  const [searchQuery, setSearchQuery] = useState('')
  const [priceRange, setPriceRange] = useState([0, 500000])
  const [minRating, setMinRating] = useState(0)
  const [sortBy, setSortBy] = useState('popular')
  const [isScrolled, setIsScrolled] = useState(false)
  const [checkoutForm, setCheckoutForm] = useState({
    name: '',
    phone: '',
    city: '',
    address: '',
    paymentMethod: 'kaspi'
  })

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const categories = [
    { id: 'all', name: 'Все', icon: '⊞' },
    { id: 'chairs', name: 'Стулья', icon: '🪑' },
    { id: 'sofas', name: 'Диваны', icon: '🛋' },
    { id: 'wardrobes', name: 'Шкафы', icon: '🚪' },
    { id: 'beds', name: 'Кровати', icon: '🛏' },
    { id: 'armchairs', name: 'Кресла', icon: '💺' },
  ]

  const categoryItems = [
    { name: 'Стулья', image: '/chair.svg' },
    { name: 'Диваны', image: '/sofa.svg' },
    { name: 'Шкафы', image: '/wardrobe.svg' },
    { name: 'Кровати', image: '/bed.svg' },
    { name: 'Кресла', image: '/armchair.svg' },
    { name: 'Столы', image: '/chair.svg' },
  ]

  const categoryTabs = [
    'БЫТОВАЯ ТЕХНИКА',
    'МЕБЕЛЬ',
    'ДОМ И САД',
    'ЭЛЕКТРОНИКА',
    'ДЕТСКИЕ ТОВАРЫ',
    'ЕЩЕ'
  ]

  const brands = [
    { name: 'Mebel Style', logo: 'MS' },
    { name: 'Grid Design', logo: 'GD' },
    { name: 'Comfort XL', logo: 'CX' },
    { name: 'Elite Comfort', logo: 'EC' },
    { name: 'Modern Grey', logo: 'MG' },
    { name: 'Lounge Premium', logo: 'LP' },
  ]

  const sideCategories = [
    { name: 'Мебель для дома', count: 156 },
    { name: 'Стулья и табуреты', count: 43 },
    { name: 'Диваны и кресла', count: 67 },
    { name: 'Шкафы и комоды', count: 28 },
    { name: 'Кровати и матрасы', count: 35 },
    { name: 'Столы', count: 24 },
  ]

  const products = [
    { id: 1, name: 'Стул обеденный Mebel Style Rumba', category: 'Стулья', price: 14757, oldPrice: 18990, image: '/chair.svg', rating: 4.8, reviews: 156, badge: 'new', delivery: 'Завтра', credit: '2 458' },
    { id: 2, name: 'Стул офисный Grid Design Pro', category: 'Стулья', price: 24759, image: '/chair.svg', rating: 4.9, reviews: 89, delivery: '2 февраля', credit: '4 127' },
    { id: 3, name: 'Шкаф-купе Comfort XL белый', category: 'Шкафы', price: 64879, oldPrice: 74990, image: '/wardrobe.svg', rating: 4.7, reviews: 234, badge: 'sale', delivery: 'Завтра', credit: '10 813' },
    { id: 4, name: 'Кровать двуспальная Elite Comfort', category: 'Кровати', price: 205795, image: '/bed.svg', rating: 4.9, reviews: 412, badge: 'hit', delivery: '3 февраля', credit: '34 299' },
    { id: 5, name: 'Диван угловой Modern Grey', category: 'Диваны', price: 189990, oldPrice: 219990, image: '/sofa.svg', rating: 4.6, reviews: 178, delivery: 'Завтра', credit: '31 665' },
    { id: 6, name: 'Кресло для отдыха Lounge Premium', category: 'Кресла', price: 156000, image: '/armchair.svg', rating: 4.8, reviews: 145, delivery: '4 февраля', credit: '26 000' },
    { id: 7, name: 'Стул барный Industrial Loft', category: 'Стулья', price: 19990, image: '/chair.svg', rating: 4.5, reviews: 67, delivery: 'Завтра', credit: '3 332' },
    { id: 8, name: 'Шкаф книжный Open Space', category: 'Шкафы', price: 45990, image: '/wardrobe.svg', rating: 4.4, reviews: 98, badge: 'new', delivery: '5 февраля', credit: '7 665' },
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
    // Открываем корзину после добавления товара
    setShowCart(true)
  }

  const updateQty = (id, delta) => {
    setCartItems(prev => prev.map(item => 
      item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
    ))
  }

  const removeItem = (id) => setCartItems(prev => prev.filter(item => item.id !== id))

  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0)
  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0)

  const categoryMap = {
    'Все': 'all',
    'Стулья': 'chairs',
    'Диваны': 'sofas',
    'Шкафы': 'wardrobes',
    'Кровати': 'beds',
    'Кресла': 'armchairs'
  }

  let filtered = activeCategory === 'Все' 
    ? products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : products.filter(p => p.category === activeCategory && p.name.toLowerCase().includes(searchQuery.toLowerCase()))
  
  filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])
  filtered = filtered.filter(p => p.rating >= minRating)
  
  if (sortBy === 'price-asc') {
    filtered = [...filtered].sort((a, b) => a.price - b.price)
  } else if (sortBy === 'price-desc') {
    filtered = [...filtered].sort((a, b) => b.price - a.price)
  } else if (sortBy === 'rating') {
    filtered = [...filtered].sort((a, b) => b.rating - a.rating)
  }

  return (
    <div className="store-page">
      {/* Header */}
      <header className={`store-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="header-container">
          <div className="header-top">
            <div className="header-left">
              <div className="store-logo">
                <div className="logo-icon">A</div>
                <div className="logo-info">
                  <span className="logo-name">TOO "Autodata"</span>
                  {/* <div className="logo-rating">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    4.9
                  </div> */}
                </div>
              </div>
            </div>

            <div className="header-search">
              <button className="search-category-btn">
                Везде
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
              </button>
              <input 
                type="text" 
                placeholder="Искать на SS Tap"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="search-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="M21 21l-4.35-4.35"/>
                </svg>
              </button>
            </div>

            <div className="header-actions">
              <button className="header-action">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                <span>Войти</span>
              </button>
              <button className="header-action">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                </svg>
                <span>Заказы</span>
              </button>
              <button className="header-action favorite">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
                <span>Избранное</span>
              </button>
              <button className="header-action cart" onClick={() => setShowCart(true)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="9" cy="21" r="1"/>
                  <circle cx="20" cy="21" r="1"/>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                </svg>
                <span>Корзина</span>
                {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
              </button>
            </div>
          </div>

          {!isScrolled && (
            <div className="header-bottom">
              <div className="header-bottom-left">
                <button className="catalog-btn">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="3" y1="6" x2="21" y2="6"/>
                    <line x1="3" y1="12" x2="21" y2="12"/>
                    <line x1="3" y1="18" x2="21" y2="18"/>
                  </svg>
                  Каталог
                </button>
                <div className="categories-links">
                  <a href="#">Рассрочка 0-0-12</a>
                  <a href="#">Казахстанские продавцы</a>
                  <a href="#">Мебель</a>
                  <a href="#">Дом и сад</a>
                  <a href="#">Электроника</a>
                  <a href="#">Детские товары</a>
                  <a href="#">Бытовая техника</a>
                </div>
              </div>
              <div className="header-bottom-right">
                <span className="location-city">Алматы</span>
                <a href="#" className="location-link">Укажите адрес</a>
                <div className="location-flag">
                 
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Category Section */}
      <section className="category-section">
        <div className="category-header-wrapper">
          <h2 className="category-title">Мебель</h2>
          <div className="category-tabs">
            {categoryTabs.map((tab, index) => (
              <button key={index} className={`category-tab ${index === 1 ? 'active' : ''}`}>
                {tab}
              </button>
            ))}
          </div>
        </div>
        
        <div className="category-grid-block">
          <div className="category-grid">
            {categoryItems.map((item, index) => (
              <div key={index} className="category-card">
                <div className="category-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <span className="category-name">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Brands */}
      <section className="brands-section">
        <div className="brands-container">
          <h3 className="brands-title">Популярные бренды</h3>
          <div className="brands-grid">
            {brands.map((brand, index) => (
              <div key={index} className="brand-item">
                <div className="brand-logo">{brand.logo}</div>
                <span className="brand-name">{brand.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="store-main">
        <div className="main-container">
          {/* Sidebar */}
          <aside className="store-sidebar">
            <div className="sidebar-block">
              <h3 className="sidebar-title">Категория</h3>
              <ul className="category-list">
                {sideCategories.map((cat, i) => (
                  <li key={i} className={i === 0 ? 'active' : ''}>
                    <a href="#">{cat.name}</a>
                  </li>
                ))}
                <li className="show-all">
                  <a href="#">Посмотреть все</a>
                </li>
              </ul>

              <h3 className="sidebar-title">Цена, ₸</h3>
              <div className="price-range">
                <input 
                  type="number" 
                  placeholder="от"
                  value={priceRange[0] || ''}
                  onChange={(e) => setPriceRange([Number(e.target.value) || 0, priceRange[1]])}
                />
                <span className="price-separator">—</span>
                <input 
                  type="number" 
                  placeholder="до"
                  value={priceRange[1] || ''}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value) || 500000])}
                />
              </div>
              <div className="price-slider-container">
                <input
                  type="range"
                  min="0"
                  max="500000"
                  step="1000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="price-slider"
                />
              </div>

              <h3 className="sidebar-title">Рейтинг продавца</h3>
              <div className="rating-options">
                {[4.5, 4, 3.5, 3].map(rating => (
                  <label key={rating} className="rating-option">
                    <input 
                      type="radio" 
                      name="rating" 
                      checked={minRating === rating}
                      onChange={() => setMinRating(minRating === rating ? 0 : rating)}
                    />
                    <span className="radio-custom"></span>
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    от {rating}
                  </label>
                ))}
              </div>

              <h3 className="sidebar-title">Срок доставки</h3>
              <div className="delivery-options">
                <label className="delivery-option">
                  <input type="radio" name="delivery" />
                  <span className="radio-custom"></span>
                  Завтра
                </label>
                <label className="delivery-option">
                  <input type="radio" name="delivery" />
                  <span className="radio-custom"></span>
                  До 3 дней
                </label>
                <label className="delivery-option">
                  <input type="radio" name="delivery" />
                  <span className="radio-custom"></span>
                  До 7 дней
                </label>
              </div>
            </div>
          </aside>

          {/* Products */}
          <div className="products-section">
            <div className="products-header">
              <div className="products-sort">
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option value="popular">Популярные</option>
                  <option value="price-asc">Сначала дешевле</option>
                  <option value="price-desc">Сначала дороже</option>
                  <option value="rating">По рейтингу</option>
                </select>
              </div>
              <div className="products-tabs">
                {categories.map(cat => (
                  <button 
                    key={cat.id}
                    className={`tab ${activeCategory === cat.name ? 'active' : ''}`}
                    onClick={() => setActiveCategory(cat.name)}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="products-grid">
              {filtered.map((product) => (
                <div key={product.id} className="product-card">
                  <button className="product-favorite">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                  </button>
                  
                  {product.badge && (
                    <div className={`product-badge ${product.badge}`}>
                      {product.badge === 'new' && 'Новинка'}
                      {product.badge === 'hit' && 'Хит продаж'}
                      {product.badge === 'sale' && `-${Math.round((1 - product.price / product.oldPrice) * 100)}%`}
                    </div>
                  )}

                  <div className="product-image">
                    <img src={product.image} alt={product.name} />
                  </div>

                  <div className="product-content">
                    <div className="product-credit">
                      <span>{product.credit} ₸</span> × 6 мес
                    </div>
                    
                    <div className="product-prices">
                      <span className="price-current">{formatPrice(product.price)} ₸</span>
                      {product.oldPrice && (
                        <span className="price-old">{formatPrice(product.oldPrice)} ₸</span>
                      )}
                    </div>

                    <h3 className="product-name">{product.name}</h3>

                    <div className="product-rating">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                      <span className="rating-value">{product.rating}</span>
                      <span className="rating-count">{product.reviews} отзывов</span>
                    </div>

                    <button className="product-delivery">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="1" y="3" width="15" height="13" rx="2"/>
                        <path d="M16 8h4l3 3v5h-7V8z"/>
                        <circle cx="5.5" cy="18.5" r="2.5"/>
                        <circle cx="18.5" cy="18.5" r="2.5"/>
                      </svg>
                      {product.delivery}
                    </button>

                    <button className="add-to-cart" onClick={() => addToCart(product)}>
                      В корзину
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* CTA Banner */}
      <section className="cta-banner">
        <div className="cta-container">
          <div className="cta-content">
            <h2>Хотите такой же магазин?</h2>
            <p>Создайте свой онлайн-магазин за 10 секунд. Бесплатно.</p>
            <button className="cta-btn" onClick={() => navigate('/dashboard')}>
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
          <span>Работает на <strong>SS Tap</strong></span>
          <div className="footer-links">
            <a href="#">Доставка</a>
            <a href="#">Оплата</a>
            <a href="#">Контакты</a>
          </div>
        </div>
      </footer>

      {/* Floating Cart */}
      {cartCount > 0 && !showCart && (
        <button className="floating-cart" onClick={() => setShowCart(true)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="9" cy="21" r="1"/>
            <circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          <span className="cart-badge">{cartCount}</span>
          <span>{formatPrice(cartTotal)} ₸</span>
        </button>
      )}

      {/* Cart Drawer */}
      {showCart && (
        <div className="cart-overlay" onClick={() => setShowCart(false)}>
          <aside className="cart-drawer" onClick={e => e.stopPropagation()}>
            <div className="cart-header">
              <h3>Корзина <span>{cartCount}</span></h3>
              <button onClick={() => setShowCart(false)}>
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
                      <div className="item-image">
                        <img src={item.image} alt={item.name} />
                      </div>
                      <div className="item-info">
                        <h4>{item.name}</h4>
                        <div className="item-price">{formatPrice(item.price)} ₸</div>
                        <div className="item-qty">
                          <button onClick={() => updateQty(item.id, -1)}>−</button>
                          <span>{item.qty}</span>
                          <button onClick={() => updateQty(item.id, 1)}>+</button>
                        </div>
                      </div>
                      <button className="item-remove" onClick={() => removeItem(item.id)}>
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
                    <span>Итого</span>
                    <strong>{formatPrice(cartTotal)} ₸</strong>
                  </div>
                  <button className="checkout-btn" onClick={() => setShowCheckout(true)}>Оформить заказ</button>
                  <div className="payment-info">
                    Безопасная оплата через <span>Kaspi</span>
                  </div>
                </div>
              </>
            )}
          </aside>
        </div>
      )}

      {/* Checkout Form */}
      {showCheckout && (
        <div className="checkout-overlay" onClick={() => setShowCheckout(false)}>
          <div className="checkout-modal" onClick={e => e.stopPropagation()}>
            <div className="checkout-header">
              <h2>Оформление заказа</h2>
              <button onClick={() => setShowCheckout(false)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            <div className="checkout-content">
              <div className="checkout-section">
                <h3>Контактные данные</h3>
                <div className="form-group">
                  <label>Имя и фамилия</label>
                  <input
                    type="text"
                    placeholder="Иван Иванов"
                    value={checkoutForm.name}
                    onChange={(e) => setCheckoutForm({...checkoutForm, name: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Телефон</label>
                  <input
                    type="tel"
                    placeholder="+7 (700) 123-45-67"
                    value={checkoutForm.phone}
                    onChange={(e) => setCheckoutForm({...checkoutForm, phone: e.target.value})}
                  />
                </div>
              </div>

              <div className="checkout-section">
                <h3>Адрес доставки</h3>
                <div className="form-group">
                  <label>Город</label>
                  <select
                    value={checkoutForm.city}
                    onChange={(e) => setCheckoutForm({...checkoutForm, city: e.target.value})}
                  >
                    <option value="">Выберите город</option>
                    <option value="almaty">Алматы</option>
                    <option value="astana">Астана</option>
                    <option value="shymkent">Шымкент</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Адрес</label>
                  <input
                    type="text"
                    placeholder="Улица, дом, квартира"
                    value={checkoutForm.address}
                    onChange={(e) => setCheckoutForm({...checkoutForm, address: e.target.value})}
                  />
                </div>
              </div>

              <div className="checkout-section">
                <h3>Способ оплаты</h3>
                <div className="payment-methods">
                  <label className="payment-option">
                    <input
                      type="radio"
                      name="payment"
                      value="kaspi"
                      checked={checkoutForm.paymentMethod === 'kaspi'}
                      onChange={(e) => setCheckoutForm({...checkoutForm, paymentMethod: e.target.value})}
                    />
                    <div className="payment-option-content">
                      <div className="payment-icon kaspi">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                        </svg>
                      </div>
                      <div>
                        <div className="payment-name">Kaspi</div>
                        <div className="payment-desc">Оплата через Kaspi.kz</div>
                      </div>
                    </div>
                  </label>
                  <label className="payment-option">
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={checkoutForm.paymentMethod === 'card'}
                      onChange={(e) => setCheckoutForm({...checkoutForm, paymentMethod: e.target.value})}
                    />
                    <div className="payment-option-content">
                      <div className="payment-icon card">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                          <line x1="1" y1="10" x2="23" y2="10"/>
                        </svg>
                      </div>
                      <div>
                        <div className="payment-name">Банковская карта</div>
                        <div className="payment-desc">Visa, Mastercard, Мир</div>
                      </div>
                    </div>
                  </label>
                  <label className="payment-option">
                    <input
                      type="radio"
                      name="payment"
                      value="cash"
                      checked={checkoutForm.paymentMethod === 'cash'}
                      onChange={(e) => setCheckoutForm({...checkoutForm, paymentMethod: e.target.value})}
                    />
                    <div className="payment-option-content">
                      <div className="payment-icon cash">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                          <line x1="1" y1="10" x2="23" y2="10"/>
                        </svg>
                      </div>
                      <div>
                        <div className="payment-name">Наличными при получении</div>
                        <div className="payment-desc">Оплата курьеру</div>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              <div className="checkout-summary">
                <div className="summary-row">
                  <span>Товары ({cartCount})</span>
                  <span>{formatPrice(cartTotal)} ₸</span>
                </div>
                <div className="summary-row">
                  <span>Доставка</span>
                  <span>Бесплатно</span>
                </div>
                <div className="summary-total">
                  <span>К оплате</span>
                  <strong>{formatPrice(cartTotal)} ₸</strong>
                </div>
              </div>

              <button
                className="pay-btn"
                onClick={() => {
                  alert('Заказ успешно оформлен!')
                  setShowCheckout(false)
                  setShowCart(false)
                  setCartItems([])
                }}
              >
                Оплатить {formatPrice(cartTotal)} ₸
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Store
