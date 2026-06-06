# 🎨 Quick Image Usage Guide

A practical guide for using images in the TPDP project.

---

## 🚀 Copy-Paste Examples

### 1. Adding Logo to Any Page

```tsx
// In navigation or header
<img 
  src="/images/logo/logo.svg" 
  alt="TPDP Logo" 
  style={{ width: '40px', height: '40px' }} 
/>

// Full logo with text
<img 
  src="/images/logo/logo-light.svg" 
  alt="TPDP" 
  style={{ height: '50px' }} 
/>
```

### 2. User Avatars

```tsx
// Profile avatar
<div style={{ 
  width: '100px', 
  height: '100px', 
  borderRadius: '50%', 
  overflow: 'hidden' 
}}>
  <img 
    src="/images/avatars/default-avatar.svg" 
    alt="User Avatar" 
    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
  />
</div>

// Small avatar (in list)
<img 
  src="/images/avatars/teacher-avatar-1.svg" 
  alt="Teacher" 
  style={{ width: '32px', height: '32px', borderRadius: '50%' }}
/>
```

### 3. Course Cards

```tsx
// Course thumbnail
<div style={{ height: '150px', overflow: 'hidden', borderRadius: '8px' }}>
  <img 
    src="/images/courses/mathematics.svg" 
    alt="Mathematics Course" 
    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
  />
</div>

// All available courses:
// - /images/courses/mathematics.svg
// - /images/courses/pedagogy.svg
// - /images/courses/digital-teaching.svg
// - /images/courses/psychology.svg
// - /images/courses/leadership.svg
// - /images/courses/inclusive.svg
```

### 4. Empty States

```tsx
// When there's no data to display
<div className="empty-state" style={{ textAlign: 'center', padding: '3rem' }}>
  <img 
    src="/images/illustrations/empty-state.svg" 
    alt="" 
    style={{ width: '120px', marginBottom: '1rem', opacity: 0.6 }}
  />
  <h3 style={{ color: '#6c757d', fontSize: '1.1rem', marginBottom: '0.5rem' }}>
    No Data Available
  </h3>
  <p style={{ color: '#adb5bd', fontSize: '0.9rem' }}>
    Start by adding some content
  </p>
</div>

// Alternative: No search results
<img src="/images/illustrations/no-data.svg" alt="No results found" />
```

### 5. Loading States

```tsx
// Loading spinner
<div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
  <img 
    src="/images/illustrations/loading.svg" 
    alt="Loading..." 
    style={{ width: '60px', height: '60px' }}
  />
</div>

// With text
<div style={{ textAlign: 'center', padding: '2rem' }}>
  <img src="/images/illustrations/loading.svg" alt="" style={{ width: '50px' }} />
  <p style={{ marginTop: '1rem', color: '#6c757d' }}>Loading your data...</p>
</div>
```

### 6. Success Messages

```tsx
// Success notification
<div style={{ 
  display: 'flex', 
  alignItems: 'center', 
  gap: '0.75rem',
  padding: '1rem',
  background: '#d4edda',
  border: '1px solid #c3e6cb',
  borderRadius: '8px'
}}>
  <img 
    src="/images/illustrations/success.svg" 
    alt="Success" 
    style={{ width: '32px', height: '32px' }}
  />
  <span style={{ color: '#155724', fontWeight: 500 }}>
    Operation completed successfully!
  </span>
</div>
```

### 7. Error Messages

```tsx
// Error notification
<div style={{ 
  display: 'flex', 
  alignItems: 'center', 
  gap: '0.75rem',
  padding: '1rem',
  background: '#f8d7da',
  border: '1px solid #f5c6cb',
  borderRadius: '8px'
}}>
  <img 
    src="/images/illustrations/error.svg" 
    alt="Error" 
    style={{ width: '32px', height: '32px' }}
  />
  <span style={{ color: '#721c24', fontWeight: 500 }}>
    Something went wrong. Please try again.
  </span>
</div>
```

### 8. Feature Illustrations

