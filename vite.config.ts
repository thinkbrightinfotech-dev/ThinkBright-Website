import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, Plugin} from 'vite';
import {GoogleGenAI} from '@google/genai';

function thinkBrightAiPlugin(): Plugin {
  return {
    name: 'thinkbright-ai-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url === '/api/ai/chat' && req.method === 'POST') {
          let bodyStr = '';
          req.on('data', chunk => {
            bodyStr += chunk;
          });
          req.on('end', async () => {
            try {
              const body = JSON.parse(bodyStr || '{}');
              const userQuery = body.query || '';
              const apiKey = process.env.GEMINI_API_KEY;

              if (!apiKey) {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ fallback: true }));
                return;
              }

              const ai = new GoogleGenAI({ apiKey });
              const systemInstruction = `You are ThinkBright AI, the official assistant for ThinkBright Infotech.
Location: Behind Musalat Filling Station, Okediji Area, Ilora, Oyo State, Nigeria.
Phones: 09034836379 / 09015306791. Email: thinkbrightinfotech@gmail.com.
Founder: Opeyemi Israel Okunade, an educator and tech professional.
Key Missions: Empowering youth, schools, and businesses in Nigeria and Africa through practical technology education (Computer fundamentals, Microsoft Office, Graphic Design, Web Development, Python, Mobile Apps, Data Analysis, CBT Training, Teacher ICT, Business digital skills) and commercial services (Printing, Cyber services, CAC registration, Documentation, Laptop sales).
Guidelines:
- Tone: Professional, warm, helpful, African pride with global excellence.
- Do NOT invent facts, prices, or policies.
- If the user asks about payments, legal disputes, disciplinary actions, or changing sensitive account information, instruct them to contact the physical center or official phone/email lines.`;

              const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: [
                  { role: 'user', parts: [{ text: `${systemInstruction}\n\nUser Question: ${userQuery}` }] }
                ]
              });

              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ reply: response.text }));
            } catch (err: any) {
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ fallback: true, error: err.message }));
            }
          });
          return;
        }
        next();
      });
    }
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), thinkBrightAiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
