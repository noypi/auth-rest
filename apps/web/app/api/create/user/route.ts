import { NextRequest, NextResponse } from "next/server";
import { redirect } from 'next/navigation'

export async function POST(request: NextRequest) {
    const { BACKEND_HOST, BACKEND_PORT, BACKEND_PROTO } = process.env;
    const server = `${BACKEND_PROTO}://${BACKEND_HOST}:${BACKEND_PORT}`;

    const data = await request.json();
    console.debug('create/user', {data});

    const payload = data.reduce((acc, curr) => {
        acc[curr.name] = curr.value;
        return acc;
    }, {});

    console.debug({payload});
    const res = await fetch(`${server}/user/create`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json',
        },
    })

    return NextResponse.json(await res.json());
}