```tsx
// Chat/Messaging
<img src="/images/illustrations/chat.svg" alt="Chat" style={{ width: '150px' }} />

// Quiz/Assessment
<img src="/images/illustrations/quiz.svg" alt="Quiz" style={{ width: '150px' }} />

// Jobs Portal
<img src="/images/illustrations/jobs.svg" alt="Jobs" style={{ width: '150px' }} />

// Interview Prep
<img src="/images/illustrations/interview.svg" alt="Interview" style={{ width: '150px' }} />

// Leaderboard
<img src="/images/illustrations/leaderboard.svg" alt="Leaderboard" style={{ width: '150px' }} />

// Analytics Dashboard
<img src="/images/illustrations/analytics.svg" alt="Analytics" style={{ width: '150px' }} />
```

### 9. Hero/Banner Background

```tsx
// Page hero section
<div style={{
  backgroundImage: 'url(/images/banners/dashboard-hero.svg)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '300px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#fff'
}}>
  <h1>Welcome to Your Dashboard</h1>
</div>
```

---

## 📱 Responsive Image Sizes

### Desktop
```tsx
<img 
  src="/images/illustrations/analytics.svg" 
  alt="Analytics" 
  style={{ width: '200px' }}
/>
```

### Tablet
```tsx
<img 
  src="/images/illustrations/analytics.svg" 
  alt="Analytics" 
  style={{ width: '150px' }}
/>
```

### Mobile
```tsx
<img 
  src="/images/illustrations/analytics.svg" 
  alt="Analytics" 
  style={{ width: '100px' }}
/>
```

### Responsive with CSS
```tsx
<img 
  src="/images/illustrations/analytics.svg" 
  alt="Analytics" 
  style={{ 
    width: '100%', 
    maxWidth: '200px',
    height: 'auto'
  }}
/>
```

---

## 🎯 Common Patterns

### Pattern 1: Feature Card with Icon

```tsx
<div className="feature-card" style={{
  padding: '2rem',
  background: '#fff',
  borderRadius: '12px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  textAlign: 'center'
}}>
  <img 
    src="/images/illustrations/quiz.svg" 
    alt="Quizzes" 
    style={{ width: '100px', marginBottom: '1rem' }}
  />
  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>
    Interactive Quizzes
  </h3>
  <p style={{ color: '#6c757d', fontSize: '0.9rem' }}>
    Test your knowledge and earn points
  </p>
  <button className="btn btn-primary" style={{ marginTop: '1rem' }}>
    Start Quiz
  </button>
</div>
```

### Pattern 2: Course Grid Item

```tsx
<div className="course-card" style={{
  borderRadius: '12px',
  overflow: 'hidden',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  transition: 'transform 0.3s ease'
}}>
  {/* Thumbnail */}
  <div style={{ height: '150px', overflow: 'hidden' }}>
    <img 
      src="/images/courses/mathematics.svg" 
      alt="Mathematics Course"
      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
    />
  </div>
  
  {/* Content */}
  <div style={{ padding: '1.5rem' }}>
    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>
      Advanced Mathematics
    </h3>
    <p style={{ color: '#6c757d', fontSize: '0.85rem', marginBottom: '1rem' }}>
      Master problem-solving strategies
    </p>
    <button className="btn btn-primary btn-full">Enroll Now</button>
  </div>
</div>
```

### Pattern 3: Profile Header

```tsx
<div className="profile-header" style={{
  display: 'flex',
  alignItems: 'center',
  gap: '1.5rem',
  padding: '2rem',
  background: 'linear-gradient(135deg, #1e3a5f, #2c5282)',
  color: '#fff'
}}>
  {/* Avatar */}
  <div style={{
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    overflow: 'hidden',
    border: '4px solid rgba(255,255,255,0.3)'
  }}>
    <img 
      src="/images/avatars/default-avatar.svg" 
      alt="Profile"
      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
    />
  </div>
  
  {/* Info */}
  <div>
    <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>John Doe</h1>
    <p style={{ opacity: 0.9 }}>Mathematics Teacher</p>
    <p style={{ opacity: 0.8, fontSize: '0.9rem' }}>Example School</p>
  </div>
</div>
```

