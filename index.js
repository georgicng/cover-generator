import { model, embeddings } from "./lib/ollama.js";
import { prompt, createVectorStore } from "./lib/rag.js";
import { getRow, updateRow } from "./lib/coda.js";
import { Document } from "@langchain/core/documents";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";

import * as dotenv from "dotenv";
dotenv.config();

const loader = new PDFLoader(process.env.CV_PATH);
const docs = await loader.load();
const row = await getRow();
docs.push(new Document({ pageContent: row.values["Description"] }));
const vectorStore = await createVectorStore(docs, embeddings);
const query =
  "Write a cover letter for given CV and Job posting in a conversational style and fill out the writers name in the end using cv";
/* const test = await vectorStore.similaritySearch(query, 3);
console.log(test); */
const response = await prompt(query, model, vectorStore);
console.log(response);
// await row.update({ Description: response });
