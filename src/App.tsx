import { FC } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Analytics from './pages/Analytics'
import Chatbot from './pages/Chatbot'
import Contact from './pages/Contact'
import Courses from './pages/Courses'
import Interview from './pages/Interview'
import Jobs from './pages/Jobs'
import Leaderboard from './pages/Leaderboard'
import LiveChat from './pages/LiveChat'
import Login from './pages/Login'
import Notifications from './pages/Notifications'
import Profile from './pages/Profile'
import Quizzes from './pages/Quizzes'
import Register from './pages/Register'
import Reports from './pages/Reports'
import ResumeBuilder from './pages/ResumeBuilder'
import Timetable from './pages/Timetable'
import ProtectedRoute from './components/ProtectedRoute'
import MainLayout from './components/layouts/MainLayout'
import AuthLayout from './components/layouts/AuthLayout'

const App: FC = () => {
  return (
    <Routes>
      {/* Public Routes with Auth Layout */}
      <Route path="/login" element={
        <AuthLayout>
          <Login />
        </AuthLayout>
      } />
      <Route path="/register" element={
        <AuthLayout>
          <Register />
        </AuthLayout>
      } />
      
      {/* Protected Routes with Main Layout */}
      <Route path="/" element={
        <ProtectedRoute>
          <MainLayout>
            <Dashboard />
          </MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <MainLayout>
            <Dashboard />
          </MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/analytics" element={
        <ProtectedRoute>
          <MainLayout>
            <Analytics />
          </MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/chatbot" element={
        <ProtectedRoute>
          <MainLayout>
            <Chatbot />
          </MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/contact" element={
        <ProtectedRoute>
          <MainLayout>
            <Contact />
          </MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/courses" element={
        <ProtectedRoute>
          <MainLayout>
            <Courses />
          </MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/interview" element={
        <ProtectedRoute>
          <MainLayout>
            <Interview />
          </MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/jobs" element={
        <ProtectedRoute>
          <MainLayout>
            <Jobs />
          </MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/leaderboard" element={
        <ProtectedRoute>
          <MainLayout>
            <Leaderboard />
          </MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/live-chat" element={
        <ProtectedRoute>
          <MainLayout>
            <LiveChat />
          </MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/notifications" element={
        <ProtectedRoute>
          <MainLayout>
            <Notifications />
          </MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/profile" element={
        <ProtectedRoute>
          <MainLayout>
            <Profile />
          </MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/quizzes" element={
        <ProtectedRoute>
          <MainLayout>
            <Quizzes />
          </MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/reports" element={
        <ProtectedRoute>
          <MainLayout>
            <Reports />
          </MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/resume-builder" element={
        <ProtectedRoute>
          <MainLayout>
            <ResumeBuilder />
          </MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/timetable" element={
        <ProtectedRoute>
          <MainLayout>
            <Timetable />
          </MainLayout>
        </ProtectedRoute>
      } />
      
      {/* 404 Redirect */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}

export default App
