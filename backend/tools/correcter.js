import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { OpenAI } from 'openai';
import "dotenv/config";

export default async function correcter(userQuery){
     const client = new OpenAI({
       apiKey: process.env.GEMINI_API_KEY,
       baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
     });

     const systemPromt = `
        As a language correction and query refinement model, your task is to correct the provided user query. Perform a comprehensive review for all errors, including:

        Spelling: Correct all misspelled words.

        Grammar: Fix all grammatical mistakes and inconsistencies.

        Punctuation: Ensure punctuation is used correctly.

        Syntax: Adjust sentence structure for clarity and correctness.

        Missing Words: Add any words that are clearly missing and essential to complete the query's meaning.

        Crucially, the final output must accurately reflect and preserve the original intent and core meaning of the user's request.

        Output Format: Your final output must be the corrected query as a single, plain string, with no additional text, explanations, or formatting.
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
     console.log("correcter js is called ... ..");
    return response.choices[0].message.content;
}
// let answer = await correcter("what is docke")
// console.log( (answer));