
'use server';
/**
 * @fileOverview An AI chat assistant for Apex Digital Group.
 *
 * - chatWithAssistant - A function that handles the chat interaction.
 * - ChatAssistantInput - The input type for the chatWithAssistant function.
 * - ChatAssistantOutput - The return type for the chatWithAssistant function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { services, testimonials, teamMembers, blogPosts, portfolioProjects } from '@/data/mock';
import { suggestPricing } from './suggest-pricing'; // Keep this to call the function
import { 
  SuggestPricingInputSchema, // Import schema for tool definition
  type SuggestPricingInput,    // Import type for type safety
  SuggestPricingOutputSchema  // Import schema for tool definition
} from '@/ai/schemas/pricing-schemas'; // Import from the new central schema file

const ChatMessageSchema = z.object({
  sender: z.enum(['user', 'bot']),
  text: z.string(),
});

const ChatAssistantInputSchema = z.object({
  userMessage: z.string().describe('The latest message from the user.'),
  chatHistory: z.array(ChatMessageSchema).optional().describe('The recent history of the conversation (sender and text).'),
});
export type ChatAssistantInput = z.infer<typeof ChatAssistantInputSchema>;

const ChatAssistantOutputSchema = z.object({
  botResponse: z.string().describe('The AI assistant\'s response to the user.'),
});
export type ChatAssistantOutput = z.infer<typeof ChatAssistantOutputSchema>;

function getWebsiteContext(): string {
  let context = "Apex Digital Group Information Overview:\n\n";

  context += "## About Apex Digital Group:\n";
  context += "- Mission: To empower businesses with transformative digital solutions that drive growth, efficiency, and lasting success.\n";
  context += "- Approach: Data-driven strategies, creative thinking, technical expertise for tailored solutions.\n";
  context += "- Core Values: Innovation, Integrity, Collaboration, Client-Centricity, Excellence.\n";
  context += "Learn more at /about.\n\n";

  context += "## Services Offered:\n";
  services.forEach(service => {
    context += `- ${service.title}: ${service.briefDescription}\n`;
    if (service.subServices && service.subServices.length > 0) {
      context += "  Key sub-services: " + service.subServices.map(sub => sub.name).join(', ') + ".\n";
    }
  });
  context += "Detailed service info is available at /services and individual service pages like /services/digital-marketing.\n\n";

  context += "## AI Pricing Estimator Tool (Separate Page):\n";
  context += "Apex Digital Group has an AI-Powered Pricing Estimator tool available on the website at /ai-pricing. Users can select a service and describe requirements to get an instant price estimate. This tool is separate from this chat.\n\n";

  context += "## Portfolio Highlights:\n";
  context += `We have a portfolio of successful projects. Examples: "${portfolioProjects[0]?.title || 'E-commerce Boost'}" and "${portfolioProjects[1]?.title || 'AI Customer Support'}". Explore all projects at /portfolio.\n\n`;

  context += "## Blog Insights:\n";
  context += `Our blog features articles like "${blogPosts[0]?.title || 'Future of SEO'}" and "${blogPosts[1]?.title || 'AI for MSMEs'}". Visit /blog for more.\n\n`;
  
  context += "## Expert Team:\n";
  context += `Our team includes experts like ${teamMembers.slice(0,2).map(member => `${member.name} (${member.role})`).join(', ')}. More details on the /about page.\n\n`;

  context += "## Contact Information (India):\n";
  context += "- Address: 456 Tech Park Road, Cyberabad, Hyderabad 500081, India\n";
  context += "- Email: info@apexdigital.co.in\n";
  context += "- Phone: +91 98765 43210\n";
  context += "- Business Hours (IST): Monday - Friday: 9:30 AM - 6:30 PM. Closed on weekends.\n";
  context += "For inquiries, please visit /contact.\n\n";
  
  context += "## Client Testimonials (Summary):\n";
  testimonials.slice(0,1).forEach(t => { // Keep context concise
    context += `- ${t.clientName} from ${t.clientCompany} said: "${t.quote.substring(0,70)}..."\n`;
  });
  context += "\n";

  return context;
}

const getPricingEstimateTool = ai.defineTool(
  {
    name: 'getPricingEstimateTool',
    description: 'Use this tool to get an estimated price range for a specific Apex Digital Group service ONLY when the user provides BOTH the service type AND a description of their requirements. If either is missing, ask the user to provide them first. Always present the price in Indian Rupees (₹).',
    inputSchema: SuggestPricingInputSchema,
    outputSchema: SuggestPricingOutputSchema,
  },
  async (input: SuggestPricingInput) => { // Ensure input is correctly typed here
    // This calls the existing suggestPricing flow
    return await suggestPricing(input);
  }
);


export async function chatWithAssistant(input: ChatAssistantInput): Promise<ChatAssistantOutput> {
  return chatAssistantFlow(input);
}

const staticWebsiteContext = getWebsiteContext();

const prompt = ai.definePrompt({
  name: 'chatAssistantPrompt',
  input: {schema: ChatAssistantInputSchema},
  output: {schema: ChatAssistantOutputSchema},
  tools: [getPricingEstimateTool],
  prompt: `You are a friendly, helpful, and concise AI assistant for Apex Digital Group, a digital agency in India.
Your primary task is to answer user questions based *only* on the Apex Digital Group Information provided below.
If the information is not available in the context, politely state that you don't have that specific detail and suggest contacting the company or visiting a relevant page if applicable.
When discussing pricing, always use Indian Rupees (₹).
When referring to a page, try to use the markdown format [Page Name](/actual-path). For example, "You can learn more on our [Services page](/services)." or "Visit our [Contact Us page](/contact) for more." If you just mention a path like "/about", ensure it's clearly identifiable as a path (e.g., preceded by a space and not part of another word). Always provide the full path starting with a forward slash.

Specific instructions for pricing queries:
- If the user asks for a price estimate or quote, and provides BOTH a specific service type (e.g., "Digital Marketing", "Web Development") AND a description of their requirements, use the 'getPricingEstimateTool' to provide an estimated price range. Inform the user you are generating an estimate.
- If the user asks about pricing but does NOT provide both the service type and requirements, ask them to provide these details. For example, say "To give you a price estimate, I'need to know which service you're interested in and a brief description of your requirements."
- If the user asks generally about pricing without specific service/requirements, or if they seem unsure, you can also mention that "We have an AI-Powered Pricing Estimator on our [AI Pricing page](/ai-pricing) where you can get a quick estimate for various services."
- When the 'getPricingEstimateTool' provides an 'estimatedPriceRange' (which will be a string like "₹XX,XXX - ₹YY,YYY"), you MUST use this exact string in your response. For example, if the tool provides "₹25,000 - ₹35,000" as the 'estimatedPriceRange', your response should be similar to: "The estimated price range for [the service discussed] with your requirements is ₹25,000 - ₹35,000. Remember, this is an estimate." Do NOT output the literal text "[price range from tool]".

--- BEGIN APEX DIGITAL GROUP INFORMATION ---
{{{websiteContext}}}
--- END APEX DIGITAL GROUP INFORMATION ---

Conversation History (User and Assistant messages):
{{#if chatHistory}}
  {{#each chatHistory}}
    {{sender}}: {{text}}
  {{/each}}
{{else}}
No previous messages in this conversation. This is the first message from the user.
{{/if}}

User's latest message: {{{userMessage}}}

Based on all the above, provide your Assistant's response:
`,
  config: {
      safetySettings: [
        { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
      ],
  }
});

const chatAssistantFlow = ai.defineFlow(
  {
    name: 'chatAssistantFlow',
    inputSchema: ChatAssistantInputSchema,
    outputSchema: ChatAssistantOutputSchema,
  },
  async (input) => {
    const {output} = await prompt({ ...input, websiteContext: staticWebsiteContext }); 
    if (!output) {
      return { botResponse: "I'm sorry, I couldn't generate a response right now. Please try asking something else or try again later." };
    }
    return output;
  }
);

