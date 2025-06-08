
/**
 * @fileOverview Zod schemas and TypeScript types for pricing suggestions.
 *
 * Exports:
 * - SuggestPricingInputSchema - Zod schema for pricing input.
 * - SuggestPricingInput - TypeScript type for pricing input.
 * - SuggestPricingOutputSchema - Zod schema for pricing output.
 * - SuggestPricingOutput - TypeScript type for pricing output.
 */

import {z} from 'genkit';

export const SuggestPricingInputSchema = z.object({
  serviceType: z
    .string()
    .describe(
      'The type of service for which the pricing is being requested (e.g., Digital Marketing, AI & Automation, Web Development, IT Implementation).'
    ),
  requirements: z
    .string()
    .describe(
      'A detailed description of the client\'s specific requirements for the selected service.'
    ),
});
export type SuggestPricingInput = z.infer<typeof SuggestPricingInputSchema>;

export const SuggestPricingOutputSchema = z.object({
  estimatedPriceRange: z
    .string()
    .describe(
      'An estimated price range for the requested service in Indian Rupees (INR), based on the provided requirements. Please include ONLY the INR currency symbol (₹), for example: "₹50,000 - ₹75,000".'
    ),
});
export type SuggestPricingOutput = z.infer<typeof SuggestPricingOutputSchema>;
