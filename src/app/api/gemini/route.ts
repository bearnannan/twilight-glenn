import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        return NextResponse.json({ error: 'GEMINI_API_KEY is not configured' }, { status: 500 });
    }

    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

        const { title, progress, locationName, currentItems } = await request.json();

        const prompt = `I am managing a construction/engineering project.
        Project Title: "${title}"
        Location: "${locationName}"
        Progress: ${progress}%
        Current Action Items: ${JSON.stringify(currentItems)}

        Please suggest 3-5 specific, actionable, short "action items" (tasks) that should be done next for this project, considering its current progress.
        Return ONLY the list of items as a JSON array of strings. Do not include any markdown formatting or explanation. 
        Example: ["Inspect site foundation", "Order concrete"]`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Clean up markdown if present (e.g. ```json ... ```)
        const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();

        const suggestedItems = JSON.parse(cleanedText);

        return NextResponse.json({ suggestedItems });
    } catch (error: any) {
        console.error('Gemini API Error:', error);
        return NextResponse.json({ error: error.message || 'Failed to generate content' }, { status: 500 });
    }
}
