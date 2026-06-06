# Image Assets Documentation

This document lists all available image assets in the Teacher Professional Development Platform project.

## 📁 Directory Structure

```
public/images/
├── logo/               # Brand logos and wordmarks
├── avatars/            # User profile avatars
├── courses/            # Course thumbnail images
├── banners/            # Hero and banner images
├── illustrations/      # UI illustrations and empty states
└── icons/              # Icon assets
```

## 🎨 Available Images

### Logo Assets (`/images/logo/`)
- **logo.svg** - Main circular logo with graduation cap and book (120x120px)
- **logo-light.svg** - Horizontal logo with text "TPDP" (200x60px)

**Usage:**
```tsx
<img src="/images/logo/logo.svg" alt="TPDP Logo" style={{ width: '32px', height: '32px' }} />
<img src="/images/logo/logo-light.svg" alt="TPDP" style={{ height: '40px' }} />
```

### Avatar Images (`/images/avatars/`)
- **default-avatar.svg** - Default gray avatar placeholder (200x200px)
- **teacher-avatar-1.svg** - Teacher avatar with glasses, navy background (200x200px)
- **teacher-avatar-2.svg** - Teacher avatar with smile, green background (200x200px)

**Usage:**
```tsx
<img src="/images/avatars/default-avatar.svg" alt="User Avatar" />
<img src="/images/avatars/teacher-avatar-1.svg" alt="Teacher" />
```

### Course Thumbnails (`/images/courses/`)
- **pedagogy.svg** - Blue gradient with book icon (400x200px)
- **digital-teaching.svg** - Purple gradient with computer/code (400x200px)
- **mathematics.svg** - Teal gradient with math symbols (π, ∑, ∫, √) (400x200px)
- **psychology.svg** - Orange gradient with brain and lightbulb (400x200px)
- **leadership.svg** - Red gradient with trophy icon (400x200px)
- **inclusive.svg** - Green gradient with people holding hands (400x200px)

**Usage in Course Cards:**
```tsx
const courses = [
  { 
    id: 1, 
    title: 'Modern Pedagogy', 
    image: '/images/courses/pedagogy.svg',
    ...
  }
]

<img src={course.image} alt={course.title} style={{ width: '100%', height: '130px', objectFit: 'cover' }} />
```

### Banner Images (`/images/banners/`)
- **dashboard-hero.svg** - Navy/gold gradient hero banner (1200x300px)

**Usage:**
```tsx
<div style={{ 
  backgroundImage: 'url(/images/banners/dashboard-hero.svg)', 
  backgroundSize: 'cover',
  height: '300px'
}} />
```

### Illustrations (`/images/illustrations/`)
- **empty-state.svg** - Empty box with sad face (200x200px)
- **no-data.svg** - Document with magnifying glass (200x200px)
- **loading.svg** - Animated spinner (200x200px)
- **success.svg** - Green checkmark in circle (200x200px)
- **error.svg** - Red X mark in circle (200x200px)

**Usage in Empty States:**
```tsx
<div className="empty-state">
  <img src="/images/illustrations/empty-state.svg" alt="No data" style={{ width: '100px' }} />
  <p>No items found</p>
</div>
```

## 🎯 Usage Examples

### 1. Navigation Logo
```tsx
// src/components/Navigation.tsx
<Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
  <img src="/images/logo/logo.svg" alt="TPDP Logo" style={{ width: '32px', height: '32px' }} />
  <span>TPDP</span>
</Link>
```

### 2. Profile Avatar
```tsx
// src/pages/Profile.tsx
<div className="profile-avatar-wrap">
  <img 
    src="/images/avatars/default-avatar.svg" 
    alt="Profile Avatar" 
    style={{ 
      width: '100%', 
      height: '100%', 
      objectFit: 'cover', 
      borderRadius: '50%' 
    }} 
  />
</div>
```

### 3. Course Thumbnails
```tsx
// src/pages/Courses.tsx
<div style={{ height: '130px', overflow: 'hidden' }}>
  <img 
    src="/images/courses/mathematics.svg" 
    alt="Mathematics Course" 
    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
  />
</div>
```

### 4. Empty States
```tsx
// Empty activity feed
<div className="empty-state">
  <img src="/images/illustrations/empty-state.svg" alt="" style={{ width: '120px', marginBottom: '1rem' }} />
  <p>No recent activity</p>
</div>
```

### 5. Loading States
```tsx
// Loading indicator
<div style={{ textAlign: 'center', padding: '2rem' }}>
  <img src="/images/illustrations/loading.svg" alt="Loading..." style={{ width: '60px' }} />
</div>
```

### 6. Success/Error Messages
```tsx
// Success notification
<div className="notification success">
  <img src="/images/illustrations/success.svg" alt="Success" style={{ width: '24px', marginRight: '0.5rem' }} />
  <span>Operation completed successfully!</span>
</div>

// Error notification
<div className="notification error">
  <img src="/images/illustrations/error.svg" alt="Error" style={{ width: '24px', marginRight: '0.5rem' }} />
  <span>Something went wrong</span>
</div>
```

## 🔄 Where Images Are Currently Used

### ✅ Already Implemented
1. **Navigation.tsx** - Logo in navigation bar
2. **Login.tsx** - Logo in auth page
3. **Register.tsx** - Logo in auth page
4. **Profile.tsx** - Default avatar
5. **Courses.tsx** - Course thumbnail images

### 📝 Recommended Additional Uses

#### Dashboard.tsx
```tsx
// Add hero banner
<div className="dashboard-header" style={{
  backgroundImage: 'url(/images/banners/dashboard-hero.svg)',
  backgroundSize: 'cover',
  backgroundPosition: 'center'
}}>
  {/* existing content */}
</div>

// Replace emoji empty states
<div className="empty-state">
  <img src="/images/illustrations/empty-state.svg" alt="" style={{ width: '100px' }} />
  <p>No recent activity yet</p>
</div>
```

#### Other Pages with Empty States
Replace emoji icons (📋, 🔔, 🏆, etc.) with illustration SVGs for more professional look.

## 🎨 Color Scheme

All images use the project's color palette:
- **Navy**: `#1e3a5f` (Primary brand color)
- **Gold**: `#d4af37` (Accent color)
- **Yellow**: `#f8b739`, `#ffc107` (Secondary accent)
- **Green**: `#28a745`, `#20c997` (Success states)
- **Red**: `#dc3545` (Error states)
- **Purple**: `#6f42c1`, `#8b5cf6` (Digital/tech theme)
- **Teal**: `#17a2b8` (Analytics theme)

## 📦 Image Format

All images are provided as **SVG** (Scalable Vector Graphics) for:
- ✅ Perfect scaling at any resolution
- ✅ Small file sizes
- ✅ Easy color customization (if needed)
- ✅ Sharp display on all devices

## 🚀 Adding New Images

When adding new images:

1. Place them in the appropriate subdirectory under `public/images/`
2. Use descriptive, kebab-case filenames (e.g., `course-physics.svg`)
3. Keep aspect ratios consistent within each category
4. Follow the project's color scheme
5. Update this documentation

## 🔗 Additional Resources

For custom images or modifications:
- Use tools like [Figma](https://figma.com), [Inkscape](https://inkscape.org/), or [Adobe Illustrator](https://adobe.com/illustrator)
- Free SVG resources: [SVGRepo](https://svgrepo.com), [Heroicons](https://heroicons.com), [Undraw](https://undraw.co)
- Convert PNG to SVG: [Vectorizer](https://vectorizer.com)

---

**Last Updated:** June 6, 2026  
**Project:** Teacher Professional Development Platform (TPDP)
