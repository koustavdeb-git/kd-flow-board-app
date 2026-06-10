import { Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from '../pages/Dashboard/Dashboard'
import Project from '../pages/Project/Project'
import MainLayout from '../components/layout/MainLayout'
import Login from '../pages/Login/Login'
import Register from '../pages/Register/Register'
import ProtectedRoute from './ProtectedRoute'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={
        <ProtectedRoute>
          <MainLayout />
        </ProtectedRoute>
      }>
        <Route path="/" element={<Navigate replace to="/projects" />} />
        <Route path="/projects" element={<Project />} />
        <Route path="/board/:projectId" element={<Dashboard />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
