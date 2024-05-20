import { Ollama } from "@langchain/community/llms/ollama";
import { OllamaEmbeddings } from "@langchain/community/embeddings/ollama";

const baseUrl = "http://localhost:11434"
// Instantiate Model
const model = new Ollama({
  baseUrl, // Default value
  model: "llama3", // Default value
});

// Instantiate Embeddings function
const embeddings = new OllamaEmbeddings({
  baseUrl, // Default value
  model: "mxbai-embed-large", // Default value
});

export { model, embeddings };
