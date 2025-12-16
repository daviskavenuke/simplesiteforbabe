Please create a full-stack e-commerce website for selling cosmetics using Next.js 14+ (App Router). Here are the requirements:

FRONTEND FEATURES:
1. Homepage with:
   - Modern hero section for cosmetics
   - Grid/list of all products (product cards with name, price, and image)
   - Each product card should have "View Details" and "Add to Cart" buttons

2. Product Details Page:
   - Large product image
   - Name, price, and full description
   - "Add to Cart" button
   - "Order on WhatsApp" button - when clicked, opens WhatsApp with pre-filled message including product details

3. Shopping Cart:
   - List of selected products
   - Ability to change quantity
   - Total price
   - "Order All on WhatsApp" button - sends entire order to seller

4. Design:
   - Modern, clean, responsive design (mobile-first)
   - Simple color scheme (pink/rose and neutral colors for cosmetics theme)
   - Professional animations and transitions
   - Fast loading with optimized images

ADMIN PANEL:
1. Login page for admin
2. Admin dashboard with:
   - Form to add new products (name, price, description, category, image upload)
   - List of all existing products
   - Edit/Delete functionality for each product
   - Image upload preview

TECHNICAL REQUIREMENTS:
- Next.js 14+ App Router
- Tailwind CSS for styling
- MongoDB/Prisma for database
- NextAuth.js for admin authentication
- React Hook Form for forms
- Zod for validation
- Cloudinary or local storage for images
- WhatsApp API integration (direct link generation)
- Responsive design for mobile, tablet, desktop

Provide complete project structure and full code for all essential files.




cosmetics-shop/
│
├── src/
│   ├── app/
│   │   ├── (main)/                    # Public routes
│   │   │   ├── layout.tsx             # Main layout with navbar
│   │   │   ├── page.tsx               # Homepage
│   │   │   ├── products/
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx       # Product details page
│   │   │   └── cart/
│   │   │       └── page.tsx           # Cart page
│   │   │
│   │   ├── admin/                     # Admin routes
│   │   │   ├── layout.tsx             # Admin layout
│   │   │   ├── login/
│   │   │   │   └── page.tsx           # Admin login
│   │   │   └── dashboard/
│   │   │       ├── page.tsx           # Admin dashboard
│   │   │       ├── products/
│   │   │       │   ├── page.tsx       # Products list
│   │   │       │   ├── new/
│   │   │       │   │   └── page.tsx   # Add new product
│   │   │       │   └── edit/
│   │   │       │       └── [id]/
│   │   │       │           └── page.tsx # Edit product
│   │   │
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   └── [...nextauth]/
│   │   │   │       └── route.ts       # NextAuth configuration
│   │   │   ├── products/
│   │   │   │   ├── route.ts           # GET all, POST new product
│   │   │   │   └── [id]/
│   │   │   │       └── route.ts       # GET, PUT, DELETE product
│   │   │   └── upload/
│   │   │       └── route.ts           # Image upload handler
│   │   │
│   │   ├── globals.css                # Global styles
│   │   └── layout.tsx                 # Root layout
│   │
│   ├── components/
│   │   ├── ui/                        # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Card.tsx
│   │   │   └── Modal.tsx
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── AdminSidebar.tsx
│   │   ├── products/
│   │   │   ├── ProductCard.tsx        # Product card for homepage
│   │   │   ├── ProductGrid.tsx        # Grid layout
│   │   │   └── ProductForm.tsx        # Form for add/edit product
│   │   └── cart/
│   │       ├── CartItem.tsx           # Single cart item
│   │       └── CartSummary.tsx        # Total and checkout
│   │
│   ├── lib/
│   │   ├── db.ts                      # Database connection
│   │   ├── auth.ts                    # Auth configuration
│   │   ├── validations.ts             # Zod schemas
│   │   └── utils.ts                   # Utility functions
│   │
│   ├── hooks/
│   │   ├── useCart.ts                 # Cart state management
│   │   └── useProducts.ts             # Products data fetching
│   │
│   ├── types/
│   │   └── index.ts                   # TypeScript types
│   │
│   └── store/
│       └── cartStore.ts               # Zustand store for cart
│
├── prisma/
│   ├── schema.prisma                  # Database schema
│   └── seed.ts                        # Seed data
│
├── public/
│   ├── images/                        # Static images
│   └── placeholder.png                # Default product image
│
├── .env.local                         # Environment variables
├── .gitignore
├── next.config.js
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md





## PROJECT PROMPT: NEXT.JS COSMETICS E-COMMERCE WEBSITE

**Project Title:**
Simple Modern Cosmetics E-Commerce Website with WhatsApp Ordering

**Project Description:**
Design and develop a simple, modern, and responsive cosmetics selling website using **Next.js**. The website allows customers to browse cosmetics products, view product details, add items to a cart, and place orders directly via **WhatsApp**. The platform also includes an **Admin Panel** for managing products.

---

## FUNCTIONAL REQUIREMENTS

