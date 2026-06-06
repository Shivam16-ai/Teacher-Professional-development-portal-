// Authentication utilities

export interface User {
  id: string
  name: string
  email: string
  subject?: string
  qualification?: string
  school?: string
  createdAt: string
  [key: string]: unknown
}

export interface RegisteredUser extends User {
  password: string
}

// Token management
export const isLoggedIn = (): boolean => {
  return !!localStorage.getItem('token')
}

export const getToken = (): string | null => {
  return localStorage.getItem('token')
}

export const setToken = (token: string): void => {
  localStorage.setItem('token', token)
}

export const removeToken = (): void => {
  localStorage.removeItem('token')
}

// Current user management
export const getUser = (): User | null => {
  const userStr = localStorage.getItem('user')
  return userStr ? (JSON.parse(userStr) as User) : null
}

export const setUser = (user: User): void => {
  localStorage.setItem('user', JSON.stringify(user))
}

export const removeUser = (): void => {
  localStorage.removeItem('user')
}

export const logout = (): void => {
  removeToken()
  removeUser()
}

// Registered users database (stored in localStorage)
const USERS_KEY = 'registered_users'

export const getRegisteredUsers = (): RegisteredUser[] => {
  const usersStr = localStorage.getItem(USERS_KEY)
  return usersStr ? JSON.parse(usersStr) : []
}

export const saveRegisteredUser = (user: RegisteredUser): void => {
  const users = getRegisteredUsers()
  users.push(user)
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export const findUserByEmail = (email: string): RegisteredUser | null => {
  const users = getRegisteredUsers()
  return users.find(u => u.email.toLowerCase() === email.toLowerCase()) || null
}

export const isEmailRegistered = (email: string): boolean => {
  return findUserByEmail(email) !== null
}

export const validateCredentials = (email: string, password: string): RegisteredUser | null => {
  const user = findUserByEmail(email)
  if (user && user.password === password) {
    return user
  }
  return null
}
