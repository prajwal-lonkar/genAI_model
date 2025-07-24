import { OpenAI } from 'openai';
import dotenv from 'dotenv';

dotenv.config();
const openai = new OpenAI();

async function run() {
    const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
            {
                role: 'user',
                content: "Hello, how are you?"
            }
        ] 
    })
    console.log(response.choices[0].message.content);
}

run();