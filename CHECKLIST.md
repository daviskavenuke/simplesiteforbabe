# ✅ TSUK - Setup & Verification Checklist

Use this checklist to ensure everything is set up correctly.

## 📋 Pre-Setup Checklist

- [ ] Node.js 18+ installed (`node --version`)
- [ ] npm installed (`npm --version`)
- [ ] MongoDB Atlas account created
- [ ] MongoDB cluster created and connection string copied
- [ ] VS Code or preferred editor ready
- [ ] Terminal/Command line ready
- [ ] Project folder opened in editor

## 🛠️ Installation Checklist

### Step 1: Install Dependencies
```bash
npm install
```
- [ ] No errors during installation
- [ ] node_modules folder created
- [ ] package-lock.json created
- [ ] All dependencies listed in package.json installed

### Step 2: Setup Environment Variables
```bash
cp .env.example .env.local
```
- [ ] .env.local file created
- [ ] All required variables identified
- [ ] MongoDB URL obtained from Atlas
- [ ] Fill in NEXTAUTH_URL: `http://localhost:3000`
- [ ] Generate NEXTAUTH_SECRET: `openssl rand -base64 32`
- [ ] Add admin email (admin@tsuk.com)
- [ ] Add admin password
- [ ] Add WhatsApp number
- [ ] Saved all changes to .env.local

### Step 3: Database Setup
```bash
npx prisma generate
```
- [ ] Prisma Client generated successfully
- [ ] No errors in generation
- [ ] .prisma folder created

```bash
npx prisma migrate dev --name init
```
- [ ] Migration created
- [ ] Database connected successfully
- [ ] No connection errors
- [ ] Migration applied to MongoDB
- [ ] Product and Admin collections created

### Step 4: (Optional) Seed Sample Data
```bash
npm run prisma:seed
```
- [ ] Seed script executed
- [ ] Admin user created
- [ ] Sample products added
- [ ] No errors during seeding

## 🌐 Development Server

### Start Development Server
```bash
npm run dev
```
- [ ] Server started without errors
- [ ] Terminal shows "ready - started server on"
- [ ] No TypeScript errors shown
- [ ] Ready message appears

### Test in Browser
- [ ] Open http://localhost:3000
- [ ] Homepage loads without errors
- [ ] Hero section visible
- [ ] Products display (if seeded)
- [ ] Navbar visible at top
- [ ] Navigation links work
- [ ] Logo is clickable

## 🏪 Frontend Feature Testing

### Homepage
- [ ] Hero section displays correctly
- [ ] Hero text is readable
- [ ] "Shop Now" button is clickable
- [ ] Product grid loads
- [ ] Product cards display

### Product Cards
- [ ] Images load (if available)
- [ ] Product name visible
- [ ] Price displayed correctly
- [ ] Category badge shows
- [ ] "View Details" button clickable
- [ ] "Add to Cart" button clickable

### Product Details Page
- [ ] Click "View Details" on a product
- [ ] Product image displays
- [ ] Product name, price, description shown
- [ ] Quantity selector works (+ and - buttons)
- [ ] "Add to Cart" button works
- [ ] "Order on WhatsApp" button works
- [ ] WhatsApp opens with pre-filled message

### Shopping Cart
- [ ] Click cart icon in navbar
- [ ] Added items appear in cart
- [ ] Quantity can be changed
- [ ] Remove button works
- [ ] Total price calculates correctly
- [ ] Cart count in navbar updates
- [ ] "Order All on WhatsApp" button works
- [ ] "Continue Shopping" button works
- [ ] "Clear Cart" button works
- [ ] Cart persists after refresh

## 👨‍💼 Admin Panel Testing

### Admin Login
- [ ] Navigate to http://localhost:3000/admin/login
- [ ] Page loads without errors
- [ ] Email input field works
- [ ] Password input field works
- [ ] Demo credentials visible
- [ ] Login with: admin@tsuk.com / Admin@123456
- [ ] No errors during login
- [ ] Redirected to dashboard

### Admin Dashboard
- [ ] Dashboard loads successfully
- [ ] Welcome message shows
- [ ] Logout button visible and clickable
- [ ] Products list displays

### Add Product
- [ ] Fill in product name
- [ ] Fill in category
- [ ] Fill in price
- [ ] Fill in description
- [ ] Upload product image
- [ ] Image preview shows
- [ ] Click "Add" button
- [ ] Product added to list
- [ ] Form clears

### Edit Product
- [ ] Click "Edit" on a product
- [ ] Form populates with product data
- [ ] Can change values
- [ ] Can change image
- [ ] Click "Update" button
- [ ] Product updates in list
- [ ] Form clears

### Delete Product
- [ ] Click "Delete" on a product
- [ ] Confirmation dialog appears
- [ ] Confirm deletion
- [ ] Product removed from list
- [ ] Dashboard refreshes

## 🔐 Authentication Testing

### Session Management
- [ ] Can log in as admin
- [ ] Session persists on page refresh
- [ ] Cannot access /admin/dashboard without login
- [ ] Protected routes redirect to login
- [ ] Logout clears session
- [ ] Can log in again after logout

## 📱 Responsive Design Testing

