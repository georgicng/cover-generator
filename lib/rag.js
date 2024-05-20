import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
//import { FaissStore } from "@langchain/community/vectorstores/faiss";
import { StringOutputParser } from "@langchain/core/output_parsers";

const createVectorStore = async (docs, embeddings) => {
  // Text Splitter
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });
  const splitDocs = await splitter.splitDocuments(docs);

  // Create Vector Store
  return await MemoryVectorStore.fromDocuments(splitDocs, embeddings);
};

const prompt = async (query, llm, vectorstore) => {
  // Create a retriever from vector store
  const retriever = vectorstore.asRetriever();
  const prompt = ChatPromptTemplate.fromTemplate(`
    You are an assistant for generating cover letters. Use the following pieces of retrieved context to express how much i am a fit for the job. Be as detailed as possible.
    Question: {question}
    Context: {context}
    Answer:
  `);

  const ragChain = await createStuffDocumentsChain({
    llm,
    prompt,
    outputParser: new StringOutputParser(),
  });

  const retrievedDocs = await retriever.getRelevantDocuments(query);

  return await ragChain.invoke({
    question: query,
    context: retrievedDocs,
  });
};

export { prompt, createVectorStore };
