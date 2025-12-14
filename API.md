# TSUK - API Documentation

## Base URL

```
Development: http://localhost:3000
Production: https://yourdomain.com
```

## Authentication

### NextAuth.js Endpoints

#### Sign In
```
POST /api/auth/signin
Content-Type: application/json

{
  "email": "admin@tsuk.com",
  "password": "Admin@123456",
  "csrfToken": "token"
}

Response: 
{
  "ok": true,
  "status": 200,
  "error": null,
  "url": "/admin/dashboard"
}
```

#### Get Session
```
GET /api/auth/session

Response:
{
  "user": {
    "email": "admin@tsuk.com",
    "name": "Administrator",
    "image": null
  },
  "expires": "2024-12-31T00:00:00.000Z"
}
```

#### Sign Out
```
POST /api/auth/signout

Response: { "url": "/" }
```

#### CSRF Token
```
GET /api/auth/csrf

Response:
{
  "csrfToken": "abc123xyz"
}
```

## Product API

### Get All Products

**Endpoint**: `GET /api/products`

**Description**: Retrieve all products

**Query Parameters**: None

**Response**:
```json
[
  {
    "id": "507f1f77bcf86cd799439011",
    "name": "Rose Glow Moisturizer",
    "description": "Luxurious moisturizer with rose extract",
    "price": 34.99,
    "category": "Skincare",
    "image": "https://example.com/image.jpg",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  },
  {
    "id": "507f1f77bcf86cd799439012",
    "name": "Velvet Matte Lipstick",
    "description": "Long-lasting velvet finish lipstick",
    "price": 24.99,
    "category": "Makeup",
    "image": "https://example.com/lipstick.jpg",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

**Status Codes**:
- `200 OK` - Success
- `500 Internal Server Error` - Server error

**Example Request**:
```bash
curl -X GET http://localhost:3000/api/products
```

---

### Get Single Product

**Endpoint**: `GET /api/products/:id`

**Description**: Retrieve a specific product by ID

**Parameters**:
- `id` (string, required) - MongoDB product ID

**Response**:
```json
{
  "id": "507f1f77bcf86cd799439011",
  "name": "Rose Glow Moisturizer",
  "description": "Luxurious moisturizer with rose extract and hyaluronic acid",
  "price": 34.99,
  "category": "Skincare",
  "image": "https://example.com/image.jpg",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

**Status Codes**:
- `200 OK` - Success
- `404 Not Found` - Product not found
- `500 Internal Server Error` - Server error

**Example Request**:
```bash
curl -X GET http://localhost:3000/api/products/507f1f77bcf86cd799439011
```

---

### Create Product

**Endpoint**: `POST /api/products`

**Description**: Create a new product (admin only)

**Authentication**: Required (NextAuth session)

**Request Body**:
```json
{
  "name": "Vitamin C Serum",
  "description": "Brightening serum with pure vitamin C. Reduces dark spots.",
  "price": 49.99,
  "category": "Skincare",
  "image": "https://example.com/serum.jpg"
}
```

**Response** (201 Created):
```json
{
  "id": "507f1f77bcf86cd799439013",
  "name": "Vitamin C Serum",
  "description": "Brightening serum with pure vitamin C. Reduces dark spots.",
  "price": 49.99,
  "category": "Skincare",
  "image": "https://example.com/serum.jpg",
  "createdAt": "2024-01-02T00:00:00.000Z",
  "updatedAt": "2024-01-02T00:00:00.000Z"
}
```

**Validation**:
- `name`: Required, unique, 2-100 characters
- `description`: Required, 10-2000 characters
- `price`: Required, must be positive number
- `category`: Required, minimum 2 characters
- `image`: Optional, must be valid URL

**Error Responses**:
```json
{
  "error": "Product with this name already exists"
}
```

**Status Codes**:
- `201 Created` - Success
- `400 Bad Request` - Validation error
- `401 Unauthorized` - Not authenticated
- `500 Internal Server Error` - Server error

**Example Request**:
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Vitamin C Serum",
    "description": "Brightening serum with pure vitamin C",
    "price": 49.99,
    "category": "Skincare",
    "image": "https://example.com/serum.jpg"
  }'
```

---

### Update Product

**Endpoint**: `PUT /api/products/:id`

**Description**: Update an existing product (admin only)

**Authentication**: Required (NextAuth session)

**Parameters**:
- `id` (string, required) - MongoDB product ID

**Request Body**:
```json
{
  "name": "Vitamin C Serum - Enhanced",
  "description": "Updated description",
  "price": 59.99,
  "category": "Skincare",
  "image": "https://example.com/new-serum.jpg"
}
```

**Response**:
```json
{
  "id": "507f1f77bcf86cd799439013",
  "name": "Vitamin C Serum - Enhanced",
  "description": "Updated description",
  "price": 59.99,
  "category": "Skincare",
  "image": "https://example.com/new-serum.jpg",
  "createdAt": "2024-01-02T00:00:00.000Z",
  "updatedAt": "2024-01-02T12:00:00.000Z"
}
```

**Status Codes**:
- `200 OK` - Success
- `400 Bad Request` - Validation error
- `401 Unauthorized` - Not authenticated
- `404 Not Found` - Product not found
- `500 Internal Server Error` - Server error

**Example Request**:
```bash
curl -X PUT http://localhost:3000/api/products/507f1f77bcf86cd799439013 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Vitamin C Serum - Enhanced",
    "description": "Updated description",
    "price": 59.99,
    "category": "Skincare",
    "image": "https://example.com/new-serum.jpg"
  }'
