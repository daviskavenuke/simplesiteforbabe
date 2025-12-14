# TSUK - Deployment Guide

## 🚀 Deploy to Vercel (Recommended)

Vercel is the official platform for Next.js. Deployment is simple and free.

### Prerequisites
- GitHub account
- Vercel account (free)
- MongoDB Atlas account

### Step-by-Step Deployment

#### 1. Push Code to GitHub
```bash
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/tsuk.git
git push -u origin main
```

#### 2. Connect to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Select "Import Git Repository"
4. Connect your GitHub account
5. Select the `tsuk` repository
6. Click "Import"

#### 3. Configure Environment Variables
1. In Vercel dashboard, go to Settings → Environment Variables
2. Add the following:
```
NEXTAUTH_URL = https://yourdomain.vercel.app
NEXTAUTH_SECRET = (generate with: openssl rand -base64 32)
DATABASE_URL = your-mongodb-atlas-url
ADMIN_EMAIL = admin@tsuk.com
ADMIN_PASSWORD = YourSecurePassword123!
NEXT_PUBLIC_WHATSAPP_NUMBER = 1234567890
```

3. Click "Save"

#### 4. Deploy
1. Click "Deploy"
2. Wait for build to complete
3. Visit your deployed site at `https://yourdomain.vercel.app`

#### 5. Initialize Database
```bash
# Run migration on deployed database
npm run prisma:migrate

# Seed initial data
npm run prisma:seed
```

## 🐳 Deploy to Docker

### Dockerfile
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

### Docker Compose
```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: mongodb://mongodb:27017/tsuk
      NEXTAUTH_URL: http://localhost:3000
      NEXTAUTH_SECRET: your-secret
      NEXT_PUBLIC_WHATSAPP_NUMBER: 1234567890
    depends_on:
      - mongodb

  mongodb:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db

volumes:
  mongodb_data:
```

### Build and Run
```bash
docker-compose up -d
```

## ☁️ Deploy to Other Platforms

### Railway.app
1. Connect GitHub repository
2. Add environment variables
3. Deploy automatically on push

### Render
1. Create new Web Service
2. Connect GitHub
3. Set build and start commands
4. Add environment variables
5. Deploy

### DigitalOcean App Platform
1. Create new app
2. Connect GitHub
3. Set environment variables
4. Deploy

### AWS (EC2 + RDS)
1. Launch EC2 instance
2. SSH into instance
3. Clone repository
4. Install Node.js
5. Install MongoDB or use AWS DocumentDB
6. Configure environment variables
7. Run `npm run build && npm start`

## 📋 Pre-Deployment Checklist

- [ ] Update admin email and password
- [ ] Generate new NEXTAUTH_SECRET
- [ ] Set correct NEXTAUTH_URL (production domain)
- [ ] Verify MongoDB connection string
- [ ] Set NEXT_PUBLIC_WHATSAPP_NUMBER
- [ ] Test all features locally
- [ ] Run `npm run build` successfully
- [ ] Configure domain name
- [ ] Set up SSL/HTTPS
- [ ] Configure email notifications (optional)
- [ ] Set up monitoring and logging
- [ ] Backup database regularly

## 🔒 Production Security Checklist

### 1. Authentication
- [ ] Change default admin credentials
- [ ] Use strong passwords (min 12 characters)
- [ ] Implement bcrypt for password hashing
- [ ] Enable rate limiting on login
- [ ] Implement 2FA for admin

### 2. Environment Variables
- [ ] Use production MongoDB URL
- [ ] Generate secure NEXTAUTH_SECRET
- [ ] Hide sensitive keys from git
- [ ] Use .env.local (never commit)
- [ ] Rotate secrets regularly

### 3. Database
- [ ] Enable MongoDB authentication
- [ ] Restrict IP access
- [ ] Set up automated backups
- [ ] Enable encryption at rest
- [ ] Regular security audits

### 4. API Security
- [ ] Implement rate limiting
- [ ] Add CORS policy
- [ ] Validate all inputs
- [ ] Implement CSRF protection
- [ ] Add security headers

### 5. HTTPS/TLS
- [ ] Force HTTPS
- [ ] Use strong TLS version (1.3)
- [ ] Set secure cookies
- [ ] Enable HSTS

### 6. Monitoring
- [ ] Set up error logging (Sentry)
- [ ] Monitor API performance
- [ ] Set up alerts for errors
- [ ] Log all admin actions
- [ ] Monitor database performance

## 📊 Performance Optimization

### 1. Images
- [ ] Enable image optimization
- [ ] Use Next.js Image component
- [ ] Compress images
- [ ] Use WebP format
- [ ] Implement CDN

### 2. Database
- [ ] Add database indexes
- [ ] Optimize queries
- [ ] Enable connection pooling
- [ ] Cache frequently accessed data

### 3. Frontend
- [ ] Minify CSS and JavaScript
- [ ] Enable gzip compression
- [ ] Implement lazy loading
- [ ] Use code splitting
- [ ] Optimize bundle size

### 4. Caching
- [ ] Implement page caching
- [ ] Cache API responses
- [ ] Use CDN for static assets
- [ ] Set appropriate TTL values

## 🔄 CI/CD Pipeline

### GitHub Actions Example
```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy to Vercel
        env:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
        run: vercel --prod
```

## 📱 Mobile App Optimization

To add to home screen on mobile:

1. Update `next.config.ts` with manifest
2. Create `public/manifest.json`:
```json
{
  "name": "TSUK - Premium Cosmetics",
  "short_name": "TSUK",
  "description": "Premium cosmetics online store",
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#ec4899",
  "background_color": "#ffffff",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ]
}
```

3. Add to `src/app/layout.tsx`:
```tsx
<link rel="manifest" href="/manifest.json" />
<meta name="theme-color" content="#ec4899" />
```

## 🆘 Troubleshooting Deployment

### Build fails
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

### Database connection fails
- Verify MongoDB connection string
- Check IP whitelist in MongoDB Atlas
- Ensure environment variables are set
- Test connection with MongoDB Compass

### Images not loading
- Verify image domains in next.config
- Check image URLs are accessible
- Verify CORS is configured
- Use absolute URLs for external images

### WhatsApp links not working
- Verify NEXT_PUBLIC_WHATSAPP_NUMBER is set
- Check phone number format (include country code)
- Test with: `https://wa.me/1234567890?text=test`

## 📞 Support

For deployment issues:
1. Check logs in hosting platform
2. Verify environment variables
3. Review MongoDB connection
4. Check browser console for errors
5. Contact hosting support

## 📚 Additional Resources

- [Vercel Deployment Docs](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [MongoDB Atlas Security](https://docs.mongodb.com/atlas/security/)
- [OWASP Security Checklist](https://owasp.org/www-project-top-ten/)

---

Happy deploying! 🚀
