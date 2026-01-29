import { useNavigate } from 'react-router-dom'


function Landing() {
  const navigate = useNavigate()

  const problems = [
    { icon: 'minus', text: 'После удержания комиссии ушли в минус?' },
    { icon: 'wrench', text: 'На маркетплейсе снова технические работы?' },
    { icon: 'chart', text: 'Демпинг конкурентов опять "съел" всю прибыль?' },
    { icon: 'globe', text: 'Хотели бы иметь свой сайт, но в шоке от цен на разработку?' },
    { icon: 'users', text: 'Устали пытаться выделиться среди других продавцов в карточке?' },
    { icon: 'clock', text: 'Создали сайт, но не успеваете актуализировать ассортимент?' },
  ]

  const maslowPyramid = [
    'Самореализация — потенциал, творчество',
    'Признание — самоуважение, статус',
    'Социальные — дружба, принадлежность',
    'Безопасность — защищённость, стабильность',
    'Физиология — еда, вода, жильё',
  ]

  const kaspiPyramid = [
    'Рост — свой сайт, другие рынки',
    'Признание — уникальность, бренд',
    'Видимость — отличие от конкурентов',
    'Безопасность — защита от демпинга',
    'Базовое — минимизация комиссий',
  ]

  const stats = [
    { value: '<10', unit: 'сек', label: 'занимает активация вашего сайта' },
    { value: '4', unit: '%', label: 'фиксированная комиссия за продажи' },
    { value: '~x2', unit: '', label: 'увеличение среднего чека с ИИ рассылкой' },
    { value: '0', unit: '₸', label: 'плата за использование сервиса' },
  ]

  const features = [
    'Персональный онлайн-магазин без конкурентов',
    'Автоматическая синхронизация с Kaspi',
    'Умная ИИ рассылка релевантным клиентам',
    'Создание личного бренда',
  ]

  const heroProducts = [
    { name: 'Кресло VT-8005', price: '3 979 ₸', image: '/chair.svg' },
    { name: 'Mebel Style Rumba чёрный', price: '14 750 ₸', image: '/sofa.svg' },
    { name: 'Comfort шкаф XL', price: '64 879 ₸', image: '/wardrobe.svg' },
    { name: 'Кровать Elite Comfort', price: '205 795 ₸', image: '/bed.svg' },
  ]

  const deviceProducts = [
    { name: 'Mebel Style Tower Grand', price: '26 747 ₸', image: '/armchair.svg' },
    { name: 'AutoBrand Элис 2.6', price: '205 795 ₸', image: '/sofa.svg' },
    { name: 'Comfort чила XL', price: '64 879 ₸', image: '/chair.svg' },
  ]

  const ProblemIcon = ({ type }) => {
    const icons = {
      minus: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/><path d="M8 12h8"/>
        </svg>
      ),
      wrench: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
        </svg>
      ),
      chart: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/>
        </svg>
      ),
      globe: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/><path d="M2 12h20"/>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
        </svg>
      ),
      users: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
      clock: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
        </svg>
      ),
    }
    return icons[type] || null
  }

  const handleStart = () => {
    navigate('/store')
  }

  return (
    <>
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <span className="logo-ss">SS</span>
            <span className="logo-tap">Tap</span>
          </div>
          <nav className="header-nav">
            <a href="#problems" className="nav-link">Проблемы</a>
            <a href="#solution" className="nav-link">Решение</a>
            <a href="#stats" className="nav-link">В цифрах</a>
            <button className="btn-primary" onClick={handleStart}>Начать бесплатно</button>
          </nav>
        </div>
      </header>

      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-badge">
              <span className="badge-dot"></span>
              Новый сервис от Sale Scout
            </div>
            <h1>Твой путь к <span className="highlight">прибыли</span> на Kaspi</h1>
            <p className="hero-description">
              SS Tap — это персональный, быстрый и удобный путь к личному бренду и собственному онлайн магазину без конкурентов
            </p>
            <div className="hero-buttons">
              <button className="btn-primary" onClick={handleStart}>
                Создать магазин
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
              <button className="btn-secondary">Узнать больше</button>
            </div>
          </div>
          
          <div className="hero-visual">
            <div className="hero-mockup">
              <div className="mockup-browser">
                <div className="browser-header">
                  <span className="browser-dot red"></span>
                  <span className="browser-dot yellow"></span>
                  <span className="browser-dot green"></span>
                </div>
                <div className="browser-content">
                  <div className="shop-preview">
                    <div className="shop-header">
                      <div className="shop-logo">
                        <div className="shop-logo-icon">K</div>
                        <span>ТОО "Autodata"</span>
                      </div>
                      <button className="shop-cart-btn">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                        </svg>
                        Корзина
                      </button>
                    </div>
                    <div className="product-grid">
                      {heroProducts.map((product, index) => (
                        <div key={index} className="product-card">
                          <div className="product-image">
                            <img src={product.image} alt={product.name} />
                          </div>
                          <div className="product-name">{product.name}</div>
                          <div className="product-price">{product.price}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="problems" id="problems">
        <div className="problems-content">
          <div className="section-badge">Знакомые проблемы?</div>
          <h2>Каждый продавец на Kaspi сталкивался с этим:</h2>
          <div className="problems-list">
            {problems.map((problem, index) => (
              <div key={index} className="problem-item" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="problem-icon"><ProblemIcon type={problem.icon} /></div>
                <div className="problem-text">{problem.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pyramids">
        <div className="pyramids-content">
          <div className="pyramids-header">
            <h2>Потребности человека vs. Потребности продавца на Kaspi</h2>
          </div>
          <div className="pyramids-grid">
            <div className="pyramid-column">
              <h3 className="pyramid-title">Пирамида Маслоу</h3>
              <p className="pyramid-subtitle">5 основных потребностей человечества</p>
              <div className="pyramid pyramid-maslow">
                {maslowPyramid.map((level, index) => (
                  <div key={index} className="pyramid-level">{level}</div>
                ))}
              </div>
            </div>
            <div className="pyramid-column">
              <h3 className="pyramid-title">Пирамида продавца на Kaspi</h3>
              <p className="pyramid-subtitle">Тут немного сложнее...</p>
              <div className="pyramid pyramid-kaspi">
                {kaspiPyramid.map((level, index) => (
                  <div key={index} className="pyramid-level">{level}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="solution" id="solution">
        <div className="solution-content">
          <div className="solution-visual">
            <div className="device-mockups">
              <div className="device device-tablet">
                <div className="device-screen">
                  <div className="screen-header">
                    <div className="screen-logo">SS Tap Store</div>
                    <span className="screen-rating">4.9</span>
                  </div>
                  <div className="screen-items">
                    {deviceProducts.map((product, index) => (
                      <div key={index} className="screen-item">
                        <div className="screen-item-image">
                          <img src={product.image} alt={product.name} />
                        </div>
                        <div className="screen-item-info">
                          <div className="screen-item-name">{product.name}</div>
                          <div className="screen-item-price">{product.price}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="screen-cart-btn">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                    </svg>
                    Корзина · 3
                  </div>
                </div>
              </div>
              <div className="device device-phone">
                <div className="device-screen">
                  <div className="screen-header"><div className="screen-logo">Корзина</div></div>
                  <div className="screen-items">
                    <div className="screen-item">
                      <div className="screen-item-image"><img src="/chair.svg" alt="Product" /></div>
                      <div className="screen-item-info">
                        <div className="screen-item-name">Mebel Style Rumba</div>
                        <div className="screen-item-price">14 750 ₸</div>
                      </div>
                    </div>
                    <div className="screen-item">
                      <div className="screen-item-image"><img src="/armchair.svg" alt="Product" /></div>
                      <div className="screen-item-info">
                        <div className="screen-item-name">Comfort чила</div>
                        <div className="screen-item-price">64 879 ₸</div>
                      </div>
                    </div>
                  </div>
                  <div className="screen-cart-btn">Оформить</div>
                </div>
              </div>
              <div className="device device-phone-2">
                <div className="device-screen">
                  <div className="screen-header"><div className="screen-logo">Оформление</div></div>
                  <div className="screen-items">
                    <div className="form-field">
                      <div className="form-label">Номер телефона</div>
                      <div className="form-value">+7 (775) 638-5564</div>
                    </div>
                    <div className="form-field">
                      <div className="form-label">Адрес доставки</div>
                      <div className="form-value">Алматы, Бухар жырау</div>
                    </div>
                  </div>
                  <div className="screen-cart-btn kaspi-btn">Оплатить Kaspi</div>
                </div>
              </div>
            </div>
          </div>
          <div className="solution-text">
            <h2>Мы закроем каждую из ваших потребностей с <span className="highlight">SS Tap</span></h2>
            <p className="solution-description">
              SS Tap — это ваш персональный, быстрый и удобный путь к личному бренду, 
              собственному онлайн магазину без конкурентов, автоматической загрузке 
              и синхронизации товаров с Kaspi магазином.
            </p>
            <div className="solution-features">
              {features.map((feature, index) => (
                <div key={index} className="feature-item">
                  <div className="feature-check">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <span className="feature-text">{feature}</span>
                </div>
              ))}
            </div>
            <button className="btn-primary" onClick={handleStart}>
              Попробовать бесплатно
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>
      </section>

      <section className="stats" id="stats">
        <div className="stats-content">
          <div className="stats-header">
            <h2><span className="highlight">SS Tap</span> в цифрах</h2>
          </div>
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-value">{stat.value}<span className="accent">{stat.unit}</span></div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="cta-content">
          <h2>Готовы увеличить свою прибыль?</h2>
          <p className="cta-description">Присоединяйтесь к тысячам продавцов, которые уже используют SS Tap</p>
          <button className="btn-cta" onClick={handleStart}>
            Создать магазин бесплатно
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <span className="logo-ss">SS</span>
            <span>Tap</span>
          </div>
          <p className="footer-text">Сервис от команды <span className="footer-brand">Sale Scout</span> © 2026</p>
        </div>
      </footer>
    </>
  )
}

export default Landing
