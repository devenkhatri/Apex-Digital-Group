
'use server';
/**
 * @fileOverview An AI image generation flow for website assets.
 *
 * - generateWebsiteImage - A function that generates an image based on a text prompt.
 * - GenerateWebsiteImageInput - The input type for the generateWebsiteImage function.
 * - GenerateWebsiteImageOutput - The return type for the generateWebsiteImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateWebsiteImageInputSchema = z.object({
  prompt: z.string().describe('A text prompt describing the image to be generated (e.g., "digital strategy concept").'),
});
export type GenerateWebsiteImageInput = z.infer<typeof GenerateWebsiteImageInputSchema>;

const GenerateWebsiteImageOutputSchema = z.object({
  imageDataUri: z.string().describe("The generated image as a data URI (e.g., 'data:image/png;base64,...')."),
  revisedPrompt: z.string().optional().describe("The revised prompt used by the model, if applicable."),
});
export type GenerateWebsiteImageOutput = z.infer<typeof GenerateWebsiteImageOutputSchema>;

export async function generateWebsiteImage(input: GenerateWebsiteImageInput): Promise<GenerateWebsiteImageOutput> {
  return generateWebsiteImageFlow(input);
}

const generateWebsiteImageFlow = ai.defineFlow(
  {
    name: 'generateWebsiteImageFlow',
    inputSchema: GenerateWebsiteImageInputSchema,
    outputSchema: GenerateWebsiteImageOutputSchema,
  },
  async (input) => {
    const { media, revisedPrompt } = await ai.generate({
      model: 'googleai/gemini-2.0-flash-exp', // IMPORTANT: Use this model for image generation
      prompt: input.prompt,
      config: {
        responseModalities: ['TEXT', 'IMAGE'], // Must include both TEXT and IMAGE
        safetySettings: [ // Example safety settings, adjust as needed
          { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_ONLY_HIGH' },
          { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        ],
      },
    });

    if (!media || !media.url) {
      throw new Error('Image generation failed or returned no media URL.');
    }

    return {
      imageDataUri: media.url, // This will be the base64 data URI
      revisedPrompt: revisedPrompt || undefined,
    };
  }
);
