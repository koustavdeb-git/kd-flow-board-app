import { useState } from 'react'
import AppRoutes from './routes/AppRoutes'
import MainLayout from './components/layout/MainLayout'
import Dashboard from './pages/Dashboard/Dashboard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AppRoutes />

      
    </>
  )
}

export default App
