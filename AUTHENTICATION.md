# Authentication System Documentation

## Overview
This project now includes a complete authentication system with registration and login functionality. Users **must register** before they can log in to access the application.

## Features Implemented

### ✅ User Registration
- **Full validation** of all form fields
- **Email uniqueness check** - prevents duplicate registrations
- **Password requirements** - minimum 6 characters
- **Password confirmation** - must match
- **Required fields**:
  - Full Name
  - Email Address
  - Password
  - Subject Specialization
  - Qualification
- **Optional field**: School/Institution
- **Password visibility toggle** for both password fields
- **Loading states** during registration
- **Success feedback** before redirect
- **Auto-login** after successful registration

### ✅ User Login
- **Email validation** before submission
- **Registration check** - verifies email exists before attempting login
- **Credential validation** - checks password against registered user
- **Clear error messages**:
  - "No account found with this email. Please register first."
  - "Invalid password. Please try again."
  - "Please enter a valid email address"
- **Remember me** checkbox (UI ready)
- **Password visibility toggle**
- **Loading state** during login
- **Forgot password** link (alerts user to contact admin or create new account)

### ✅ Security Features
- Users **cannot login without registering first**
- Passwords are validated during login
- Email validation (proper email format)
- Token-based authentication
- Protected routes - redirects to login if not authenticated
- Logout functionality with confirmation dialog

### ✅ User Experience
- Beautiful, responsive UI matching the project design system
- Loading indicators during async operations
- Real-time validation feedback
- Success/error message boxes with icons
- Smooth transitions and animations
- Accessible form controls
- Mobile-friendly responsive design

## How It Works

### Registration Flow
1. User fills out registration form
2. System validates all fields:
   - Checks if all required fields are filled
   - Validates email format
   - Checks if email is already registered
   - Validates password length (min 6 chars)
   - Confirms passwords match
3. User data is stored in localStorage under `registered_users` key
4. User is automatically logged in
5. Authentication token is generated and stored
6. User is redirected to dashboard

### Login Flow
1. User enters email and password
2. System validates inputs:
   - Checks email format
   - Verifies email is registered
   - Validates password matches the registered password
3. If successful:
   - Authentication token is generated and stored
   - User data (without password) is stored in session
   - User is redirected to dashboard
4. If failed:
   - Clear error message is displayed
   - User can try again or register

### Protected Routes
- All main application routes are protected
- If user tries to access protected route without authentication:
  - Redirected to `/login` page
- Authentication is checked via token in localStorage

### Logout Flow
1. User clicks "Logout" in navigation
2. Confirmation dialog appears
3. If confirmed:
   - Token is removed from localStorage
   - User data is cleared from session
   - User is redirected to login page

## Technical Implementation

### Files Modified/Created

#### `src/utils/auth.ts`
Enhanced authentication utilities:
- `RegisteredUser` interface with password field
- `User` interface without password (for active session)
- `getRegisteredUsers()` - retrieves all registered users
- `saveRegisteredUser()` - saves new user to localStorage
- `findUserByEmail()` - finds user by email address
- `isEmailRegistered()` - checks if email exists
- `validateCredentials()` - validates login credentials

#### `src/pages/Register.tsx`
Complete registration form with:
- Form validation
- Email uniqueness check
- Password strength validation
- Loading states
- Success/error messages
- Password visibility toggles
- Subject specialization dropdown
- Auto-login after registration

#### `src/pages/Login.tsx`
Complete login form with:
- Email validation
- Registration check
- Credential validation
- Loading states
- Clear error messages
- Password visibility toggle
- Remember me checkbox
- Forgot password link

#### `src/components/Navigation.tsx`
Added logout functionality:
- Displays logout button when user is authenticated
- Confirmation dialog before logout
- Redirects to login page after logout

## Data Storage

### LocalStorage Keys
- `token` - Authentication token for current session
- `user` - Current user data (without password)
- `registered_users` - Array of all registered users (includes passwords)

### User Data Structure
```typescript
interface RegisteredUser {
  id: string                    // Unique user ID
  name: string                  // Full name
  email: string                 // Email address (lowercase)
  password: string              // User password
  subject?: string              // Subject specialization
  qualification?: string        // Educational qualification
  school?: string               // School/Institution (optional)
  createdAt: string            // Registration timestamp
}
```

## Testing the Authentication

### Test Scenario 1: New User Registration
1. Navigate to `/register`
2. Fill in all required fields
3. Click "Create My Account"
4. Verify successful registration
5. Verify redirect to dashboard

### Test Scenario 2: Login Without Registration
1. Navigate to `/login`
2. Enter an unregistered email
3. Enter any password
4. Click "Login to Dashboard"
5. Verify error: "No account found with this email"

### Test Scenario 3: Login With Wrong Password
1. Register a new user
2. Logout
3. Try to login with same email but wrong password
4. Verify error: "Invalid password"

### Test Scenario 4: Successful Login
1. Register a new user (or use existing)
2. Logout
3. Login with correct credentials
4. Verify redirect to dashboard

### Test Scenario 5: Protected Routes
1. Open browser in incognito mode
2. Try to access `/dashboard` directly
3. Verify redirect to `/login`
4. Login successfully
5. Verify access to dashboard

### Test Scenario 6: Logout
1. Login to application
2. Click "Logout" in navigation
3. Confirm logout
4. Verify redirect to login page
5. Try to access `/dashboard`
6. Verify redirect back to login

## Form Validation Rules

### Registration
- **Name**: Required, non-empty string
- **Email**: Required, valid email format, unique (not already registered)
- **Password**: Required, minimum 6 characters
- **Confirm Password**: Required, must match password
- **Subject**: Required, must select from dropdown
- **Qualification**: Required, non-empty string
- **School**: Optional

### Login
- **Email**: Required, valid email format, must be registered
- **Password**: Required, must match registered password

## Error Messages

| Error Condition | Message |
|----------------|---------|
| Empty name | "Please enter your full name" |
| Empty email | "Please enter your email address" |
| Invalid email format | "Please enter a valid email address" |
| Email already registered | "This email is already registered. Please login instead." |
| Empty password | "Please enter a password" |
| Password too short | "Password must be at least 6 characters long" |
| Passwords don't match | "Passwords do not match" |
| No subject selected | "Please select your subject specialization" |
| Empty qualification | "Please enter your qualification" |
| Email not registered (login) | "No account found with this email. Please register first." |
| Wrong password (login) | "Invalid password. Please try again." |

## Future Enhancements

### Recommended Improvements
1. **Backend Integration**
   - Replace localStorage with proper API calls
   - Store passwords securely with hashing (bcrypt)
   - Implement JWT token refresh mechanism

2. **Enhanced Security**
   - Add rate limiting for login attempts
   - Implement CAPTCHA for registration
   - Add email verification
   - Implement password reset via email

3. **User Experience**
   - Add social login (Google, Microsoft)
   - Implement "Remember me" functionality
   - Add password strength indicator
   - Show validation in real-time as user types

4. **Session Management**
   - Add session timeout
   - Implement refresh tokens
   - Add "Stay logged in" option

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Notes
- Currently using **localStorage** for demo purposes
- In production, implement proper backend authentication
- Passwords should be **hashed** on the server, never stored in plain text
- Consider implementing **OAuth 2.0** for production use
- All data is stored locally in the browser
- Clearing browser data will remove all registered users

## Support
For issues or questions about the authentication system, please refer to this documentation or contact the development team.
