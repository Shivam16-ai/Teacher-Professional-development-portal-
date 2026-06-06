# 🚀 Quick Start Guide - Authentication System

## Step 1: Start the Application

Open your terminal in the project folder and run:

```bash
npm run dev
```

You should see:
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

## Step 2: Register Your First User

1. **Open your browser** and go to: `http://localhost:5173`

2. **You'll be redirected to login page** (because you're not authenticated)

3. **Click "Create New Account"** button or navigate to `/register`

4. **Fill in the registration form:**
   ```
   Full Name: John Doe
   Email: john@example.com
   Password: password123
   Confirm Password: password123
   Subject: Mathematics (select from dropdown)
   Qualification: B.Ed
   School: ABC School (optional)
   ```

5. **Click "Create My Account"**

6. **You should see:**
   - ✅ Success message: "Registration successful! Redirecting to dashboard..."
   - ✅ Automatic redirect to dashboard after 1.5 seconds
   - ✅ You're now logged in!

## Step 3: Test Logout

1. **Look at the top navigation bar**

2. **Click "Logout"** (far right in the navigation)

3. **Confirm logout** in the dialog box

4. **You should be redirected to login page**

## Step 4: Test Login with Correct Credentials

1. **On the login page, enter:**
   ```
   Email: john@example.com
   Password: password123
   ```

2. **Click "Login to Dashboard"**

3. **You should:**
   - ✅ See loading state (spinner)
   - ✅ Be redirected to dashboard
   - ✅ Be logged in successfully

## Step 5: Test Login Without Registration

1. **Logout again**

2. **Try to login with unregistered email:**
   ```
   Email: notregistered@example.com
   Password: anything123
   ```

3. **Click "Login to Dashboard"**

4. **You should see error:**
   - ❌ "No account found with this email. Please register first."
   - ❌ Login should fail

## Step 6: Test Login with Wrong Password

1. **Try to login with registered email but wrong password:**
   ```
   Email: john@example.com
   Password: wrongpassword
   ```

2. **Click "Login to Dashboard"**

3. **You should see error:**
   - ❌ "Invalid password. Please try again."
   - ❌ Login should fail

## Step 7: Test Duplicate Email Registration

1. **Logout if logged in**

2. **Navigate to Register page**

3. **Try to register with already registered email:**
   ```
   Full Name: Jane Smith
   Email: john@example.com (already registered!)
   Password: newpassword123
   Confirm Password: newpassword123
   Subject: Science
   Qualification: M.Ed
   ```

4. **Click "Create My Account"**

5. **You should see error:**
   - ❌ "This email is already registered. Please login instead."
   - ❌ Registration should fail

## Step 8: Test Protected Routes

1. **Open a new incognito/private browser window**

2. **Try to access dashboard directly:**
   ```
   http://localhost:5173/dashboard
   ```

3. **You should be:**
   - ✅ Automatically redirected to `/login`
   - ✅ Unable to access dashboard without authentication

4. **Login with correct credentials**

5. **Now you can access all pages:**
   - ✅ Dashboard
   - ✅ Courses
   - ✅ Analytics
   - ✅ Profile
   - ✅ All other pages

## 🎯 Expected Behavior Summary

| Action | Expected Result |
|--------|----------------|
| Register new user | ✅ Success → Auto-login → Dashboard |
| Login with correct credentials | ✅ Success → Dashboard |
| Login without registration | ❌ Error: "No account found" |
| Login with wrong password | ❌ Error: "Invalid password" |
| Register duplicate email | ❌ Error: "Email already registered" |
| Access protected route without auth | ✅ Redirect to login |
| Logout | ✅ Clear session → Redirect to login |

## 🔍 Where to Find Things

### Navigation
- **Top bar**: All main navigation links + Logout button
- **Logout button**: Far right in navigation (only visible when logged in)

### Pages
- **Login**: `/login` or click "Login here" link
- **Register**: `/register` or click "Create New Account" button
- **Dashboard**: `/dashboard` (requires authentication)

