import { ChromaClient, EmbeddingFunction } from "chromadb";
import { OpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const chromaClient = new ChromaClient({
  host: "localhost",
  port: 8000,
});

class OpenAIEmbedding implements EmbeddingFunction {
  async generate(texts: string[]): Promise<number[][]> {
    const response = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: texts,
    });
    return response.data.map((embedding) => embedding.embedding);
  }
}

// Initialize collection
const init = async () => {
  const embedder = new OpenAIEmbedding();
  const collection = await chromaClient.createCollection({
    name: "my_collection",
    embeddingFunction: embedder,
  });
  return collection;
};

const addMessages = async (id: string, text: string) => {
  const collection = await init();
  await collection.add({
    ids: [id],
    documents: [text],
  });
  console.log(`Added text : ${text}`);
};

// Get similar messages
const getSimilarMessages = async (text: string, limit: number) => {
  const collection= await init();
  const results = await collection.query({
    queryTexts:[text],
    nResults:limit
  })
  console.log(`Similar messages ${results.documents[0]}`);
  return results.documents[0];
};

const run = async() => {
  await addMessages('1' , 'Hello , how can i help you today?')
  await addMessages('2' , 'Sure I can book your appointment')
  await addMessages('3' , 'The weather is sunny and warm.')

  await getSimilarMessages('Can you help me with a booking?',1)
}
run(); 