```

---

### Delete Product

**Endpoint**: `DELETE /api/products/:id`

**Description**: Delete a product (admin only)

**Authentication**: Required (NextAuth session)

**Parameters**:
- `id` (string, required) - MongoDB product ID

**Response**:
```json
{
  "success": true
}
```

**Status Codes**:
- `200 OK` - Success
- `401 Unauthorized` - Not authenticated
- `404 Not Found` - Product not found
- `500 Internal Server Error` - Server error

**Example Request**:
```bash
curl -X DELETE http://localhost:3000/api/products/507f1f77bcf86cd799439013
```

---

## Error Handling

All API endpoints follow consistent error handling:

### Error Response Format
```json
{
  "error": "Error message describing what went wrong"
}
```

### Common Errors

#### Validation Error (400)
```json
{
  "error": "Product name must be at least 2 characters"
}
```

#### Not Found (404)
```json
{
  "error": "Product not found"
}
```

#### Unauthorized (401)
```json
{
  "error": "Unauthorized access"
}
```

#### Server Error (500)
```json
{
  "error": "Failed to fetch products"
}
```

---

## Request/Response Examples

### Complete Product Creation Example

**Request**:
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer session-cookie" \
  -d '{
    "name": "Silk Eye Shadow Palette",
    "description": "16 beautiful eyeshadow colors. Smooth, pigmented, and long-lasting formula. Perfect for creating stunning eye looks.",
    "price": 44.99,
    "category": "Makeup",
    "image": "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&q=80"
  }'
```

**Response** (201):
```json
{
  "id": "507f1f77bcf86cd799439014",
  "name": "Silk Eye Shadow Palette",
  "description": "16 beautiful eyeshadow colors. Smooth, pigmented, and long-lasting formula. Perfect for creating stunning eye looks.",
  "price": 44.99,
  "category": "Makeup",
  "image": "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&q=80",
  "createdAt": "2024-01-03T10:30:00.000Z",
  "updatedAt": "2024-01-03T10:30:00.000Z"
}
```

---

## Data Types and Validation

### Product Object

| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| id | String | Yes | MongoDB ObjectId |
| name | String | Yes | 2-100 chars, unique |
| description | String | Yes | 10-2000 chars |
| price | Number | Yes | > 0 |
| category | String | Yes | Min 2 chars |
| image | String | No | Valid URL |
| createdAt | DateTime | Auto | ISO 8601 |
| updatedAt | DateTime | Auto | ISO 8601 |

### Admin Object

| Field | Type | Required |
|-------|------|----------|
| id | String | Yes |
| email | String | Yes |
| password | String | Yes |
| name | String | No |
| createdAt | DateTime | Auto |
| updatedAt | DateTime | Auto |

---

## Rate Limiting

Currently, no rate limiting is implemented. For production:

```
Recommended:
- 100 requests per minute per IP
- 10 create/update/delete per minute per user
- 1000 requests per hour per IP
```

---

## CORS Configuration

Currently accepts requests from:
- `http://localhost:3000` (development)
- Same origin (production)

To modify, edit headers in API routes.

---

## Pagination

Pagination is not implemented yet. To add:

```javascript
// Example implementation
GET /api/products?page=1&limit=20

Response:
{
  "data": [...],
  "page": 1,
  "limit": 20,
  "total": 150,
  "pages": 8
}
```

---

## Sorting and Filtering

### Sorting
```
GET /api/products?sort=name&order=asc
```

### Filtering
```
GET /api/products?category=Skincare
```

These features can be added to the API routes for advanced queries.

---

## Webhook Support

Webhooks are not currently implemented but can be added for:
- Product created/updated/deleted events
- Order notifications
- Admin login events

---

## API Testing

### Using cURL
```bash
# Get all products
curl http://localhost:3000/api/products

# Create product
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","description":"Test","price":10,"category":"Test"}'
```

### Using Postman
1. Import collection from API documentation
2. Set environment variables
3. Run requests
4. View responses

### Using Thunder Client (VS Code)
1. Install extension
2. Create requests
3. Save as collection
4. Share with team

### Using JavaScript Fetch
```javascript
// Get products
const products = await fetch('/api/products');
const data = await products.json();

// Create product
const newProduct = await fetch('/api/products', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Test Product',
    description: 'Test',
    price: 29.99,
    category: 'Test'
  })
});
```

---

## Best Practices

1. **Always validate input** - Server-side validation is essential
2. **Use HTTPS** - In production, always use HTTPS
3. **Implement rate limiting** - Prevent abuse
4. **Log requests** - For debugging and monitoring
5. **Use meaningful errors** - Help clients understand issues
6. **Cache responses** - Improve performance
7. **Document changes** - Keep API docs updated
8. **Version your API** - Plan for future changes

---

## Versioning

Current API Version: **1.0**

Future versions would use URL paths:
```
/api/v1/products
/api/v2/products
```

---

For more information, see README.md and SETUP.md
