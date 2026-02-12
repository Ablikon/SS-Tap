import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import Landing from './pages/Landing'
import Store from './pages/Store'
// import Dashboard from './pages/Dashboard'
import './index.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Store />} />
        {/* <Route path="/store" element={<Store />} />
        <Route path="/dashboard" element={<Dashboard />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
