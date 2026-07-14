// src/debug/ollama-test.ts
import { callLLM } from '../llm/llmClient';

(async () => {
    console.log('Testing callLLM function...');
  const answer = await callLLM('Say hello from DeepSeek for a Playwright project.');
  console.log('Final answer:', answer);
})();
