import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import FreedomIcon from '../assets/Freedom.png'
import productsData from '../assets/products.json'
import '../styles/Store.css'

function Store() {
  const navigate = useNavigate()
  const [cartItems, setCartItems] = useState([])
  const [showCart, setShowCart] = useState(false)
  const [showCheckout, setShowCheckout] = useState(false)
  const [activeCategory, setActiveCategory] = useState('Все')
  const [searchQuery, setSearchQuery] = useState('')
  const [minRating, setMinRating] = useState(0)
  const [sortBy, setSortBy] = useState('popular')
  const [isScrolled, setIsScrolled] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [checkoutForm, setCheckoutForm] = useState({
    name: '',
    phone: '',
    city: '',
    address: '',
    paymentMethod: 'freedom'
  })
  
  const itemsPerPage = 12

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Функция форматирования цены
  const formatPrice = (price) => price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

  // Фильтруем активные товары
  const activeProducts = useMemo(() => {
    return productsData.filter(p => p.inStock && p.isActive && p.images && p.images.length > 0)
  }, [])

  // Преобразуем данные из JSON
  const products = useMemo(() => {
    const totalCount = activeProducts.length
    return activeProducts.map((p, index) => {
        const mainCategory = p.category_full_path ? p.category_full_path.split(' > ')[0] : 'Другое'
        const hasDiscount = p.discount > 0 && p.originalPrice > p.price
        
        // Определяем badge (только для некоторых товаров)
        let badge = null
        // Новинка - только первые 5% товаров
        if (index < totalCount * 0.05) badge = 'new'
        // Скидка - если скидка >= 15%
        else if (hasDiscount && p.discount >= 15) badge = 'sale'
        // Хит продаж - высокий рейтинг и много отзывов
        else if (p.rating >= 4.8 && p.reviewCount > 100) badge = 'hit'
        
        // Генерируем дату доставки
        const deliveryDates = ['Завтра', '2 февраля', '3 февраля', '4 февраля', '5 февраля']
        const delivery = deliveryDates[index % deliveryDates.length]
        
        // Рассчитываем кредит (цена / 6)
        const credit = Math.round(p.price / 6)
        
        return {
          id: p.id || p.productId || `product-${index}`,
          name: p.title,
          category: mainCategory,
          price: p.price,
          oldPrice: hasDiscount ? p.originalPrice : null,
          image: p.images[0] || p.url_picture,
          rating: p.rating || 4.5,
          reviews: p.reviewCount || 0,
          badge,
          delivery,
          credit: formatPrice(credit),
          brand: p.brand || 'Без бренда'
        }
      })
  }, [activeProducts])

  // Извлекаем уникальные категории
  const allCategories = useMemo(() => {
    const categorySet = new Set()
    productsData.forEach(p => {
      if (p.category_full_path) {
        const mainCategory = p.category_full_path.split(' > ')[0]
        categorySet.add(mainCategory)
      }
    })
    return Array.from(categorySet).slice(0, 10)
  }, [])

  // Извлекаем популярные бренды
  const brands = useMemo(() => {
    const brandCounts = {}
    productsData.forEach(p => {
      if (p.brand && p.brand !== 'Без бренда') {
        brandCounts[p.brand] = (brandCounts[p.brand] || 0) + 1
      }
    })
    
    return Object.entries(brandCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 12)
      .map(([name, count]) => {
        // Генерируем инициалы для логотипа
        const words = name.split(' ')
        let logo = ''
        if (words.length > 1) {
          logo = (words[0][0] + words[1][0]).toUpperCase()
        } else {
          // Берем первые 2 символа, учитывая кириллицу
          const firstTwo = name.substring(0, 2).toUpperCase()
          logo = firstTwo.length === 2 ? firstTwo : firstTwo + ' '
        }
        
        // Цвет для бренда (на основе имени)
        const colors = ['#005BFF', '#00C853', '#FF5722', '#9C27B0', '#FF9800', '#2196F3', '#E91E63', '#4CAF50', '#FF6B9D', '#FFB800', '#9E9E9E', '#607D8B']
        const colorIndex = name.charCodeAt(0) % colors.length
        
        return { name, logo, count, color: colors[colorIndex] }
      })
  }, [])

  // Категории для сайдбара с подсчетом товаров
  const sideCategories = useMemo(() => {
    const categoryCounts = {}
    productsData.forEach(p => {
      if (p.category_full_path) {
        const mainCategory = p.category_full_path.split(' > ')[0]
        categoryCounts[mainCategory] = (categoryCounts[mainCategory] || 0) + 1
      }
    })
    
    return Object.entries(categoryCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([name, count]) => ({ name, count }))
  }, [])

  // Категории для табов (из данных, первые 6)
  const categoryTabs = useMemo(() => {
    return allCategories.slice(0, 6).map(cat => cat.toUpperCase())
  }, [allCategories])

  // Категории для фильтров
  const categories = useMemo(() => {
    const cats = [{ id: 'all', name: 'Все', icon: '⊞' }]
    allCategories.slice(0, 6).forEach((cat, index) => {
      const icons = ['🪑', '🛋', '🚪', '🛏', '💺', '📦']
      cats.push({ id: cat.toLowerCase().replace(/\s+/g, '-'), name: cat, icon: icons[index] || '📦' })
    })
    return cats
  }, [allCategories])

  // Функция для получения SVG иконки категории (упрощенные)
  const getCategoryIcon = (categoryName) => {
    const iconMap = {
      'Товары для дома и дачи': (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="12" y="18" width="40" height="32" rx="6" fill="#005BFF"/>
          <rect x="18" y="24" width="28" height="3" rx="1.5" fill="white"/>
          <rect x="18" y="32" width="20" height="3" rx="1.5" fill="white"/>
          <circle cx="50" cy="28" r="3" fill="white"/>
        </svg>
      ),
      'Детские товары': (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="28" r="14" fill="#FF6B9D"/>
          <circle cx="28" cy="26" r="2.5" fill="white"/>
          <circle cx="36" cy="26" r="2.5" fill="white"/>
          <path d="M24 36c0 4 4 8 8 8s8-4 8-8" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        </svg>
      ),
      'Товары для животных': (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="16" fill="#FFB800"/>
          <circle cx="26" cy="28" r="3" fill="white"/>
          <circle cx="38" cy="28" r="3" fill="white"/>
          <path d="M24 38c2 3 6 4 8 4s6-1 8-4" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        </svg>
      ),
      'Подарки, товары для праздников': (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="18" y="20" width="28" height="28" rx="5" fill="#E91E63"/>
          <path d="M32 20v28M18 34h28" stroke="white" strokeWidth="3"/>
          <circle cx="26" cy="30" r="2" fill="white"/>
          <circle cx="38" cy="30" r="2" fill="white"/>
        </svg>
      ),
      'Спорт, туризм': (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="16" fill="#00C853"/>
          <path d="M24 24l16 16M40 24l-16 16" stroke="white" strokeWidth="4" strokeLinecap="round"/>
        </svg>
      ),
      'Красота и здоровье': (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="16" fill="#9C27B0"/>
          <circle cx="32" cy="32" r="10" fill="white" opacity="0.3"/>
          <path d="M32 22v20M22 32h20" stroke="white" strokeWidth="3" strokeLinecap="round"/>
        </svg>
      ),
      'Электроника': (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="14" y="18" width="36" height="28" rx="4" fill="#2196F3"/>
          <rect x="18" y="22" width="28" height="2" rx="1" fill="white"/>
          <rect x="18" y="28" width="20" height="2" rx="1" fill="white"/>
          <circle cx="48" cy="30" r="2.5" fill="white"/>
        </svg>
      ),
      'Бытовая техника': (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="16" y="20" width="32" height="28" rx="4" fill="#FF5722"/>
          <circle cx="32" cy="34" r="6" fill="white" opacity="0.4"/>
          <rect x="20" y="42" width="24" height="2" rx="1" fill="white"/>
        </svg>
      ),
      'Одежда': (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M24 18h16l-2 18H26l-2-18z" fill="#FF9800"/>
          <path d="M28 24h8M28 28h8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      'Продукты питания': (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="16" fill="#4CAF50"/>
          <path d="M24 28l8 8 12-12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    }
    
    return iconMap[categoryName] || (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="18" y="20" width="28" height="28" rx="5" fill="#666"/>
        <path d="M28 32h8M32 28v8" stroke="white" strokeWidth="3" strokeLinecap="round"/>
      </svg>
    )
  }

  // Категории для карточек (с иконками)
  const categoryItems = useMemo(() => {
    return allCategories.slice(0, 6).map(cat => ({
      name: cat,
      icon: getCategoryIcon(cat)
    }))
  }, [allCategories])

  // Вычисляем максимальную цену из продуктов
  const maxPrice = useMemo(() => {
    if (products.length === 0) return 500000
    return Math.max(...products.map(p => p.price))
  }, [products])
  
  const [priceRange, setPriceRange] = useState([0, 500000])
  
  // Обновляем priceRange когда maxPrice изменится
  useEffect(() => {
    if (maxPrice > 0) {
      setPriceRange([0, Math.min(maxPrice, 500000)])
    }
  }, [maxPrice])

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

  // Фильтрация продуктов
  let filtered = activeCategory === 'Все' 
    ? products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : products.filter(p => {
        const selectedCategory = categories.find(c => c.name === activeCategory)
        if (!selectedCategory || selectedCategory.id === 'all') return true
        return p.category === activeCategory
      }).filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
  
  filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])
  filtered = filtered.filter(p => p.rating >= minRating)
  
  if (sortBy === 'price-asc') {
    filtered = [...filtered].sort((a, b) => a.price - b.price)
  } else if (sortBy === 'price-desc') {
    filtered = [...filtered].sort((a, b) => b.price - a.price)
  } else if (sortBy === 'rating') {
    filtered = [...filtered].sort((a, b) => b.rating - a.rating)
  }

  // Pagination
  const totalPages = Math.ceil(filtered.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedProducts = filtered.slice(startIndex, startIndex + itemsPerPage)

  useEffect(() => {
    setCurrentPage(1)
  }, [activeCategory, priceRange, minRating, sortBy])

  return (
    <div className="store-page">
      {/* Header */}
      <header className={`store-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="header-container">
          <div className="header-top">
            <div className="header-left">
              <div className="store-logo">
                <div className="logo-icon">E</div>
                <div className="logo-info">
                  <span className="logo-name">Elmart</span>
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
                placeholder="Искать на Elmart"
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
                  {allCategories.slice(0, 5).map((cat, index) => (
                    <a 
                      key={index} 
                      href="#" 
                      onClick={(e) => {
                        e.preventDefault()
                        setActiveCategory(cat)
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                      }}
                    >
                      {cat}
                    </a>
                  ))}
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
          <h2 className="category-title">{activeCategory === 'Все' ? (allCategories[0] || 'Категории') : activeCategory}</h2>
          <div className="category-tabs">
            {categoryTabs.map((tab, index) => {
              const categoryName = allCategories[index] || ''
              const isActive = activeCategory === categoryName || (index === 0 && activeCategory === 'Все')
              return (
                <button 
                  key={index} 
                  className={`category-tab ${isActive ? 'active' : ''}`}
                  onClick={() => {
                    if (index === 0) {
                      setActiveCategory('Все')
                    } else {
                      setActiveCategory(categoryName)
                    }
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                >
                  {tab}
                </button>
              )
            })}
          </div>
        </div>
        
        <div className="category-grid-block">
          <div className="category-grid">
            {categoryItems.map((item, index) => (
              <div 
                key={index} 
                className="category-card"
                onClick={() => {
                  setActiveCategory(item.name)
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
                style={{ cursor: 'pointer' }}
              >
                <div className="category-image">
                  {item.icon}
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
                <div className="brand-logo" style={{ background: brand.color }}>
                  {brand.logo}
                </div>
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
                  <li 
                    key={i} 
                    className={activeCategory === cat.name ? 'active' : ''}
                  >
                    <a 
                      href="#" 
                      onClick={(e) => {
                        e.preventDefault()
                        setActiveCategory(cat.name)
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                      }}
                    >
                      {cat.name}
                    </a>
                    <span className="category-count">({cat.count})</span>
                  </li>
                ))}
                <li className="show-all">
                  <a 
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      setActiveCategory('Все')
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                  >
                    Посмотреть все
                  </a>
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
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value) || maxPrice])}
                />
              </div>
              <div className="price-slider-container">
                <input
                  type="range"
                  min="0"
                  max={maxPrice}
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
              <div className="products-header-top">
                <div className="products-sort">
                  <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="popular">Популярные</option>
                    <option value="price-asc">Сначала дешевле</option>
                    <option value="price-desc">Сначала дороже</option>
                    <option value="rating">По рейтингу</option>
                  </select>
                </div>
                <button className="mobile-filters-btn" onClick={() => setShowMobileFilters(!showMobileFilters)}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="4" y1="6" x2="20" y2="6"/>
                    <line x1="4" y1="12" x2="20" y2="12"/>
                    <line x1="4" y1="18" x2="20" y2="18"/>
                  </svg>
                  Фильтры
                </button>
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

            {/* Mobile Filters */}
            {showMobileFilters && (
              <div className="mobile-filters">
                <div className="mobile-filters-header">
                  <h3>Фильтры</h3>
                  <button onClick={() => setShowMobileFilters(false)}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18"/>
                      <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  </button>
                </div>
                <div className="mobile-filters-content">
                  <div className="mobile-filter-group">
                    <h4>Категория</h4>
                    <ul className="mobile-category-list">
                      {sideCategories.map((cat, i) => (
                        <li key={i}>
                          <label>
                            <input type="radio" name="mobile-category" />
                            <span>{cat.name}</span>
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mobile-filter-group">
                    <h4>Цена, ₸</h4>
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
                        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value) || maxPrice])}
                      />
                    </div>
                    <div className="price-slider-container">
                      <input
                        type="range"
                        min="0"
                        max={maxPrice}
                        step="1000"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                        className="price-slider"
                      />
                    </div>
                  </div>
                  <div className="mobile-filter-group">
                    <h4>Рейтинг</h4>
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
                  </div>
                </div>
                <div className="mobile-filters-footer">
                  <button className="apply-filters-btn" onClick={() => setShowMobileFilters(false)}>
                    Применить
                  </button>
                </div>
              </div>
            )}

            <div className="products-grid">
              {paginatedProducts.map((product) => (
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

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pagination">
                <button 
                  className="pagination-btn"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 18l-6-6 6-6"/>
                  </svg>
                </button>
                
                <div className="pagination-pages">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={page}
                          className={`pagination-page ${currentPage === page ? 'active' : ''}`}
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </button>
                      )
                    } else if (page === currentPage - 2 || page === currentPage + 2) {
                      return <span key={page} className="pagination-ellipsis">...</span>
                    }
                    return null
                  })}
                </div>

                <button 
                  className="pagination-btn"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                </button>
              </div>
            )}

            {filtered.length === 0 && (
              <div className="no-products">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="M21 21l-4.35-4.35"/>
                </svg>
                <p>Товары не найдены</p>
                <span>Попробуйте изменить параметры фильтрации</span>
              </div>
            )}
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
          <span>Работает на <strong>Elmart</strong></span>
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
                    Безопасная оплата через <span>Freedom</span>
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
                      value="freedom"
                      checked={checkoutForm.paymentMethod === 'freedom'}
                      onChange={(e) => setCheckoutForm({...checkoutForm, paymentMethod: e.target.value})}
                    />
                    <div className="payment-option-content">
                      <div className="payment-icon freedom">
                        <img src={FreedomIcon} alt="Freedom" />
                      </div>
                      <div>
                        <div className="payment-name">Freedom</div>
                        <div className="payment-desc">Оплата через Freedom</div>
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
