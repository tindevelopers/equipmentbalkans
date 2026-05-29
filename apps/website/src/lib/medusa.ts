// apps/website/src/lib/medusa.ts

const BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000";
const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "";

export interface MedusaImage {
  id: string;
  url: string;
}

export interface MedusaProductOption {
  id: string;
  title: string;
  values: { id: string; value: string }[];
}

export interface MedusaProductVariant {
  id: string;
  title: string;
  sku: string;
  prices: { amount: number; currency_code: string }[];
}

export interface MedusaProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  thumbnail: string;
  status: string;
  images: MedusaImage[];
  options: MedusaProductOption[];
  variants: MedusaProductVariant[];
  created_at: string;
}

interface ProductListResponse {
  products: MedusaProduct[];
  count: number;
  offset: number;
  limit: number;
}

interface ProductDetailResponse {
  product: MedusaProduct;
}

export async function getProducts(
  params?: Record<string, string>
): Promise<ProductListResponse> {
  const url = new URL(`${BACKEND_URL}/store/products`);
  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  }
  url.searchParams.set("fields", "id,title,handle,description,thumbnail,status,images.*,variants.*,options.*,created_at");

  const res = await fetch(url.toString(), {
    headers: { "x-publishable-api-key": PUBLISHABLE_KEY },
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to fetch products: ${res.status} ${err}`);
  }

  return res.json();
}

export async function getProductByHandle(
  handle: string
): Promise<MedusaProduct | null> {
  const url = new URL(`${BACKEND_URL}/store/products`);
  url.searchParams.set("handle", handle);
  url.searchParams.set("fields", "id,title,handle,description,thumbnail,status,images.*,variants.*,options.*,created_at");

  const res = await fetch(url.toString(), {
    headers: { "x-publishable-api-key": PUBLISHABLE_KEY },
    next: { revalidate: 60 },
  });

  if (!res.ok) return null;

  const data: ProductListResponse = await res.json();
  return data.products[0] || null;
}

export async function getProductById(
  id: string
): Promise<MedusaProduct | null> {
  const url = `${BACKEND_URL}/store/products/${id}`;
  const res = await fetch(url, {
    headers: { "x-publishable-api-key": PUBLISHABLE_KEY },
    next: { revalidate: 60 },
  });

  if (!res.ok) return null;

  const data: ProductDetailResponse = await res.json();
  return data.product;
}
