import { Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from '../pages/Dashboard/Dashboard'
import Project from '../pages/Project/Project'
import MainLayout from '../components/layout/MainLayout'
import Login from '../pages/Login/Login'
import Register from '../pages/Register/Register'
import ProtectedRoute from './ProtectedRoute'
import Board from '../pages/Board/Board'

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
        <Route path="/" element={<Navigate replace to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects" element={<Project />} />
        <Route path="/projects/:projectId" element={<Board />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
