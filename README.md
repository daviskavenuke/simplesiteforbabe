# TSUK - Premium Cosmetics E-commerce Platform

A blazing-fast e-commerce platform built with Next.js 14, optimized for performance and user experience. No database required - uses JSON file storage and ImgBB for images.

## ✨ Features

### 🛍️ Shopping Features
- **Modern Homepage** - Hero section with curated products
- **Product Gallery** - Fast-loading grid with images
- **Product Details** - Full descriptions, prices, categories
- **Shopping Cart** - Persistent cart with local storage
- **WhatsApp Ordering** - One-click order messaging
- **Fast Performance** - ISR caching, optimized images, code splitting

### 👨‍💼 Admin Dashboard
- **Secure Login** - NextAuth.js authentication  
- **Product CRUD** - Add, edit, delete products
- **Image Upload** - ImgBB cloud storage integration
- **Description Management** - Full product descriptions
- **Quick Actions** - Fast product management interface

## Tech Stack

**Optimized for Speed & Simplicity:**
- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS (minimal config)
- **State**: Zustand (lightweight)
- **Forms**: React Hook Form + Zod
- **Auth**: NextAuth.js (file-based)
- **Storage**: JSON files + ImgBB cloud

**Zero dependencies removed:**
- ❌ Axios (native fetch)
- ❌ Clsx (Tailwind only)
- ❌ Tailwind-merge (not needed)

## Project Structure

```
tsuk/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── auth/
│   │   │   └── products/
│   │   ├── admin/
│   │   │   ├── dashboard/
│   │   │   └── login/
│   │   ├── products/
│   │   │   └── [id]/
│   │   ├── cart/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── ProductCard.tsx
│   │   └── ProductDetails.tsx
│   ├── lib/
│   │   ├── store.ts
│   │   ├── validation.ts
│   │   ├── whatsapp.ts
│   │   └── imgbb.ts
│   ├── types/
│   │   └── index.ts
│   ├── data/
│   │   └── products.json
│   └── middleware.ts
├── public/
├── .env.local
├── next.config.ts
├── tailwind.config.js
└── tsconfig.json
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- ImgBB API key (free)

### Setup (5 minutes)

```bash
# 1. Install
npm install

# 2. Configure
cp .env.example .env.local

# 3. Add ImgBB API key
# Edit .env.local:
# NEXT_PUBLIC_IMGBB_API_KEY=your-key-here

# 4. Start
npm run dev

# 5. Visit http://localhost:3000
```

### Admin Login
- **URL**: `http://localhost:3000/admin/login`
- **Email**: `admin@tsuk.com`
- **Password**: `Admin@123456`

## ⚡ Performance Optimizations

- **ISR (60s revalidation)** - Products cached automatically
- **Image Optimization** - WebP/AVIF formats, lazy loading
- **Code Splitting** - Dynamic imports for components
- **Bundle Minimized** - Removed unused dependencies
- **Production Ready** - SWC minification, no source maps
- **HTTP Caching** - Static assets cached 1 year

## 📦 Environment Variables

```bash
# Admin credentials
ADMIN_EMAIL=admin@tsuk.com
ADMIN_PASSWORD=Admin@123456
NEXTAUTH_SECRET=your-secret-key-here

# ImgBB (get free key from imgbb.com)
NEXT_PUBLIC_IMGBB_API_KEY=your-api-key

# WhatsApp
NEXT_PUBLIC_WHATSAPP_NUMBER=1234567890

# Production (optional)
NEXTAUTH_URL=https://yourdomain.com
```

## 📱 Responsive Design

- ✅ Mobile (320px+)
- ✅ Tablet (768px+)
- ✅ Desktop (1024px+)

## 🔌 API Endpoints

```
GET    /api/products      # All products
POST   /api/products      # Create product
GET    /api/products/:id  # Product details
PUT    /api/products/:id  # Update product
DELETE /api/products/:id  # Delete product
```

## 🔒 Security

- NextAuth.js authentication
- Zod validation on all forms
- TypeScript type safety
- Protected admin routes
- Environment variable protection

## 📊 Scripts

```bash
npm run dev      # Dev server (http://localhost:3000)
npm run build    # Production build
npm start        # Start production server
npm run lint     # Run linter
```

## 🚀 Deployment

Deploy to Vercel in 1 click:
1. Push to GitHub
2. Connect repo to Vercel
3. Set environment variables
4. Deploy!

