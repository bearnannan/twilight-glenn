import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; // Fix: Force dynamic to avoid build error

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const text = searchParams.get('text');

    if (!text) {
        return NextResponse.json({ error: 'Missing text parameter' }, { status: 400 });
    }

    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
        console.error('API Key Missing in Server Environment');
        return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    try {
        const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(text)}&key=${apiKey}`;
        console.log(`Proxying to: ${url.replace(apiKey, 'HIDDEN_KEY')}`); // Debug URL

        const response = await fetch(url);
        const data = await response.json();

        // Check for Google API logic errors
        if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
            console.error('Google API Error:', data); // Log full error to terminal
            throw new Error(data.error_message || `Places API returned ${data.status}`);
        }

        return NextResponse.json(data);
    } catch (error: any) {
        console.error('Proxy Exception:', error.message);
        return NextResponse.json({ error: error.message || 'Failed to fetch places' }, { status: 500 });
    }
}
