import { NextResponse, NextRequest } from "next/server";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  console.log("started");

  const res = await fetch(`https://youtubetranscript.com/?server_vid=${id}`);
  const data = await res.text();

  let fullText = "";
  const textRegex = /<text.*?>(.*?)<\/text>/gm;
  let match;
  while ((match = textRegex.exec(data)) !== null) {
    fullText += match[1] + " ";
  }
  const generatedSum = await generate(fullText);

  console.log(generatedSum);

  return NextResponse.json({ generatedSum });
}

async function generate(text: string) {
  console.log("started 2");
  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(text.slice(0, 4000)),
      temperature: 0,
      max_tokens: 500,
    });
    return completion.data.choices[0].text;
  } catch (error) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
      // res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      // res.status(500).json({
      //   error: {
      //     message: "An error occurred during your request.",
      //   },
      // });
    }
  }
}

function generatePrompt(text: string) {
  console.log("started 3");
  // return `return string with summarization of next transcription: ${text} in 5 paragraphs`;
  return `I want you to act as an essay writer. You will need to research a given topic, formulate a thesis statement, and create a persuasive piece of work that is both informative and engaging. My first suggestion request is “I need to summoraze transcript of youtube video: ${text} under 2489 characters`;
}
