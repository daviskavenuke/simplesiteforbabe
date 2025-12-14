# ImgBB Setup Guide

This project uses **ImgBB** for cloud-based image hosting instead of a database. Follow this guide to set up image uploads.

## What is ImgBB?

ImgBB is a free image hosting service that provides:
- Free file uploads (up to 32MB per file)
- Fast global CDN for images
- Simple REST API
- No account needed for basic usage
- URL expiration settings
- Direct image URLs for easy integration

## Getting Your ImgBB API Key

### Step 1: Visit ImgBB
Go to [ImgBB](https://imgbb.com/) in your browser.

### Step 2: Sign Up (Optional)
- Click **"Sign up"** in the top right corner
- Use email, Google, or Facebook to create an account
- **Note:** A free account without login exists, but API keys are better with an account

### Step 3: Get Your API Key
1. After signing up, go to your [API account page](https://api.imgbb.com/)
2. Click **"Get API Key"** button
3. You'll see your API key displayed
4. Copy this key - you'll need it for the next step

**Example API Key Format:**
```
a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
```

## Setting Up the Environment Variable

### Step 1: Open `.env.local`
In the project root, find the `.env.local` file and update it:

```env
NEXT_PUBLIC_IMGBB_API_KEY=your-api-key-here
```

Replace `your-api-key-here` with the actual API key you copied.

### Step 2: Verify Setup
The project will automatically use this key for all image uploads.

## How Image Uploads Work

When an admin uploads an image through the admin dashboard:

1. **Upload to ImgBB**: The image is sent to ImgBB's API endpoint
2. **Get URL**: ImgBB returns a permanent image URL
3. **Save Product**: The product is created/updated with the image URL
4. **Display Images**: Frontend displays images directly from ImgBB's CDN

## Image Upload Limits

- **Max file size**: 32MB
- **Supported formats**: JPG, PNG, GIF, WebP
- **Free tier**: Unlimited uploads with free account

## Troubleshooting

### "ImgBB API key is not configured"
- Make sure `NEXT_PUBLIC_IMGBB_API_KEY` is set in `.env.local`
- Restart the development server after changing `.env.local`
- Verify the API key is correct (no extra spaces)

### "Invalid file type"
- Ensure your image is JPG, PNG, GIF, or WebP
- Check file size is under 32MB

### "Upload failed"
- Check your internet connection
- Verify the ImgBB API key is still valid (visit imgbb.com/api to check)
- ImgBB API might be temporarily down (rare)

## Testing Image Upload

1. Go to the admin dashboard: `http://localhost:3000/admin/dashboard`
2. Login with credentials from `.env.local` (default: admin@tsuk.com / Admin@123456)
3. Add a product and upload an image
4. Check if the image uploads successfully
5. Product should appear on the homepage with the image

## Advanced: Image URL Format

ImgBB returns URLs in this format:
```
https://i.imgbb.com/[random-hash]/[filename].[extension]
```

**Example:**
```
https://i.imgbb.com/xYzAbCdEfG/product.jpg
```

You can use these URLs anywhere - they're permanent and hosted on ImgBB's CDN.

## Security Note

- `NEXT_PUBLIC_IMGBB_API_KEY` is a public key (it's safe to be visible in frontend code)
- It's limited to file uploads only
- Never share your ImgBB account password

## Need Help?

- **ImgBB Docs**: https://api.imgbb.com/
- **ImgBB Support**: https://imgbb.com/support

---

✅ **Setup Complete!** Your project is ready to upload images to ImgBB.
