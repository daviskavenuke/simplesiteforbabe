# TSUK - Setup and Installation Guide

## 📋 Quick Start

This guide will help you set up and run the TSUK e-commerce platform locally.

### Step 1: Install Dependencies

```bash
npm install
```

This will install all required packages including:
- Next.js 14+
- React 18
- NextAuth.js for authentication
- React Hook Form
- Zod for validation
- Zustand for state management
- Tailwind CSS for styling
- ImgBB for image hosting

### Step 2: Configure Environment Variables

1. Copy the example file:
```bash
cp .env.example .env.local
```

2. Edit `.env.local` with your configuration:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# Admin Credentials (change these!)
ADMIN_EMAIL=admin@tsuk.com
ADMIN_PASSWORD=Admin@123456

# ImgBB API Key (required for image uploads)
NEXT_PUBLIC_IMGBB_API_KEY=your-imgbb-api-key

# WhatsApp Business Phone Number
NEXT_PUBLIC_WHATSAPP_NUMBER=1234567890
```

### Step 3: Get ImgBB API Key

ImgBB is used for image hosting. Follow these steps:

1. Visit [ImgBB](https://imgbb.com/)
2. Click "Sign up" (optional but recommended)
3. Go to [API account page](https://api.imgbb.com/)
4. Click "Get API Key"
5. Copy your API key
6. Paste it in `.env.local` as `NEXT_PUBLIC_IMGBB_API_KEY`

**For detailed instructions, see [IMGBB_SETUP.md](./IMGBB_SETUP.md)**

### Step 4: Start Development Server

```bash
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **API**: http://localhost:3000/api
- **Admin Dashboard**: http://localhost:3000/admin/dashboard

## 🔑 Default Admin Credentials

```
Email: admin@tsuk.com
Password: Admin@123456
```

⚠️ **Change these in `.env.local` before going to production!**

### To Change Admin Credentials:

Edit `.env.local`:
```env
ADMIN_EMAIL=your-email@example.com
ADMIN_PASSWORD=your-secure-password
```

Then restart the development server.

## 📁 Project Structure

```
tsuk/
├── src/
│   ├── app/
│   │   ├── page.tsx           # Homepage
│   │   ├── layout.tsx         # Root layout
│   │   ├── globals.css        # Global styles
│   │   ├── api/
│   │   │   ├── auth/          # Authentication
│   │   │   └── products/      # Product API
│   │   ├── products/          # Product details page
│   │   ├── cart/              # Shopping cart page
│   │   └── admin/             # Admin pages
│   ├── components/            # React components
│   ├── lib/                   # Utilities
│   │   ├── imgbb.ts          # Image upload
│   │   ├── store.ts          # Zustand cart store
│   │   ├── validation.ts     # Zod schemas
│   │   └── whatsapp.ts       # WhatsApp integration
│   └── types/                # TypeScript types
├── data/
│   └── products.json         # Product database (JSON file)
├── public/                   # Static files
└── [config files]
```

## 📱 WhatsApp Integration

### Get Your WhatsApp Business Number

