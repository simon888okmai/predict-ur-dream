import { Elysia, status } from 'elysia'
import { cors } from '@elysiajs/cors'
import { GoogleGenAI } from "@google/genai" //

const app = new Elysia()
    .use(cors())
    .get('/', () => ({
        status: 200,
        message: "Server is running"
    }))
    .post('/api/predict', async ({ body }) => {
        const { dream } = body as { dream: string };

        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: [{ role: "user", parts: [{ text: `คุณคือหมอดูสายกวนประสาท ทำนายฝันคนนี้หน่อย: "${dream}" ขอแบบฮาๆ ประชดประชัน มีแอบด่านิดหน่อยและปิดท้ายด้วยเลขเด็ดงวดนี้` }] }]
        });

        return { result: response.text };
    })
    .listen(5001);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);