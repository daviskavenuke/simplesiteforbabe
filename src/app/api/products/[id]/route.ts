import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
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

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const products = getProducts();
    const product = products.find((p: any) => p.id === params.id);

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('Failed to fetch product:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { name, description, price, category, image } = body;

    const products = getProducts();
    const index = products.findIndex((p: any) => p.id === params.id);

    if (index === -1) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    products[index] = {
      ...products[index],
      name: name || products[index].name,
      description: description !== undefined ? description : products[index].description,
      price: price ? parseFloat(price) : products[index].price,
      category: category || products[index].category,
      image: image !== undefined ? image : products[index].image,
      updatedAt: new Date().toISOString(),
    };

    saveProducts(products);

    // Revalidate cache for homepage and product page
    revalidatePath('/');
    revalidatePath('/products');
    revalidatePath(`/products/${params.id}`);

    return NextResponse.json(products[index]);
  } catch (error: any) {
    console.error('Failed to update product:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update product' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const products = getProducts();
    const index = products.findIndex((p: any) => p.id === params.id);

    if (index === -1) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    products.splice(index, 1);
    saveProducts(products);

    // Revalidate cache after deletion
    revalidatePath('/');
    revalidatePath('/products');
    revalidatePath(`/products/${params.id}`);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete product:', error);
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}
