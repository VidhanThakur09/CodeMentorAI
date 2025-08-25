import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { OpenAI } from 'openai';
import "dotenv/config";

export default async function compare(releventChunks,userQuery){
     const client = new OpenAI({
       apiKey: process.env.GEMINI_API_KEY,
       baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
     });

     const systemPromt = `
        Your task is to act as a relevance checker. You will be provided with a userQuery ${userQuery} and a list of text chunks called relevantChunks ${releventChunks}.

        Instructions:

        Analyze the userQuery to understand its core intent and topic.

        Review each chunk within the relevantChunks list.

        Filter out any chunk that is not directly related to or does not contain information pertinent to the userQuery. A chunk is considered related if it directly addresses, answers, or provides context for the query.

        Create a JSON array containing only the strings of the related chunks.

        Output Format:

        The output must be a single, unformatted JSON array. Do not include any text, explanations, or conversational filler before or after the JSON.
    `;
     let response = await client.chat.completions.create({
       model: "gemini-2.5-flash",
       response_format: { type: "json_object" },
       messages: [
         {
           role: "system",
           content: systemPromt,
         },
         {
           role: "user",
           content: userQuery,
         },
       ],
     });

    return response.choices[0].message.content;
}
// let answer = await correcter("what is docke")
// console.log( (answer));