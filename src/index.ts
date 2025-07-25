/**
 *  The model generates a image according to the prompt provided.
 */
import { OpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config();
const openai = new OpenAI();

async function generateImageFromText(){
    const response= await openai.images.generate({
        prompt:"A beautiful landscape with maountains and a river",
        n:1,    // Total number of images you want to generate
        size:"1024x1024",
        model:'dall-e-3',
        quality:"standard",
        style:'vivid'
    });

    console.log(response);
}
generateImageFromText();