Works on: Vercel, Netlify, AWS, DigitalOcean, Railway

## 📄 License

MIT - Free for personal and commercial use

---

**Status**: Production Ready ✅  
**Version**: 2.0 (Optimized)  
**Last Updated**: December 2024

Edit `.env.local` and add:
- `DATABASE_URL`: Your MongoDB connection string
- `NEXTAUTH_URL`: `http://localhost:3000` (or your deployment URL)
- `NEXTAUTH_SECRET`: Generate with `openssl rand -base64 32`
- `NEXT_PUBLIC_WHATSAPP_NUMBER`: Your WhatsApp Business Number

4. **Setup Prisma**
```bash
npx prisma generate
npx prisma migrate dev --name init
```

5. **Create initial admin user** (optional)
```bash
npx prisma db seed
```

Or manually insert an admin in MongoDB:
```javascript
db.admins.insertOne({
  email: "admin@tsuk.com",
  password: "Admin@123456", // Use bcrypt in production!
  name: "Admin"
})
```

6. **Start development server**
```bash
npm run dev
```

Visit http://localhost:3000

## Usage

### Customer Flow
1. Browse products on homepage
2. Click "View Details" for full product information
3. Add items to cart or "Order on WhatsApp"
4. View cart and proceed to checkout
5. Click "Order All on WhatsApp" to send entire order
6. Chat with seller on WhatsApp

### Admin Flow
1. Go to http://localhost:3000/admin/login
2. Login with demo credentials:
   - Email: `admin@tsuk.com`
   - Password: `Admin@123456`
3. Add/Edit/Delete products from dashboard
4. Upload product images
5. View all products and manage inventory

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create product (admin only)
- `GET /api/products/[id]` - Get product details
- `PUT /api/products/[id]` - Update product (admin only)
- `DELETE /api/products/[id]` - Delete product (admin only)

### Authentication
- `POST /api/auth/signin` - Login
- `GET /api/auth/session` - Get session

## Database Schema

### Product
```prisma
- id: String (MongoDB ObjectId)
- name: String (unique)
- description: String
- price: Float
- category: String
- image: String
- createdAt: DateTime
- updatedAt: DateTime
```

### Admin
```prisma
- id: String (MongoDB ObjectId)
- email: String (unique)
- password: String
- name: String
- createdAt: DateTime
- updatedAt: DateTime
```

## Customization

### Change Color Scheme
Edit `tailwind.config.js`:
```javascript
colors: {
  primary: '#your-color',
  secondary: '#your-color',
  accent: '#your-color',
}
```

### Update WhatsApp Integration
1. Get your WhatsApp Business number
2. Update `NEXT_PUBLIC_WHATSAPP_NUMBER` in `.env.local`
3. Messages are auto-generated in `src/lib/whatsapp.ts`

### Image Upload
Currently supports base64 data URLs. For production:
1. Integrate with Cloudinary, AWS S3, or another service
2. Update image upload handler in admin dashboard
3. Store image URLs in database

## Performance Tips

- Images are optimized with Next.js Image component
- Cart state persists in localStorage
- Admin pages are protected with middleware
- Database queries are optimized with Prisma
- CSS animations use GPU acceleration

## Security Notes

⚠️ **For Production:**
1. Use bcrypt for password hashing
2. Enable HTTPS
3. Add CSRF protection
4. Validate all inputs server-side
5. Rate limit API endpoints
6. Use environment variables for secrets
7. Implement proper error handling
8. Add logging and monitoring

## Deployment

### Deploy to Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

### Deploy to Other Platforms
1. Set environment variables in platform settings
2. Run build: `npm run build`
3. Start server: `npm start`

## Troubleshooting

### Products not loading
- Check MongoDB connection string
- Run `npx prisma migrate deploy`
- Check browser console for errors

### Admin login fails
- Verify admin credentials in MongoDB
- Check NEXTAUTH_SECRET is set
- Clear browser cookies

### Images not showing
- Verify image URLs are valid
- Check Next.js image domains config
- Use relative paths for local images

## Future Enhancements
- Payment integration (Stripe, PayPal)
- Order tracking system
- Customer reviews and ratings
- Email notifications
- Wishlist feature
- Search and filtering
- Multi-language support
- SEO optimization

## Support
For issues and questions, please contact: support@tsuk.com

## License
MIT License - feel free to use this project for personal and commercial purposes.
a very simple e commerce website
