import { GoogleGenerativeAI } from '@google/generative-ai';

// API Key from .env.local
const apiKey = 'AIzaSyD5ey1b5LC6VgYwiq6jw7-Xwt7tZlKdvzM';
const genAI = new GoogleGenerativeAI(apiKey);

const models = ['gemini-1.5-flash', 'gemini-pro', 'gemini-1.0-pro'];

async function test() {
    console.log('--- Starting Gemini Model Test ---');
    for (const modelName of models) {
        try {
            process.stdout.write(`Testing model: ${modelName} ... `);
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent('Hello, are you working?');
            const response = await result.response;
            console.log('✅ SUCCESS!');
        } catch (e) {
            console.log('❌ FAILED');
            console.log(`   Error: ${e.message}`);
        }
    }
    console.log('--- Test Complete ---');
}

test();
