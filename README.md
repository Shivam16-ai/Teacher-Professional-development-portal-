# Teacher Professional Development Platform (TPDP)

A modern teacher platform built with Vite and React with complete authentication system, professional development courses, job portal, and career resources.

![TPDP Platform](public/images/logo/logo-light.svg)

## 🔐 Authentication System

This project includes a **complete authentication system** with registration and login functionality.

### ⚠️ Important: Users MUST register before they can login!

#### Quick Start:
1. Navigate to `/register` to create a new account
2. Fill in all required fields (name, email, password, subject, qualification)
3. After successful registration, you'll be automatically logged in
4. To logout, click the "Logout" button in the navigation bar

📖 **See [AUTHENTICATION.md](./AUTHENTICATION.md) for complete authentication documentation**

## 🎨 Image Assets

The project includes professionally designed SVG images throughout the UI:
- **Logo & Branding** in navigation and auth pages
- **Course Thumbnails** for all course categories
- **Profile Avatars** for user profiles
- **Illustrations** for empty states, loading, success/error messages
- **Feature Icons** for chat, quiz, jobs, analytics, and more

📖 **See [IMAGE_ASSETS.md](./IMAGE_ASSETS.md) for complete image documentation**

## Features

- **Authentication System**: Complete registration and login with validation
- Dashboard with analytics
- Course management
- Quiz system
- Timetable management
- Job listings
- Interview preparation
- Resume builder
- Live chat
- Chatbot support
- Leaderboard
- Student profiles
- Contact management

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Styling**: CSS3

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/      # Reusable React components
├── pages/          # Page components (routes)
├── utils/          # Utility functions (auth, api)
├── css/            # Stylesheets
├── App.tsx         # Main App component
└── main.tsx        # Entry point
```

## Environment Variables

A `.env` file already exists. You can modify it if needed:

```env
VITE_API_URL=http://localhost:3000/api
```

## 🔑 Authentication Features

- ✅ User registration with full validation
- ✅ Email uniqueness check
- ✅ Password strength validation (min 6 characters)
- ✅ Login with registered credentials only
- ✅ Protected routes (requires authentication)
- ✅ Logout functionality
- ✅ Session management
- ✅ Password visibility toggles
- ✅ Loading states and error handling
- ✅ Beautiful, responsive UI

### Security Notes
- Currently uses localStorage for demo purposes
- Passwords should be hashed in production
- Implement backend API for production use

## Development

### Hot Module Replacement (HMR)

Vite provides out-of-the-box HMR for fast development experience.

### Building

```bash
npm run build
```

This generates optimized production builds in the `dist` folder.

## License

MIT