### Mobile (< 640px)
- [ ] Open DevTools (F12)
- [ ] Toggle device toolbar
- [ ] Select iPhone/Mobile
- [ ] Homepage looks good
- [ ] Navigation works
- [ ] Products display in 1 column
- [ ] Buttons are touch-friendly
- [ ] Text is readable

### Tablet (640px - 1024px)
- [ ] Select iPad/Tablet
- [ ] Products display in 2 columns
- [ ] Layout looks balanced
- [ ] Buttons accessible

### Desktop (> 1024px)
- [ ] Return to normal view
- [ ] Products display in 4 columns
- [ ] Full width used properly
- [ ] Hover effects work

## 🛠️ TypeScript & Build

### Type Checking
```bash
npx tsc --noEmit
```
- [ ] No type errors
- [ ] All .ts files valid
- [ ] Components have correct types

### Build Test
```bash
npm run build
```
- [ ] Build completes without errors
- [ ] .next folder created
- [ ] No warnings about unused code
- [ ] Build size reasonable

## 📊 Database Verification

### Via Prisma Studio
```bash
npx prisma studio
```
- [ ] Prisma Studio opens (http://localhost:5555)
- [ ] Product table visible
- [ ] Admin table visible
- [ ] Sample data visible (if seeded)
- [ ] Can view records
- [ ] Can create/edit/delete records

### Check Collections
- [ ] Product collection in MongoDB
- [ ] Admin collection in MongoDB
- [ ] Indexes created
- [ ] Data persists

## 🌍 API Testing

### Using cURL or Postman
```bash
curl http://localhost:3000/api/products
```
- [ ] GET /api/products returns list
- [ ] Returns valid JSON
- [ ] Products array present
- [ ] Each product has required fields

```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","description":"Test product","price":29.99,"category":"Test"}'
```
- [ ] Can create product via API
- [ ] Returns 201 Created
- [ ] Returns created product data

## 🎨 Design & Styling

- [ ] Colors match pink/rose theme
- [ ] Tailwind CSS is working
- [ ] Animations are smooth
- [ ] No style conflicts
- [ ] Responsive spacing correct
- [ ] Typography is readable
- [ ] Buttons have hover effects
- [ ] Links are understandable

## 🚀 Production Readiness

- [ ] All tests passed
- [ ] Build successful
- [ ] No console errors
- [ ] No TypeScript errors
- [ ] Database connected
- [ ] Authentication working
- [ ] All features functional
- [ ] Mobile responsive
- [ ] Performance acceptable

## 🔒 Security Checklist

- [ ] Environment variables not in .env.local (not committed)
- [ ] .gitignore includes node_modules
- [ ] .gitignore includes .env.local
- [ ] NEXTAUTH_SECRET is complex
- [ ] Admin password is strong
- [ ] Database credentials not visible
- [ ] HTTPS ready for production

## 📝 Documentation Review

- [ ] README.md read
- [ ] SETUP.md followed
- [ ] API.md reviewed
- [ ] QUICK_REFERENCE.md bookmarked
- [ ] Project structure understood
- [ ] How to customize known
- [ ] Deployment process understood

## 🚀 Ready to Deploy?

Before deploying, verify:
- [ ] All checklist items above completed
- [ ] Production .env configured
- [ ] Build passes without errors
- [ ] Database is accessible from deployment platform
- [ ] Domain is ready
- [ ] SSL certificate available (for HTTPS)
- [ ] Monitoring/logging setup (optional)

## 📈 Post-Deployment

- [ ] Site loads from production URL
- [ ] All features work in production
- [ ] Database queries work
- [ ] Admin login works
- [ ] WhatsApp integration works
- [ ] Forms validate properly
- [ ] Images load correctly
- [ ] No console errors in production

## 🎯 Next Phase Enhancements

- [ ] Add payment integration
- [ ] Add customer reviews
- [ ] Add search/filtering
- [ ] Add email notifications
- [ ] Add order history
- [ ] Add wishlist feature
- [ ] Add social media sharing
- [ ] Add analytics

## ✅ Final Verification

```bash
# Run all checks
npm install          # ✓ Dependencies
npm run dev          # ✓ Server starts
npm run build        # ✓ Build succeeds
npx tsc --noEmit     # ✓ Types correct
```

If all items pass:
- ✅ **Your TSUK project is ready!**
- 🎉 **Ready for development and deployment!**
- 🚀 **Ready to serve customers!**

---

## 🆘 Troubleshooting During Verification

If something fails:

1. **npm install fails**
   - Delete node_modules
   - Delete package-lock.json
   - Run npm install again
   - Check Node.js version (18+)

2. **Prisma migration fails**
   - Check DATABASE_URL in .env.local
   - Verify MongoDB credentials
   - Check IP whitelist in MongoDB Atlas
   - Try: `npx prisma db push`

3. **Server won't start**
   - Kill any process on port 3000
   - Check for syntax errors
   - Clear .next folder
   - Run `npm install` again

4. **Admin login doesn't work**
   - Verify admin exists in database
   - Check .env.local for credentials
   - Try creating new admin in Prisma Studio
   - Clear browser cookies

5. **Components not rendering**
   - Check browser console (F12)
   - Check server logs in terminal
   - Verify imports in components
   - Check for TypeScript errors

---

**Keep this checklist handy during setup!** ✨
