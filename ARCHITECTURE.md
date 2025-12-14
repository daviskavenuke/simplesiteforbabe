# 🗺️ TSUK - Navigation & Feature Map

## 🌐 Website Map

```
TSUK Website Structure:

┌─────────────────────────────────────────────┐
│           TSUK E-Commerce Platform          │
├─────────────────────────────────────────────┤
│                                             │
│  ┌──────────────────────────────────────┐   │
│  │     PUBLIC CUSTOMER PAGES            │   │
│  └──────────────────────────────────────┘   │
│                                             │
│  ├─ / (Homepage)                           │
│  │   ├─ Hero Section                       │
│  │   ├─ Product Grid                       │
│  │   └─ Features Section                   │
│  │                                         │
│  ├─ /products/[id] (Product Details)       │
│  │   ├─ Product Image                      │
│  │   ├─ Product Info                       │
│  │   ├─ Add to Cart Button                 │
│  │   └─ Order on WhatsApp Button           │
│  │                                         │
│  ├─ /cart (Shopping Cart)                  │
│  │   ├─ Cart Items List                    │
│  │   ├─ Quantity Controls                  │
│  │   ├─ Total Price                        │
│  │   └─ Order on WhatsApp Button           │
│  │                                         │
│  └─ Navbar (Throughout)                    │
│     ├─ Logo/Home Link                      │
│     ├─ Products Link                       │
│     ├─ Cart Link (with count)              │
│     └─ Admin Link                          │
│                                             │
│  ┌──────────────────────────────────────┐   │
│  │     ADMIN PAGES (Protected)          │   │
│  └──────────────────────────────────────┘   │
│                                             │
│  ├─ /admin/login (Admin Login)             │
│  │   ├─ Email Input                        │
│  │   ├─ Password Input                     │
│  │   ├─ Login Button                       │
│  │   └─ Demo Credentials Info              │
│  │                                         │
│  └─ /admin/dashboard (Admin Panel)         │
│     ├─ Add Product Form                    │
│     │  ├─ Name Input                       │
│     │  ├─ Category Input                   │
│     │  ├─ Price Input                      │
│     │  ├─ Description Textarea             │
│     │  ├─ Image Upload                     │
│     │  └─ Submit Button                    │
│     │                                      │
│     └─ Products List                       │
│        ├─ Product Card (for each)          │
│        │  ├─ Product Image                 │
│        │  ├─ Name & Category               │
│        │  ├─ Price                         │
│        │  ├─ Edit Button                   │
│        │  └─ Delete Button                 │
│        │                                   │
│        ├─ Edit Product Form (Modal)        │
│        │  └─ (Same as Add, but with data) │
│        │                                   │
│        └─ Logout Button                    │
│                                             │
│  ┌──────────────────────────────────────┐   │
│  │     API ENDPOINTS (Backend)          │   │
│  └──────────────────────────────────────┘   │
│                                             │
│  Products API:                              │
│  ├─ GET    /api/products                    │
│  ├─ POST   /api/products                    │
│  ├─ GET    /api/products/:id                │
│  ├─ PUT    /api/products/:id                │
│  └─ DELETE /api/products/:id                │
│                                             │
│  Authentication API:                        │
│  ├─ POST   /api/auth/signin                 │
│  ├─ GET    /api/auth/session                │
│  ├─ POST   /api/auth/signout                │
│  └─ GET    /api/auth/csrf                   │
│                                             │
└─────────────────────────────────────────────┘
```

## 🔄 User Flow Diagram