### Pattern 4: Empty State Component

```tsx
const EmptyState = ({ 
  image = '/images/illustrations/empty-state.svg',
  title = 'No Data',
  message = 'Nothing to show here',
  action
}) => (
  <div style={{ 
    textAlign: 'center', 
    padding: '3rem 1rem',
    maxWidth: '400px',
    margin: '0 auto'
  }}>
    <img 
      src={image} 
      alt="" 
      style={{ 
        width: '150px', 
        marginBottom: '1.5rem',
        opacity: 0.6 
      }}
    />
    <h3 style={{ 
      fontSize: '1.25rem', 
      color: '#495057',
      marginBottom: '0.75rem'
    }}>
      {title}
    </h3>
    <p style={{ 
      color: '#adb5bd',
      fontSize: '0.95rem',
      marginBottom: '1.5rem'
    }}>
      {message}
    </p>
    {action && action}
  </div>
)

// Usage:
<EmptyState 
  image="/images/illustrations/quiz.svg"
  title="No Quizzes Available"
  message="Check back later for new quizzes"
  action={<button className="btn btn-primary">Explore Courses</button>}
/>
```

---

## 🔧 Advanced Techniques

### 1. Image with Fallback

```tsx
const ImageWithFallback = ({ src, fallback, alt, ...props }) => {
  const [imgSrc, setImgSrc] = useState(src)
  
  return (
    <img 
      src={imgSrc} 
      alt={alt}
      onError={() => setImgSrc(fallback || '/images/illustrations/error.svg')}
      {...props}
    />
  )
}

// Usage:
<ImageWithFallback 
  src="/images/avatars/user-123.svg"
  fallback="/images/avatars/default-avatar.svg"
  alt="User"
/>
```

### 2. Lazy Loading Images

```tsx
<img 
  src="/images/courses/mathematics.svg" 
  alt="Mathematics"
  loading="lazy"  // Native lazy loading
  style={{ width: '100%' }}
/>
```

### 3. Animated Loading State

```tsx
const LoadingSpinner = () => (
  <div style={{ 
    display: 'flex', 
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
    padding: '3rem'
  }}>
    <img 
      src="/images/illustrations/loading.svg" 
      alt="Loading"
      style={{ 
        width: '60px',
        animation: 'spin 2s linear infinite'
      }}
    />
    <p style={{ color: '#6c757d' }}>Loading...</p>
  </div>
)

// Add to CSS:
// @keyframes spin {
//   from { transform: rotate(0deg); }
//   to { transform: rotate(360deg); }
// }
```

---

## 📝 Best Practices

### ✅ DO:
- Use descriptive alt text for accessibility
- Specify width/height to prevent layout shift
- Use `loading="lazy"` for off-screen images
- Provide fallback images for user avatars
- Use appropriate image sizes (don't load huge images for small displays)

### ❌ DON'T:
- Don't use generic alt text like "image" or "icon"
- Don't forget alt attributes (use empty string for decorative images)
- Don't hardcode pixel sizes - use responsive units when possible
- Don't load all images at once - implement lazy loading
- Don't use images for text content

---

## 🎨 Custom Styling Ideas

### Add Hover Effects
```tsx
<img 
  src="/images/courses/mathematics.svg"
  alt="Mathematics"
  style={{
    width: '100%',
    transition: 'transform 0.3s ease',
    cursor: 'pointer'
  }}
  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
/>
```

### Add Shadow
```tsx
<img 
  src="/images/logo/logo.svg"
  alt="Logo"
  style={{
    width: '60px',
    filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))'
  }}
/>
```

### Add Border/Frame
```tsx
<img 
  src="/images/avatars/teacher-avatar-1.svg"
  alt="Teacher"
  style={{
    width: '100px',
    border: '3px solid #d4af37',
    borderRadius: '50%',
    padding: '4px',
    background: '#fff'
  }}
/>
```

---

**Quick Reference:** All images are in `public/images/` and can be referenced with `/images/...`  
**Format:** SVG (scales perfectly at any size)  
**Documentation:** See `IMAGE_ASSETS.md` for complete list
