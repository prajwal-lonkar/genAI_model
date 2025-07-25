/**
 *  The model generates speech sound to the text we provide.
 */
import { OpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config();
const openai = new OpenAI();

async function textToSpeech() {
  const sampleText = "Pune shikshanacha maherghar aahe.";
  const response = await openai.audio.speech.create({
    input: sampleText,
    model: "tts-1",
    response_format: "mp3",
    voice: "alloy",
  });
  console.log(response);
}
textToSpeech();