```
CUSTOMER JOURNEY:

Start
  │
  ├─→ Visit Homepage
  │   ├─→ See Hero Section
  │   └─→ See Product Grid
  │
  ├─→ Click "View Details"
  │   └─→ Go to Product Details Page
  │       ├─→ See Full Info
  │       └─→ Choose Action:
  │           ├─→ "Add to Cart" → Goes to Cart
  │           └─→ "Order on WhatsApp" → Opens WhatsApp
  │
  ├─→ Visit Cart Page
  │   ├─→ See Items
  │   ├─→ Update Quantities
  │   └─→ Choose Action:
  │       ├─→ "Continue Shopping" → Back to Home
  │       ├─→ "Order All on WhatsApp" → Send to Seller
  │       └─→ "Clear Cart" → Remove All
  │
  └─→ End (Order Sent)


ADMIN JOURNEY:

Start
  │
  ├─→ Visit /admin/login
  │   ├─→ Enter Credentials
  │   └─→ Click Login
  │       └─→ Go to Dashboard
  │
  ├─→ In Dashboard:
  │   ├─→ ADD PRODUCT:
  │   │   ├─→ Fill Form
  │   │   ├─→ Upload Image
  │   │   └─→ Click "Add"
  │   │
  │   ├─→ EDIT PRODUCT:
  │   │   ├─→ Click "Edit"
  │   │   ├─→ Modify Data
  │   │   └─→ Click "Update"
  │   │
  │   └─→ DELETE PRODUCT:
  │       ├─→ Click "Delete"
  │       └─→ Confirm
  │
  └─→ Logout → End
```

## 📊 Component Hierarchy

```
RootLayout
├── Navbar
│   ├── Logo (Link to Home)
│   ├── Products Link
│   ├── Cart Link (with badge)
│   └── Admin Link
│
├── Pages
│   ├── Home Page
│   │   ├── Hero Section
│   │   ├── Products Grid
│   │   │   └── ProductCard (repeated)
│   │   │       ├── Image
│   │   │       ├── Info
│   │   │       ├── Price
│   │   │       └── Buttons
│   │   └── Features Section
│   │
│   ├── Product Details Page
│   │   └── ProductDetails Component
│   │       ├── Image Gallery
│   │       ├── Product Info
│   │       ├── Quantity Selector
│   │       ├── Add to Cart Button
│   │       └── Order on WhatsApp Button
│   │
│   ├── Cart Page
│   │   ├── Cart Items List
│   │   │   └── CartItem (repeated)
│   │   │       ├── Image
│   │   │       ├── Info
│   │   │       ├── Quantity Input
│   │   │       └── Remove Button
│   │   │
│   │   └── Order Summary
│   │       ├── Subtotal
│   │       ├── Total
│   │       ├── Order Button
│   │       └── Continue Shopping Link
│   │
│   ├── Admin Login Page
│   │   └── Login Form
│   │       ├── Email Input
│   │       ├── Password Input
│   │       └── Submit Button
│   │
│   └── Admin Dashboard Page
│       ├── Product Form
│       │   ├── Text Inputs
│       │   ├── Textarea
│       │   ├── Image Upload
│       │   └── Submit Button
│       │
│       └── Products List
│           └── ProductItem (repeated)
│               ├── Image
│               ├── Info
│               ├── Edit Button
│               └── Delete Button
│
└── Footer
    ├── Company Info
    ├── Quick Links
    └── Contact Info
```

## 🗄️ Data Flow

```
FRONTEND → BACKEND → DATABASE

Add to Cart (Client-Side):
  Product → useCartStore → localStorage
  User sees item in cart immediately

Fetch Products:
  HomePage → fetch(/api/products)
         ↓
         GET /api/products
         ↓
      Prisma (MongoDB)
         ↓
      Return Products
         ↓
     Display Grid

Create Product (Admin):
  AdminForm → fetch(POST /api/products)
         ↓
    Validate with Zod
         ↓
    Prisma Create
         ↓
      MongoDB
         ↓
   Return Created
         ↓
  Refresh Dashboard

Update Product (Admin):
  EditForm → fetch(PUT /api/products/:id)
         ↓
    Validate with Zod
         ↓
    Prisma Update
         ↓
      MongoDB
         ↓
   Return Updated
         ↓
   Refresh Dashboard

Delete Product (Admin):
  DeleteBtn → fetch(DELETE /api/products/:id)
         ↓
    Prisma Delete
         ↓
      MongoDB
         ↓
  Return Success
         ↓
  Refresh Dashboard
```

## 📄 File Dependency Graph

