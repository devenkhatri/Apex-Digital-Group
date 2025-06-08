// File: ./generate-image-script.ts
//
// How to run:
// 1. Ensure you have tsx installed: npm install -D tsx
// 2. Run from your project root: 
//    npx tsx ./generate-image-script.ts "your image prompt here"
//    Example: npx tsx ./generate-image-script.ts "abstract design for a digital marketing service"
//  Execute the script with your desired prompt: npx tsx ./generate-image-script.ts "A professional image for a digital marketing service"
//  Replace "A professional image..." with the actual prompt you want to use (e.g., based on the data-ai-hint attributes).
// The script will output the base64 imageDataUri to the console.
// Copy this URI and paste it into the imageUrl field in src/data/mock.ts.

import { config } from 'dotenv'; // Import dotenv
config(); // Load environment variables from .env file at the very beginning

import { generateWebsiteImage } from './src/ai/flows/generate-website-image-flow'; // Adjust path if script is elsewhere

async function runImageGeneration() {
  const prompt = process.argv[2]; // Get the prompt from the command line argument

  if (!prompt) {
    console.error("Please provide an image prompt as a command-line argument.");
    console.log('Example: npx tsx ./generate-image-script.ts "your prompt"');
    process.exit(1);
  }

  console.log(`⏳ Generating image for prompt: "${prompt}"...`);

  try {
    const result = await generateWebsiteImage({ prompt });
    
    console.log("\n✅ Image generated successfully!");
    if (result.revisedPrompt) {
      console.log("ℹ️ Revised Prompt by AI:", result.revisedPrompt);
    }
    console.log("\n🖼️ ImageDataURI (copy the part starting with 'data:image/...'):\n");
    console.log(result.imageDataUri);
    console.log("\n--- END OF IMAGE DATA URI ---");
    console.log("\n✨ Next step: Copy the imageDataUri and paste it into the imageUrl field in your src/data/mock.ts file.");

  } catch (error) {
    console.error("\n❌ Error generating image:", error);
  }
}

runImageGeneration();