1. Go to [WhatsApp Business API](https://www.whatsapp.com/business/api)
2. Create an account and get your Business Phone Number
3. Update `NEXT_PUBLIC_WHATSAPP_NUMBER` in `.env.local`

### How It Works

- Users click "Order on WhatsApp" button
- Pre-filled message is generated with product details and price
- Opens WhatsApp Web with the message ready to send
- You receive the order on WhatsApp

## 📸 Image Uploads

Images are hosted on **ImgBB** (cloud CDN):

### How It Works

1. **Admin uploads image** → ImgBB API
2. **ImgBB returns URL** → Saved with product
3. **Frontend displays** → From ImgBB CDN (fast, global)

### Upload Limits

- **Max file size**: 32MB per image
- **Formats**: JPG, PNG, GIF, WebP
- **Pricing**: Free tier (unlimited uploads)

### Testing Image Upload

1. Go to admin dashboard: http://localhost:3000/admin/dashboard
2. Login with admin credentials
3. Add a new product with image
4. Image should upload to ImgBB and display on homepage

## 📦 Product Management

Products are stored in `data/products.json` (no database needed).

### Add Products Manually

Edit `data/products.json`:

```json
{
  "products": [
    {
      "id": "prod_123",
      "name": "Product Name",
      "description": "Product description",
      "price": 2500,
      "category": "Skincare",
      "image": "https://i.imgbb.com/xxx/image.jpg",
      "createdAt": "2024-01-15T10:00:00Z"
    }
  ]
}
```

### Add Products via Admin Dashboard

1. Login to admin dashboard
2. Fill in product details
3. Upload image (to ImgBB)
4. Click "Add Product"
5. Product appears on homepage immediately

## 🧪 Testing the Application

### Test Customer Features

1. **Homepage** (http://localhost:3000)
   - View hero section
   - View product grid
   - Click on products to see details

2. **Product Details** (http://localhost:3000/products/prod_1)
   - View full product details
   - Add to cart
   - Order on WhatsApp

3. **Shopping Cart** (http://localhost:3000/cart)
   - View cart items
   - Update quantities
   - Remove items
   - Order on WhatsApp

### Test Admin Features

1. **Login** (http://localhost:3000/admin/login)
   - Use default credentials
   - Should redirect to dashboard

2. **Dashboard** (http://localhost:3000/admin/dashboard)
   - Add new products
   - Upload images
   - Edit existing products
   - Delete products
   - All changes saved to `data/products.json`

## 🚀 Production Deployment

### Requirements

- Node.js 18+ 
- npm or yarn

### Build for Production

```bash
npm run build
npm run start
```

### Environment Variables for Production

Create a `.env.production.local` file:

```env
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=generate-a-secure-random-string
ADMIN_EMAIL=your-admin-email@example.com
ADMIN_PASSWORD=your-secure-password
NEXT_PUBLIC_IMGBB_API_KEY=your-imgbb-key
NEXT_PUBLIC_WHATSAPP_NUMBER=your-whatsapp-number
```

### Deployment Options

**Vercel (Recommended)**
```bash
npm i -g vercel
vercel
```

**Other Platforms**
- Heroku
- Railway
- Render
- Digital Ocean

## 🛠️ Troubleshooting

### "ImgBB API key is not configured"
- Check `.env.local` has `NEXT_PUBLIC_IMGBB_API_KEY`
- Restart dev server after updating env
- Verify no extra spaces in key

### Products not loading
- Check `data/products.json` exists and is valid JSON
- Ensure it has the correct structure
- Check browser console for errors

### Admin login not working
- Verify `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `.env.local`
- Make sure email matches exactly
- Restart dev server after changing credentials

### Images not uploading
- Check imgbb API key is valid
- Verify image size < 32MB
- Check image format (JPG, PNG, GIF, WebP)
- Check internet connection

## 📚 Additional Resources

- [Next.js Docs](https://nextjs.org/docs)
- [React Hook Form](https://react-hook-form.com/)
- [Zod Validation](https://zod.dev/)
- [Zustand](https://github.com/pmndrs/zustand)
- [ImgBB API](https://api.imgbb.com/)
- [WhatsApp API](https://www.whatsapp.com/business/api)

## ✅ Setup Checklist

- [ ] Cloned repository
- [ ] Run `npm install`
- [ ] Created `.env.local`
- [ ] Set admin credentials
- [ ] Got ImgBB API key
- [ ] Set `NEXT_PUBLIC_IMGBB_API_KEY`
- [ ] Set WhatsApp number (if needed)
- [ ] Run `npm run dev`
- [ ] Tested homepage
- [ ] Tested admin login
- [ ] Tested product upload with image
- [ ] Tested shopping cart
- [ ] Tested WhatsApp order button

---

✅ **Setup Complete!** You're ready to run TSUK!

For questions or issues, check the troubleshooting section or review the code comments.
