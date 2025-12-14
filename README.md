# TSUK - Premium Cosmetics E-Commerce Store

A modern, full-stack e-commerce website for selling cosmetics built with Next.js 14+, MongoDB, Prisma, and Tailwind CSS.

## Features

### 🛍️ Customer Features
- **Modern Homepage** - Hero section with featured products
- **Product Gallery** - Beautiful grid layout with product cards
- **Product Details** - Detailed product pages with images and descriptions
- **Shopping Cart** - Full-featured cart with quantity management
- **WhatsApp Integration** - Direct order messaging with pre-filled product details
- **Responsive Design** - Mobile-first, works on all devices
- **Fast & Optimized** - Image optimization and smooth animations

### 👨‍💼 Admin Features
- **Secure Login** - NextAuth.js authentication
- **Product Management** - Add, edit, and delete products
- **Image Uploads** - Preview images before uploading
- **Product Dashboard** - View all products and manage inventory
- **Form Validation** - React Hook Form with Zod validation

## Tech Stack

- **Frontend**: Next.js 14+ (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS, custom animations
- **Database**: MongoDB with Prisma ORM
- **Authentication**: NextAuth.js
- **Forms**: React Hook Form with Zod validation
- **State Management**: Zustand (cart storage)
- **Images**: Next.js Image Optimization
- **API**: REST API routes with Next.js App Router

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
│   │   ├── prisma.ts
│   │   ├── store.ts
│   │   ├── validation.ts
│   │   └── whatsapp.ts
│   ├── types/
│   │   └── index.ts
│   └── middleware.ts
├── prisma/
│   └── schema.prisma
├── public/
├── .env.local
├── next.config.js
├── tailwind.config.js
└── tsconfig.json
```

## Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn/pnpm
- MongoDB Atlas account or local MongoDB instance
- NextAuth secret key

### Installation

1. **Clone the repository**
```bash
git clone <repo-url>
cd tsuk
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

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
