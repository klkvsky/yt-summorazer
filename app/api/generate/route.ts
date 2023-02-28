import { NextResponse, NextRequest } from "next/server";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const lang: string | null = searchParams.get("lang");
  const res = await fetch(`https://youtubetranscript.com/?server_vid=${id}`);
  const data = await res.text();

  let fullText = "";
  const textRegex = /<text.*?>(.*?)<\/text>/gm;
  let match;
  while ((match = textRegex.exec(data)) !== null) {
    fullText += match[1] + " ";
  }
  const generatedSum = await generate(fullText, lang as string);

  return NextResponse.json({ generatedSum });
}

async function generate(text: string, lang: string) {
  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(text.slice(0, 4000), lang),
      temperature: 0,
      max_tokens: 500,
    });
    return completion.data.choices[0].text;
  } catch (error: any) {
    if (error.response) {
      return new Response("An error occurred during your request", {
        status: error.response.status,
      });
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      return new Response("An error occurred during your request", {
        status: 500,
      });
    }
  }
}

function generatePrompt(text: string, lang: string) {
  if (lang === "en-US" || lang === "en-EN" || lang === "en") {
    return `I want you to act as an essay writer. You will need to research a given topic, formulate a thesis statement, and create a persuasive piece of work that is both informative and engaging. My first suggestion request is “I need to summoraze transcript of youtube video: ${text} under 2489 characters`;
  } else {
    return `Я хочу, чтобы вы выступили в роли автора эссе. Вам нужно будет исследовать заданную тему, сформулировать тезис и создать убедительную работу, которая будет одновременно информативной и увлекательной. Мой первый запрос на предложение: «Мне нужно обобщить расшифровку видео на YouTube: ${text} до 2489 символов.`;
  }
}
