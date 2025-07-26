import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import dotenv from "dotenv";

dotenv.config();

const model = new ChatOpenAI({
  modelName: "gpt-4o-mini",
  maxTokens: 500,
});

// const main = async () => {
//   // For direct single output.
//   // const response = await model.invoke("What is capital of Italy?")
//   // console.log(response.content);

//   // For output for multiple questions.
//   // const response = await model.batch(["Hello", "What is capital of Italy?"]);
//   // console.log(response);

//   // For stream like output
//   //   const response = await model.stream("What is the capital of Italy?");
//   //   for await (const chunk of response) {
//   //     console.log(chunk.content);
//   //   }
// };
// main();

const run = async () => {
  const systemTemplate = "Translate the following form English into {language}";

  const promptTemplate = ChatPromptTemplate.fromMessages([
    ["system", systemTemplate],
    ["user", "{text"],
  ]);

  const promptValue = await promptTemplate.invoke({
    language: "marathi",
    text: "Hello everyone",
  });
  promptValue.toChatMessages();
  const response = await model.invoke(promptValue);
  console.log(response.content);
};
run();