### User Data Storage
Open browser DevTools (F12):
1. Go to **Application** tab (Chrome) or **Storage** tab (Firefox)
2. Click **Local Storage**
3. Select `http://localhost:5173`
4. You'll see:
   - `token` - Your session token
   - `user` - Your user data (without password)
   - `registered_users` - All registered users (with passwords)

## 🎨 UI Features to Notice

### Registration Page
- ✅ Password visibility toggles (eye icons)
- ✅ Real-time error clearing when you type
- ✅ Loading spinner during registration
- ✅ Success message before redirect
- ✅ Disabled buttons during loading
- ✅ Subject dropdown with 15+ options

### Login Page
- ✅ Password visibility toggle
- ✅ Remember me checkbox
- ✅ Forgot password link
- ✅ Loading spinner during login
- ✅ Error messages with icons
- ✅ Info box guiding to register

### Error Messages
- ✅ Red box with exclamation icon
- ✅ Clear, actionable messages
- ✅ Automatically cleared on input change

### Success Messages
- ✅ Green box with check icon
- ✅ Shows before redirect

## 🐛 Troubleshooting

### Problem: "Email already registered" but I'm sure I didn't register
**Solution**: Clear localStorage
1. Open DevTools (F12)
2. Go to Application/Storage tab
3. Right-click on Local Storage
4. Select "Clear"
5. Refresh page

### Problem: Can't see logout button
**Solution**: You're not logged in
1. Make sure you're logged in (register or login)
2. Look at the far right of navigation bar

### Problem: Redirected to login when trying to access dashboard
**Solution**: This is correct behavior!
1. You need to login first
2. Register if you haven't already

### Problem: Form doesn't submit
**Solution**: Check validation
1. Make sure all required fields are filled
2. Email must be valid format
3. Password must be at least 6 characters
4. Passwords must match (registration)

## 📊 Test Checklist

Use this checklist to verify everything works:

- [ ] Registration with valid data works
- [ ] Registration with existing email fails with error
- [ ] Registration with mismatched passwords fails
- [ ] Registration with short password fails
- [ ] Registration auto-logs in user
- [ ] Login with correct credentials works
- [ ] Login with unregistered email fails with error
- [ ] Login with wrong password fails with error
- [ ] Logout works and redirects to login
- [ ] Protected routes redirect to login when not authenticated
- [ ] Protected routes accessible after login
- [ ] Password visibility toggles work
- [ ] Loading states show during operations
- [ ] Error messages display correctly
- [ ] Success messages display correctly

## 🎉 Success Criteria

You've successfully verified the authentication system when:

✅ You can register a new user
✅ Registration auto-logs you in
✅ You can logout
✅ You can login with correct credentials
✅ Login fails for unregistered emails
✅ Login fails for wrong passwords
✅ Duplicate emails are rejected
✅ Protected routes require authentication
✅ All error messages are clear and helpful
✅ UI is responsive and beautiful

## 📚 Next Steps

1. ✅ Test all scenarios above
2. 📖 Read `AUTHENTICATION.md` for detailed documentation
3. 🔧 For production, implement backend API (see recommendations)
4. 🎨 Customize registration fields if needed
5. 🚀 Build and deploy!

## 💡 Pro Tips

1. **Use Chrome DevTools** to inspect localStorage and see stored data
2. **Use incognito windows** for testing fresh sessions
3. **Register multiple users** with different emails to test
4. **Check console** for any JavaScript errors
5. **Test on mobile** by resizing browser window

## 🆘 Need Help?

1. Check `AUTHENTICATION.md` for detailed documentation
2. Check `IMPLEMENTATION_SUMMARY.md` for technical details
3. Review form validation rules
4. Check browser console for errors

---

**Happy Testing! 🎊**

Your authentication system is ready to use. Register, login, and start exploring your Teacher Platform!
