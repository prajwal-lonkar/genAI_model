/**
 *  Basically a model cannot provide real time information as its trained on data
 *  of the past . For such scenarios 'tools' are created, to provide real time data.
 */
import { OpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config();
const openai = new OpenAI();

// Creating our own tool to get current time of New York
async function getTimeInNewYork() {
  return new Date().toLocaleString("en-Us", {
    timeZone: "America/New_York",
  });
}
async function callOpenAITool() {
  const context: OpenAI.ChatCompletionMessageParam[] = [
    {
      role: "system",
      content: "You are helpful assistant.",
    },
    {
      role: "user",
      content: "What is current time in New York?",
    },
  ];
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: context,
    tools: [
      {
        type: "function",
        function: {
          name: "getTimeInNewYork",
          description: "Get current time in New York.",
        },
      },
    ],
    tool_choice:'auto'   // tool decision
  });

  // step-2 decide tool to use/call
  const willInvokeTheTool = response.choices[0].finish_reason === 'tool_calls';
  const toolCall = response.choices[0].message.tool_calls?.[0];

  if(willInvokeTheTool){
    const toolName= toolCall?.function.name;
    if(toolName === 'getTimeInNewYork'){
        const time = await getTimeInNewYork();

        context.push(response.choices[0].message);
        context.push({
            role:'tool',
            content:time,
            tool_call_id:toolCall?.id ?? '',
        })
    }
  }

const secondResponse = await openai.chat.completions.create({
    model:"gpt-4o-mini",
    messages: context
})

  console.log(secondResponse.choices[0].message.content);
}

callOpenAITool();
