import axios, { AxiosError } from 'axios'
import { getToken, removeToken } from './auth'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000 // 10 seconds
})

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    console.error('Request interceptor error:', error)
    return Promise.reject(error)
  }
)

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Handle unauthorized access
    if (error.response?.status === 401) {
      removeToken()
      window.location.href = '/login'
    }
    
    // Handle network errors
    if (!error.response) {
      console.error('Network error:', error.message)
    }
    
    return Promise.reject(error)
  }
)

// API Methods
export const authAPI = {
  register: (data: any) => api.post('/auth/register', data),
  login: (data: any) => api.post('/auth/login', data),
  getProfile: () => api.get('/auth/me'),
  updateProfile: (data: any) => api.put('/auth/profile', data),
  changePassword: (data: any) => api.put('/auth/change-password', data),
}

export const coursesAPI = {
  getAll: (params?: any) => api.get('/courses', { params }),
  getById: (id: number) => api.get(`/courses/${id}`),
  enroll: (id: number) => api.post(`/courses/${id}/enroll`),
  getMyEnrollments: () => api.get('/courses/my/enrollments'),
  updateProgress: (id: number, data: any) => api.put(`/courses/${id}/progress`, data),
}

export const jobsAPI = {
  getAll: (params?: any) => api.get('/jobs', { params }),
  getById: (id: number) => api.get(`/jobs/${id}`),
  apply: (id: number, data: any) => api.post(`/jobs/${id}/apply`, data),
  getMyApplications: () => api.get('/jobs/my/applications'),
}

export const quizzesAPI = {
  getAll: (params?: any) => api.get('/quizzes', { params }),
  getById: (id: number) => api.get(`/quizzes/${id}`),
  start: (id: number) => api.post(`/quizzes/${id}/start`),
  submit: (id: number, data: any) => api.post(`/quizzes/${id}/submit`, data),
  getMyAttempts: () => api.get('/quizzes/my/attempts'),
}

export const notificationsAPI = {
  getAll: (params?: any) => api.get('/notifications', { params }),
  markAsRead: (id: number) => api.put(`/notifications/${id}/read`),
  markAllAsRead: () => api.put('/notifications/read/all'),
  delete: (id: number) => api.delete(`/notifications/${id}`),
}

export const timetableAPI = {
  getAll: (params?: any) => api.get('/timetable', { params }),
  create: (data: any) => api.post('/timetable', data),
  update: (id: number, data: any) => api.put(`/timetable/${id}`, data),
  delete: (id: number) => api.delete(`/timetable/${id}`),
}

export const analyticsAPI = {
  getDashboard: () => api.get('/analytics/dashboard'),
  getCourseProgress: () => api.get('/analytics/courses/progress'),
  getQuizPerformance: () => api.get('/analytics/quizzes/performance'),
}

export const chatAPI = {
  getMessages: (params?: any) => api.get('/chat/messages', { params }),
  sendMessage: (data: any) => api.post('/chat/messages', data),
  getConversations: () => api.get('/chat/conversations'),
  deleteMessage: (id: number) => api.delete(`/chat/messages/${id}`),
}

export const leaderboardAPI = {
  getLeaderboard: (params?: any) => api.get('/leaderboard', { params }),
  getMyRank: (params?: any) => api.get('/leaderboard/my-rank', { params }),
}

export default api