### 1. Customer-Facing Website

* Display a **list of cosmetic products** on the homepage.
* Each product card must include:

  * Product image
  * Product name
  * Price
  * “View Details” button
  * “Add to Cart” button

### 2. Product Details Page

* When a user clicks **View Details**, show:

  * Product image (large)
  * Product name
  * Price
  * Detailed description
  * Quantity selector
  * Add to Cart button
  * Buy / Order via WhatsApp button

### 3. Cart Functionality

* Users can:

  * Add products to cart
  * Increase or decrease quantity
  * Remove products from cart
* Cart persists during the session (localStorage).

### 4. WhatsApp Ordering System

* Clicking **Buy / Order** should:

  * Automatically open WhatsApp
  * Pre-fill a message containing:

    * Product name
    * Product image link
    * Quantity selected
    * Total price
* Message is sent to the **seller’s WhatsApp number**.

Example WhatsApp message format:

> Hello, I want to order:
> Product: XYZ Cosmetic
> Quantity: 2
> Price: TZS xxxx
> Image: [product image link]

---

## ADMIN PANEL REQUIREMENTS

### 5. Admin Authentication

* Admin login (simple authentication).
* Only admin can access admin panel routes.

### 6. Product Management

Admin can:

* Add new products
* Upload product images
* Edit product details
* Delete products

Each product should have:

* Product ID
* Name
* Description
* Price
* Image
* Category (optional)
* Availability status

---

## DESIGN & UI REQUIREMENTS

* Simple but **modern UI**
* Clean color palette (soft cosmetic-friendly colors)
* Fully **responsive** (mobile-first)
* Minimal animations
* Easy navigation

---

## TECHNICAL STACK

* **Framework:** Next.js (App Router preferred)
* **Styling:** Tailwind CSS
* **State Management:** React Context or simple state
* **Storage:**

  * Products: Database or JSON (for MVP)
  * Cart: localStorage
* **Deployment:** Vercel
* **External Integration:** WhatsApp Click-to-Chat API

---

## NON-FUNCTIONAL REQUIREMENTS

* Fast page loading
* SEO-friendly pages
* Clean project structure
* Reusable components
* Scalable architecture

---

## BONUS FEATURES (OPTIONAL, IF YOU’RE NOT LAZY)

* Product search
* Category filtering
* Admin dashboard analytics
* Image optimization
* Dark mode

---

I

ImgBB
API version 1
Imgbb's API v1 allows you to upload images.

4fccfe2952205045dfcf3c4968c0c223


Request method
API v1 calls can be made using the POST or GET request methods, but since GET requests are limited by the maximum allowed URL length, you should prefer the POST method.

Image Upload
https://api.imgbb.com/1/upload

Parameters
key (required)
The API key.
image (required)
A binary file, base64 data, or an image URL (up to 32 MB).
name (optional)
The name of the file; this is automatically detected if you upload a file using POST and multipart/form-data.
expiration (optional)
Enable this if you want uploads to be automatically deleted after a certain time (in seconds, 60-15552000).
Example call
curl --location --request POST "https://api.imgbb.com/1/upload?expiration=600&key=YOUR_CLIENT_API_KEY" --form "image=R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"

Note: Always use POST when uploading local files. URL encoding may alter the base64 source due to encoded characters or simply because of the URL length limit when using GET.

API response
API v1 responses display all uploaded image information in JSON format.

In the JSON response, the headers will include status codes to let you easily determine whether the request was OK. It will also include the status property.

Example response (JSON)
{
	"data": {
		"id": "2ndCYJK",
		"title": "c1f64245afb2",
		"url_viewer": "https://ibb.co/2ndCYJK",
		"url": "https://i.ibb.co/w04Prt6/c1f64245afb2.gif",
		"display_url": "https://i.ibb.co/98W13PY/c1f64245afb2.gif",
		"width":"1",
		"height":"1",
		"size": "42",
		"time": "1552042565",
		"expiration":"0",
		"image": {
			"filename": "c1f64245afb2.gif",
			"name": "c1f64245afb2",
			"mime": "image/gif",
			"extension": "gif",
			"url": "https://i.ibb.co/w04Prt6/c1f64245afb2.gif",
		},
		"thumb": {
			"filename": "c1f64245afb2.gif",
			"name": "c1f64245afb2",
			"mime": "image/gif",
			"extension": "gif",
			"url": "https://i.ibb.co/2ndCYJK/c1f64245afb2.gif",
		},
		"medium": {
			"filename": "c1f64245afb2.gif",
			"name": "c1f64245afb2",
			"mime": "image/gif",
			"extension": "gif",
			"url": "https://i.ibb.co/98W13PY/c1f64245afb2.gif",
		},
		"delete_url": "https://ibb.co/2ndCYJK/670a7e48ddcb85ac340c717a41047e5c"
	},
	"success": true,
	"status": 200
}
Drag and drop or paste images here to upload
You can also browse from your computer or add image URLs.
close