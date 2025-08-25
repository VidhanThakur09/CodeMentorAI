import { SRTLoader } from "@langchain/community/document_loaders/fs/srt";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import "dotenv/config";
import { QdrantVectorStore } from "@langchain/qdrant";

export default async function loadFiles(filePath='',courseName) {
  const subtitleFile = filePath;
  const loader = new SRTLoader(subtitleFile);
  const docs = await loader.load();

  const embeddings = new GoogleGenerativeAIEmbeddings({
    apiKey: process.env.GEMINI_API_KEY,
    model: "text-embedding-004", // 768 dimensions
    // taskType: TaskType.RETRIEVAL_DOCUMENT,
    // title: "Document title",
  });

  // const qdrantConfig = {
  //     url: process.env.QDRANT_URL,
  //     collectionName: courseName,
  //     apiKey: process.env.QDRANT_API_KEY,
  // };

  // const Deleteembeddings =  new GoogleGenerativeAIEmbeddings({
  //   apiKey: process.env.GEMINI_API_KEY,
  //   model: "text-embedding-004", // 768 dimensions
  //   // taskType: TaskType.RETRIEVAL_DOCUMENT,
  //   // title: "Document title",
  // });

  // const delVectorStore = new QdrantVectorStore(Deleteembeddings, qdrantConfig);
  // const qdrantClient = delVectorStore.client;

  // try {
  //   await qdrantClient.deleteCollection(qdrantConfig.collectionName);
  //   console.log(
  //     `Collection '${qdrantConfig.collectionName}' deleted successfully.`
  //   );
  // } catch (error) {
  //   console.error("Error deleting collection:", error);
  // }

  const vectorStore = await QdrantVectorStore.fromDocuments(docs, embeddings, {
    url: process.env.QDRANT_URL,
    collectionName: courseName,
    apiKey: process.env.QDRANT_API_KEY,
  });
  console.log("indexing of data Done ......");
}

// loadPDF('../01-node-introduction.vtt',"nodejs");
