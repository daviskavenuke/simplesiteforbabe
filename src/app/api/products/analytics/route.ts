import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const PRODUCTS_FILE = path.join(process.cwd(), 'data', 'products.json');

function getProducts() {
  try {
    const data = fs.readFileSync(PRODUCTS_FILE, 'utf-8');
    const json = JSON.parse(data);
    return json.products || [];
  } catch (error) {
    return [];
  }
}

function saveProducts(products: any[]) {
  try {
    const data = { products };
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('Failed to save products:', error);
    return false;
  }
}

// GET analytics for all products
export async function GET() {
  try {
    const products = getProducts();
    
    // Sort by likes (most loved) and orders (most ordered)
    const byLikes = [...products]
      .sort((a, b) => (b.likes || 0) - (a.likes || 0))
      .slice(0, 5);
    
    const byOrders = [...products]
      .sort((a, b) => (b.orders || 0) - (a.orders || 0))
      .slice(0, 5);

    return NextResponse.json({
      mostLoved: byLikes,
      mostOrdered: byOrders,
      totalProducts: products.length,
    });
  } catch (error) {
    console.error('Failed to fetch analytics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}

// POST to update product metrics
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productId, action } = body; // action: 'like' or 'order'

    if (!productId || !action) {
      return NextResponse.json(
        { error: 'Product ID and action are required' },
        { status: 400 }
      );
    }

    const products = getProducts();
    const productIndex = products.findIndex((p: any) => p.id === productId);

    if (productIndex === -1) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    if (action === 'like') {
      products[productIndex].likes = (products[productIndex].likes || 0) + 1;
    } else if (action === 'order') {
      products[productIndex].orders = (products[productIndex].orders || 0) + 1;
    } else {
      return NextResponse.json(
        { error: 'Invalid action. Use "like" or "order"' },
        { status: 400 }
      );
    }

    saveProducts(products);

    return NextResponse.json(products[productIndex], { status: 200 });
  } catch (error: any) {
    console.error('Failed to update metrics:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update metrics' },
      { status: 500 }
    );
  }
}
