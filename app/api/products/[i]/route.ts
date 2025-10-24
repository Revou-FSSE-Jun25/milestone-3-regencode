import { NextResponse } from 'next/server';
import { CreateProductForm, UpdateProductForm } from '@/app/utils';


interface DynamicPageProps {
    params: Promise<{ i: string }>
}

export async function PUT(req: Request, { params }: DynamicPageProps) {
    const product: UpdateProductForm = await req.json();
    const resolvedParams = await params;
    console.log("updated product params", product);
    const res = await fetch(`https://api.escuelajs.co/api/v1/products/${resolvedParams.i}`, {
        method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
    });
    const data = await res.json();
    return NextResponse.json(data);
};

export async function DELETE(req: Request, { params }: DynamicPageProps) {
    const resolvedParams = await params;
    const res = await fetch(`https://api.escuelajs.co/api/v1/products/${resolvedParams.i}`, {
        method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    });
    const data = await res.json();
    return NextResponse.json(data);
};