```
src/app/layout.tsx
├── src/components/Navbar.tsx
│   ├── src/lib/store.ts (useCartStore)
│   └── Link from next/link
│
├── src/app/globals.css
│   └── tailwind imports
│
└── src/app/page.tsx (homepage)
    ├── src/components/ProductCard.tsx
    │   ├── src/lib/store.ts
    │   └── Image from next/image
    │
    └── fetch /api/products

src/app/products/[id]/page.tsx
├── src/components/ProductDetails.tsx
│   ├── src/lib/whatsapp.ts
│   ├── src/lib/store.ts
│   └── fetch /api/products/:id
│
└── Image from next/image

src/app/cart/page.tsx
├── src/lib/store.ts
├── src/lib/whatsapp.ts
└── Image from next/image

src/app/admin/login/page.tsx
├── react-hook-form
├── zod validation
└── next-auth/react

src/app/admin/dashboard/page.tsx
├── react-hook-form
├── zod validation
├── next-auth/react
├── fetch /api/products
├── Image from next/image
└── next/image

src/app/api/auth/[...nextauth]/route.ts
├── next-auth
└── src/lib/prisma.ts

src/app/api/products/route.ts
├── src/lib/prisma.ts
└── zod validation

src/lib/store.ts
└── zustand

src/lib/prisma.ts
└── @prisma/client

prisma/schema.prisma
└── Database schema
```

## 🎨 Styling Layers

```
Tailwind CSS Hierarchy:

Global Styles (@layer)
├── @tailwind base
├── @tailwind components
│   ├── .btn-primary (pink button)
│   ├── .btn-secondary (gray button)
│   ├── .card (white card)
│   └── .badge (category badge)
│
└── @tailwind utilities
    ├── flex, grid
    ├── colors (pink/slate)
    ├── spacing
    ├── animations
    └── responsive

Component-Level Styles:
├── Navbar: flex, sticky positioning
├── ProductCard: card, hover effects
├── ProductDetails: grid layout
├── Cart: space-y for list
└── Forms: form utilities from @tailwindcss/forms

Responsive Breakpoints:
├── Mobile (< 640px)
├── Tablet (640px - 1024px)
└── Desktop (> 1024px)
```

## 🔐 Authentication Flow

```
Login Process:

User Inputs Email & Password
        ↓
Submit Form
        ↓
NextAuth /api/auth/signin
        ↓
Validate with CredentialsProvider
        ↓
Check Database (Prisma)
        ↓
Password Match?
├─ Yes → Create JWT Token
│        ↓
│        Set Session Cookie
│        ↓
│        Redirect to /admin/dashboard
│
└─ No  → Return Error
         ↓
         Show Error Message

Protected Routes:
middleware.ts checks:
├─ Route matches /admin/*
├─ Token exists?
├─ Token valid?
└─ Yes → Allow
    No  → Redirect to /admin/login
```

## 🔄 State Management

```
Local State (Components):
├── quantity (number input)
└── loading states

Client State (Zustand Store):
├── items[] (CartItem)
├── addItem()
├── removeItem()
├── updateQuantity()
├── getTotalPrice()
└── Persisted in localStorage

Server State (Database):
├── Products (MongoDB)
├── Admins (MongoDB)
└── Updated via Prisma ORM

Session State (NextAuth):
├── user info
├── email
└── session token
```

## 📱 Responsive Breakpoints

```
Mobile First Design:

< 640px (Mobile)
├─ Single column
├─ Full width
├─ Touch-friendly buttons
└─ Optimized images

640px - 1024px (Tablet)
├─ 2 columns
├─ Adjusted padding
└─ Larger touch targets

> 1024px (Desktop)
├─ 4 columns (products)
├─ 3 column layouts (admin)
└─ Hover effects
```

## 🚀 Deployment Architecture

```
Local Development:
├─ npm run dev → localhost:3000
├─ sqlite (optional) or local MongoDB
└─ .env.local for config

Production (Vercel):
├─ Automatic deploys from git
├─ Environment variables on Vercel
├─ MongoDB Atlas (cloud)
├─ Edge Functions for API
└─ CDN for static assets

Docker (Alternative):
├─ Containerized Next.js
├─ Separate MongoDB container
└─ Docker Compose orchestration
```

---

This visual guide shows how all parts of TSUK work together! 🎯
