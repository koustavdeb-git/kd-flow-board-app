import { Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from '../pages/Dashboard/Dashboard'
import MainLayout from '../components/layout/MainLayout'
import Login from '../pages/Login/Login'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<MainLayout />}>
        <Route path="/" element={<Navigate replace to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
