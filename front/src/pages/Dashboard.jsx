import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Dashboard.css'

function Dashboard() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')

  const stats = [
    { label: 'Продажи сегодня', value: '127 450 ₸', change: '+12%', positive: true },
    { label: 'Заказов', value: '24', change: '+8%', positive: true },
    { label: 'Посетителей', value: '1 247', change: '+23%', positive: true },
    { label: 'Конверсия', value: '3.2%', change: '-0.4%', positive: false },
  ]

  const products = [
    { id: 1, name: 'Кресло VT-8005', sku: 'VT-8005', price: '3 979 ₸', stock: 45, status: 'active', image: '/chair.svg' },
    { id: 2, name: 'Mebel Style Rumba чёрный', sku: 'MS-001', price: '14 750 ₸', stock: 12, status: 'active', image: '/sofa.svg' },
    { id: 3, name: 'Comfort шкаф XL', sku: 'CF-XL01', price: '64 879 ₸', stock: 8, status: 'active', image: '/wardrobe.svg' },
    { id: 4, name: 'Кровать Elite Comfort', sku: 'EC-200', price: '205 795 ₸', stock: 3, status: 'low', image: '/bed.svg' },
    { id: 5, name: 'Кресло Modern Grey', sku: 'KM-GR1', price: '89 990 ₸', stock: 0, status: 'out', image: '/armchair.svg' },
  ]

  const orders = [
    { id: '#2847', customer: 'Алексей М.', items: 2, total: '18 729 ₸', status: 'new', time: '5 мин назад' },
    { id: '#2846', customer: 'Мария К.', items: 1, total: '64 879 ₸', status: 'processing', time: '23 мин назад' },
    { id: '#2845', customer: 'Дмитрий Н.', items: 3, total: '234 544 ₸', status: 'shipped', time: '1 час назад' },
    { id: '#2844', customer: 'Анна С.', items: 1, total: '3 979 ₸', status: 'delivered', time: '2 часа назад' },
  ]

  const salesData = [35, 52, 48, 65, 72, 58, 82, 95, 78, 88, 92, 105]
  const maxSales = Math.max(...salesData)

  const menuItems = [
    { id: 'overview', label: 'Обзор', icon: 'home' },
    { id: 'products', label: 'Товары', icon: 'box' },
    { id: 'orders', label: 'Заказы', icon: 'cart', badge: 3 },
    { id: 'mailings', label: 'Рассылки', icon: 'mail' },
    { id: 'analytics', label: 'Аналитика', icon: 'chart' },
    { id: 'settings', label: 'Настройки', icon: 'settings' },
  ]

  const Icon = ({ name }) => {
    const icons = {
      home: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
      box: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>,
      cart: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>,
      mail: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
      chart: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
      settings: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
      search: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
      bell: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
      logout: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
      plus: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
      link: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>,
    }
    return icons[name] || null
  }

  const getStatusLabel = (status) => {
    const labels = {
      new: 'Новый',
      processing: 'В обработке',
      shipped: 'Отправлен',
      delivered: 'Доставлен',
      active: 'В наличии',
      low: 'Мало',
      out: 'Нет в наличии',
    }
    return labels[status] || status
  }

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo" onClick={() => navigate('/')}>
            <span className="logo-ss">SS</span>
            <span className="logo-tap">Tap</span>
          </div>
        </div>
        
        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <span className="nav-icon"><Icon name={item.icon} /></span>
              <span className="nav-label">{item.label}</span>
              {item.badge && <span className="nav-badge">{item.badge}</span>}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="store-info">
            <div className="store-icon">K</div>
            <div className="store-details">
              <div className="store-name">ТОО "Autodata"</div>
              <div className="store-link">
                autodata.sstap.kz
                <span className="link-icon"><Icon name="link" /></span>
              </div>
            </div>
          </div>
          <button className="logout-btn" onClick={() => navigate('/')}>
            <Icon name="logout" />
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Header */}
        <header className="dashboard-header">
          <div className="header-left">
            <h1 className="page-title">
              {activeTab === 'overview' && 'Обзор'}
              {activeTab === 'products' && 'Товары'}
              {activeTab === 'orders' && 'Заказы'}
              {activeTab === 'mailings' && 'Рассылки'}
              {activeTab === 'analytics' && 'Аналитика'}
              {activeTab === 'settings' && 'Настройки'}
            </h1>
          </div>
          <div className="header-right">
            <div className="search-box">
              <span className="search-icon"><Icon name="search" /></span>
              <input type="text" placeholder="Поиск..." className="search-input" />
            </div>
            <button className="notification-btn">
              <Icon name="bell" />
              <span className="notification-dot"></span>
            </button>
            <div className="user-avatar">АБ</div>
          </div>
        </header>

        {/* Content */}
        <div className="dashboard-content">
          {activeTab === 'overview' && (
            <>
              {/* Stats Grid */}
              <div className="stats-row">
                {stats.map((stat, index) => (
                  <div key={index} className="stat-box">
                    <div className="stat-header">
                      <span className="stat-label">{stat.label}</span>
                      <span className={`stat-change ${stat.positive ? 'positive' : 'negative'}`}>
                        {stat.change}
                      </span>
                    </div>
                    <div className="stat-value">{stat.value}</div>
                  </div>
                ))}
              </div>

              <div className="content-grid">
                {/* Chart */}
                <div className="card chart-card">
                  <div className="card-header">
                    <h3>Продажи за 12 месяцев</h3>
                    <div className="card-actions">
                      <select className="chart-select">
                        <option>2026</option>
                        <option>2025</option>
                      </select>
                    </div>
                  </div>
                  <div className="chart-container">
                    <div className="chart-bars">
                      {salesData.map((value, index) => (
                        <div key={index} className="chart-bar-wrapper">
                          <div 
                            className="chart-bar" 
                            style={{ height: `${(value / maxSales) * 100}%` }}
                          ></div>
                          <span className="chart-label">
                            {['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'][index]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Recent Orders */}
                <div className="card orders-card">
                  <div className="card-header">
                    <h3>Последние заказы</h3>
                    <button className="link-btn">Все заказы</button>
                  </div>
                  <div className="orders-list">
                    {orders.map((order) => (
                      <div key={order.id} className="order-item">
                        <div className="order-info">
                          <div className="order-id">{order.id}</div>
                          <div className="order-customer">{order.customer}</div>
                          <div className="order-meta">{order.items} товар(а) · {order.time}</div>
                        </div>
                        <div className="order-right">
                          <div className="order-total">{order.total}</div>
                          <span className={`order-status status-${order.status}`}>
                            {getStatusLabel(order.status)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'products' && (
            <div className="products-section">
              <div className="section-header">
                <div className="section-stats">
                  <span className="total-products">{products.length} товаров</span>
                  <span className="synced-label">Синхронизировано с Kaspi</span>
                </div>
                <button className="btn-primary">
                  <Icon name="plus" />
                  Добавить товар
                </button>
              </div>
              
              <div className="products-table">
                <div className="table-header">
                  <div className="th-product">Товар</div>
                  <div className="th-sku">Артикул</div>
                  <div className="th-price">Цена</div>
                  <div className="th-stock">Остаток</div>
                  <div className="th-status">Статус</div>
                </div>
                {products.map((product) => (
                  <div key={product.id} className="table-row">
                    <div className="td-product">
                      <div className="product-thumb">
                        <img src={product.image} alt={product.name} />
                      </div>
                      <span className="product-name">{product.name}</span>
                    </div>
                    <div className="td-sku">{product.sku}</div>
                    <div className="td-price">{product.price}</div>
                    <div className="td-stock">{product.stock} шт</div>
                    <div className="td-status">
                      <span className={`stock-status status-${product.status}`}>
                        {getStatusLabel(product.status)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="orders-section">
              <div className="orders-tabs">
                <button className="order-tab active">Все (24)</button>
                <button className="order-tab">Новые (3)</button>
                <button className="order-tab">В обработке (5)</button>
                <button className="order-tab">Отправленные (8)</button>
                <button className="order-tab">Доставленные (8)</button>
              </div>
              <div className="full-orders-list">
                {orders.concat(orders).map((order, idx) => (
                  <div key={idx} className="full-order-item">
                    <div className="order-main">
                      <div className="order-id">{order.id}</div>
                      <div className="order-customer">{order.customer}</div>
                    </div>
                    <div className="order-items">{order.items} товар(а)</div>
                    <div className="order-time">{order.time}</div>
                    <div className="order-total">{order.total}</div>
                    <span className={`order-status status-${order.status}`}>
                      {getStatusLabel(order.status)}
                    </span>
                    <button className="order-action">Подробнее</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'mailings' && (
            <div className="mailings-section">
              <div className="mailing-banner">
                <div className="banner-content">
                  <h3>Умные ИИ рассылки</h3>
                  <p>Автоматически отправляйте персонализированные предложения вашим клиентам на основе их покупок</p>
                  <button className="btn-primary">Создать рассылку</button>
                </div>
                <div className="banner-stats">
                  <div className="banner-stat">
                    <div className="banner-stat-value">1 247</div>
                    <div className="banner-stat-label">Подписчиков</div>
                  </div>
                  <div className="banner-stat">
                    <div className="banner-stat-value">68%</div>
                    <div className="banner-stat-label">Открытий</div>
                  </div>
                  <div className="banner-stat">
                    <div className="banner-stat-value">12%</div>
                    <div className="banner-stat-label">Конверсия</div>
                  </div>
                </div>
              </div>
              <div className="mailing-history">
                <h4>История рассылок</h4>
                <div className="empty-state">
                  <p>У вас пока нет рассылок</p>
                  <span>Создайте первую рассылку, чтобы увеличить продажи</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="analytics-section">
              <div className="analytics-grid">
                <div className="card">
                  <h3>Источники трафика</h3>
                  <div className="traffic-list">
                    <div className="traffic-item">
                      <span className="traffic-name">Kaspi магазин</span>
                      <div className="traffic-bar"><div style={{ width: '65%' }}></div></div>
                      <span className="traffic-value">65%</span>
                    </div>
                    <div className="traffic-item">
                      <span className="traffic-name">Прямые переходы</span>
                      <div className="traffic-bar"><div style={{ width: '20%' }}></div></div>
                      <span className="traffic-value">20%</span>
                    </div>
                    <div className="traffic-item">
                      <span className="traffic-name">Instagram</span>
                      <div className="traffic-bar"><div style={{ width: '10%' }}></div></div>
                      <span className="traffic-value">10%</span>
                    </div>
                    <div className="traffic-item">
                      <span className="traffic-name">Другое</span>
                      <div className="traffic-bar"><div style={{ width: '5%' }}></div></div>
                      <span className="traffic-value">5%</span>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <h3>Популярные товары</h3>
                  <div className="popular-list">
                    {products.slice(0, 4).map((product, idx) => (
                      <div key={idx} className="popular-item">
                        <span className="popular-rank">{idx + 1}</span>
                        <img src={product.image} alt={product.name} className="popular-img" />
                        <div className="popular-info">
                          <div className="popular-name">{product.name}</div>
                          <div className="popular-sales">152 продажи</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="settings-section">
              <div className="settings-grid">
                <div className="card settings-card">
                  <h3>Информация о магазине</h3>
                  <div className="settings-form">
                    <div className="form-group">
                      <label>Название магазина</label>
                      <input type="text" defaultValue='ТОО "Autodata"' />
                    </div>
                    <div className="form-group">
                      <label>Домен</label>
                      <div className="domain-input">
                        <input type="text" defaultValue="autodata" />
                        <span className="domain-suffix">.sstap.kz</span>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Телефон</label>
                      <input type="text" defaultValue="+7 (775) 638-5564" />
                    </div>
                    <button className="btn-primary">Сохранить</button>
                  </div>
                </div>
                <div className="card settings-card">
                  <h3>Интеграция с Kaspi</h3>
                  <div className="integration-status">
                    <div className="status-indicator connected"></div>
                    <span>Подключено</span>
                  </div>
                  <p className="integration-info">Товары автоматически синхронизируются каждые 15 минут</p>
                  <button className="btn-secondary">Синхронизировать сейчас</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default Dashboard
