import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const product = await req.json();

    // Call external API from server-side (no CORS)
    const res = await fetch('https://api.escuelajs.co/api/v1/products/', {
        method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
    });

    const data = await res.json();
    return NextResponse.json(data);
}
