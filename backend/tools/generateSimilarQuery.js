import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { OpenAI } from 'openai';
import "dotenv/config";

export default async function generateSimilarQuery(userQuery){
     const client = new OpenAI({
       apiKey: process.env.GEMINI_API_KEY,
       baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
     });

     const systemPromt = `
        Your task is to act as a query generator. You will be provided with a userQuery and you must generate a list of multiple other queries that are similar in topic and intent.

        Instructions:

        Analyze the userQuery to identify its core topic, keywords, and intent.

        Generate a minimum of 5 and a maximum of 10 new queries that are closely related to the original query.

        Each generated query must be semantically distinct from the others and from the original userQuery while staying on the same topic. For example, vary the phrasing, keywords, or question format.

        Ensure all generated queries are unique and do not contain any duplicates.

        Output Format:

        The final output must be a single, unformatted JSON array containing only the strings of the generated queries. Do not include any text, explanations, or conversational filler before or after the JSON.

        json example data
        [
            "similar query 1",
            "similar query 2",
            "similar query 3",
            "similar query 4",
            "similar query 5"
        ]
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
     console.log("generateSimilarQuery js is called ... ..");
    return response.choices[0].message.content;
}
// console.log(await generateSimilarQuery("what is node js?"))
// let answer = await correcter("what is docke")
// console.log( (answer));