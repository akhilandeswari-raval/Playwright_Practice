// ollama-test.js
const ollama = require ('ollama');

async function main() {
  try {
    console.log('Calling Ollama...');
    const client = ollama.default;
    const response = await client.chat({
      model: 'deepseek-coder:6.7b',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: 'Say hello in one short sentence.' }
      ],
      // stream: false is default; include it explicitly for clarity
      stream: false
    });
    console.log('Raw response:', response);
    console.log('Final message content:', response.message?.content);
  } catch (err) {
    console.error('Error calling Ollama:', err);
  }
}

main();
