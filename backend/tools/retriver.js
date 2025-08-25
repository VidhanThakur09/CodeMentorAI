import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { QdrantVectorStore } from "@langchain/qdrant";
import { OpenAI } from "openai";
import correcter from "./correcter.js";
import compare from "./compare.js";
import generateSimilarQuery from "./generateSimilarQuery.js";
import compare2 from "./compare2.js";
import {systemPromptHC} from "../persona/systemPrompt.js"
import "dotenv/config";

const client = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

export default async function chat(userQuery,courseName,history) {
  // Correction  Of UserQuery ( You have to correct given user quary and check for all the grammitical errors and missing words and correct them.)
  userQuery = await correcter(userQuery);

  // generate more similar variation of user Query

  const similarQueries = await generateSimilarQuery(userQuery);

  const embeddings = new GoogleGenerativeAIEmbeddings({
    apiKey: process.env.GEMINI_API_KEY,
    model: "text-embedding-004", // 768 dimensions
    // taskType: TaskType.RETRIEVAL_DOCUMENT,
    // title: "Document title",
  });

  const vectorStore = await QdrantVectorStore.fromExistingCollection(
    embeddings,
    {
      url: process.env.QDRANT_URL,
      collectionName: courseName,
      apiKey: process.env.QDRANT_API_KEY,
    }
  );

  const vectorSearcher = vectorStore.asRetriever({
    k: 5,
  });

  let data = [];
  for (let query of JSON.parse(similarQueries)) {
    const documents = await vectorSearcher.invoke(query);
    data.push(...documents);
  }
  // Page Contents
  const pageContents = data.map(doc => doc.pageContent);
  // console.log(pageContents);

  // Compare the page contents with the user query and find most freq data using hashmap
  let mostFreqData = compare2(pageContents, 2);
  // console.log("mostFreqData:", mostFreqData);

  // check if the user query is relevant to the retrieved chunks
  // const isRelevant = await compare(releventChunks, userQuery);

  // console.log(isRelevant);

  const systemPromt = `
      you are a Person with Persona as ${systemPromptHC} who helps resolving user query base on the context available to you from a VTT file with the content and with Time Stamps.

      only ans base on the available context from the file only.

      context:${JSON.stringify(mostFreqData)}

      output formate:
       - Always give the output in string formate and no object only string formate with Time Stamps .
       - when providing the Code output always add the code block in next line and when exiting the code block make a space and formate it like in code editor.
      - should follow the examples and give output base on the examples.
      - don't use \n for next line just give answer in para form.
      - if you got any code block as

      examples:
        - "What will I learn in this Node.js course?",
        - "In this course, you'll learn what Node.js is and how you can build web servers and other cool things with it. The course is for beginners to intermediate learners and the only prerequisite is knowing the basics of JavaScript. You will learn from the absolute basics, covering what Node.js is and how it works internally, all the way to integrating Postgres, building RESTful APIs, and handling authentication, JWT sessions, and cookies. (00:00:09.040 --> 00:01:27.070)"

        - "What are the prerequisites for this course?",
        - "The only prerequisite for this course is a basic understanding of JavaScript. You should know the basics of JavaScript because you'll be coding a lot of things in JavaScript. (00:00:51.790 --> 00:01:03.850)"
        
        -"What is Node.js?",
        -"Node.js is not a framework or a library. Instead, it's a JavaScript runtime environment. It's a C program with a V8 engine that provides an environment to run JavaScript outside the browser. The Node.js project is free and open-source, and it allows developers to create servers, web applications, command-line tools, and scripts. (00:10:46.150 --> 00:11:00.230)"

        -"What is a JavaScript engine?",
        -"A JavaScript engine is a component that is automatically shipped with every browser you download and it is what allows your browser to compile and execute JavaScript code. Without a JavaScript engine, there is no way to run JavaScript code. Different browsers use different engines; for example, Chrome uses the V8 engine, Firefox uses SpiderMonkey, and Safari uses the Apple WebKit engine. (00:08:44.270 --> 00:09:21.050)"

        -"How was Node.js created?",
        -"Node.js was created by a scientist named Ryan Dahl who took the open-source V8 engine from Chrome and embedded it into a C program. Because C can run outside of a browser and can talk to the machine's hardware and operating system, this project made it possible to execute JavaScript outside of a browser for the first time. This project was named Node.js. (00:09:37.490 --> 00:10:04.970)"

  `
  let response = await client.chat.completions.create({
    model: "gemini-2.5-flash",
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: systemPromt,
      },
      ...history.map((entry) => ({
        role: entry.role,
        content: entry.content,
      })),
      {
        role: "user",
        content: userQuery,
      },
    ],
  });
  return response.choices[0].message.content;
}
// let ans =await chat("what is nod j?");
// console.log(ans);
