import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

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

export async function GET() {
  try {
    const products = getProducts();
    return NextResponse.json(products);
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, price, category, image } = body;

    if (!name || !price) {
      return NextResponse.json(
        { error: 'Name and price are required' },
        { status: 400 }
      );
    }

    const products = getProducts();
    const newProduct = {
      id: `prod_${uuidv4().slice(0, 8)}`,
      name,
      description: description || '',
      price: parseFloat(price),
      category: category || 'Uncategorized',
      image: image || '',
      createdAt: new Date().toISOString(),
    };

    products.push(newProduct);
    saveProducts(products);

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error: any) {
    console.error('Failed to create product:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create product' },
      { status: 500 }
    );
  }
}
