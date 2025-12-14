# 🎯 TSUK - Quick Reference Card

## ⚡ Quick Commands

```bash
# Setup
npm install                      # Install dependencies
cp .env.example .env.local       # Copy environment template
npm run prisma:migrate           # Setup database
npm run prisma:seed              # Add sample data

# Development
npm run dev                       # Start dev server (http://localhost:3000)
npm run build                     # Build for production
npm start                         # Start production server
npx prisma studio                # Open database GUI

# Database
npx prisma migrate dev --name xxx # Create migration
npx prisma db push              # Push schema to database
npx prisma generate             # Generate Prisma client

# Utilities
npx tsc --noEmit                 # Check TypeScript types
npm run lint                     # Run linter
bash scripts/setup.sh            # Interactive setup menu
```

## 🔑 Default Credentials

```
Email:    admin@tsuk.com
Password: Admin@123456
```

⚠️ **Change these in production!**

## 📍 Important URLs

| Location | URL |
|----------|-----|
| Homepage | http://localhost:3000 |
| Product Details | http://localhost:3000/products/:id |
| Shopping Cart | http://localhost:3000/cart |
| Admin Login | http://localhost:3000/admin/login |
| Admin Dashboard | http://localhost:3000/admin/dashboard |
| API Products | http://localhost:3000/api/products |

## 🔌 API Endpoints

```
GET    /api/products          # Get all products
POST   /api/products          # Create product (admin)
GET    /api/products/:id      # Get product
PUT    /api/products/:id      # Update product (admin)
DELETE /api/products/:id      # Delete product (admin)
```

## 📋 Configuration Files

| File | Purpose |
|------|---------|
| `.env.local` | Environment variables (edit this) |
| `tsconfig.json` | TypeScript settings |
| `next.config.ts` | Next.js configuration |
| `tailwind.config.js` | Tailwind CSS colors/fonts |
| `prisma/schema.prisma` | Database schema |
| `package.json` | Dependencies and scripts |

## 📁 Key Files to Edit

```
Frontend:
- src/app/page.tsx              # Homepage
- src/components/               # React components
- tailwind.config.js            # Colors and styles

Backend:
- src/app/api/                  # API routes
- prisma/schema.prisma          # Database schema

Admin:
- src/app/admin/                # Admin pages
```

## 🗄️ Database Models

### Product
```javascript
{
  id: String,           // MongoDB ObjectId
  name: String,         // Unique product name
  description: String,  // Full description
  price: Float,         // Product price
  category: String,     // Product category
  image: String,        // Image URL
  createdAt: DateTime,  // Auto-generated
  updatedAt: DateTime   // Auto-generated
}
```

### Admin
```javascript
{
  id: String,           // MongoDB ObjectId
  email: String,        // Unique email
  password: String,     // Password (should be hashed)
  name: String,         // Admin name
  createdAt: DateTime,  // Auto-generated
  updatedAt: DateTime   // Auto-generated
}
```

## 🎨 Design Colors

| Use | Color |
|-----|-------|
| Primary/Buttons | Pink (#ec4899) |
| Secondary/Text | Slate (#64748b) |
| Accent/Highlights | Light Pink (#f472b6) |
| Success | Green (#10b981) |
| Error | Red (#ef4444) |

## 📦 Main Dependencies

| Package | Use |
|---------|-----|
| next | React framework |
| react | UI library |
| prisma | Database ORM |
| next-auth | Authentication |
| react-hook-form | Forms |
| zod | Validation |
| zustand | State management |
| tailwindcss | Styling |

## 🚀 Deployment Checklist

- [ ] Environment variables set
- [ ] Database connected
- [ ] Admin user created
- [ ] WhatsApp number configured
- [ ] Images working
- [ ] Build succeeds: `npm run build`
- [ ] No TypeScript errors
- [ ] Tested all features

## 🆘 Common Issues

| Problem | Solution |
|---------|----------|
| MongoDB connection fails | Check DATABASE_URL and IP whitelist |
| Admin login doesn't work | Verify credentials in database |
| Images not showing | Check Next.js image domains config |
| Build fails | Run `npm install` and `npm run build` again |
| WhatsApp link broken | Verify NEXT_PUBLIC_WHATSAPP_NUMBER format |

## 📚 Documentation Map

```
Start here:          → SETUP.md
API Reference:       → API.md
Complete Overview:   → PROJECT.md
Deployment:          → DEPLOYMENT.md
File Guide:          → INDEX.md
Main Docs:           → README.md
```

## 🔐 Security Quick Tips

1. **Environment Variables**
   - Never commit `.env.local`
   - Use strong NEXTAUTH_SECRET
   - Keep database URL secret

2. **Passwords**
   - Change default admin password
   - Use bcrypt for hashing (production)
   - Min 12 characters recommended

3. **Database**
   - Enable MongoDB authentication
   - Restrict IP access
   - Regular backups

4. **API**
   - Validate all inputs
   - Use HTTPS (production)
   - Implement rate limiting

## 📊 Project Stats

- **Next.js**: 14+ (App Router)
- **React**: 18+
- **TypeScript**: 5+
- **MongoDB**: Cloud database
- **Components**: 3 main
- **API Routes**: 5 endpoints
- **Pages**: 8 total
- **Files**: 25+ essential

## 🎯 Common Tasks

**Add a Product**
1. Go to http://localhost:3000/admin/login
2. Login with credentials
3. Fill product form
4. Upload image
5. Click "Add"

**Check Database**
```bash
npx prisma studio
# Opens http://localhost:5555
```

**Test WhatsApp**
- Click "Order on WhatsApp" button
- Should open WhatsApp Web with message

**View API Response**
```bash
curl http://localhost:3000/api/products
```

## 💡 Pro Tips

1. **Use Prisma Studio** - Visual database management
2. **TypeScript** - Catch errors early
3. **Tailwind** - Use @apply for custom styles
4. **Next.js** - Automatic code splitting
5. **Environment** - Different values per environment

## 🔗 Useful Links

- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [Tailwind Docs](https://tailwindcss.com/docs)
- [NextAuth Docs](https://next-auth.js.org)
- [MongoDB Docs](https://docs.mongodb.com)

## 📞 Getting Help

1. Check relevant documentation file
2. Review troubleshooting section
3. Check browser console (F12)
4. Check terminal output
5. Read error messages carefully

## ✅ Project Status

- ✅ All files created
- ✅ Database configured
- ✅ API routes ready
- ✅ Authentication setup
- ✅ Admin panel complete
- ✅ Frontend built
- ✅ Documentation done
- ✅ Production ready

---

**Remember**: Start with SETUP.md and have fun building! 🚀
