
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

  context += "## AI Pricing Estimator:\n";
  context += "Apex Digital Group has an AI-Powered Pricing Estimator tool. Users can select a service and describe requirements to get an instant price estimate in Indian Rupees (₹). This is an estimate; final pricing may vary. Access it at /ai-pricing.\n\n";

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

export async function chatWithAssistant(input: ChatAssistantInput): Promise<ChatAssistantOutput> {
  return chatAssistantFlow(input);
}

const staticWebsiteContext = getWebsiteContext();

const prompt = ai.definePrompt({
  name: 'chatAssistantPrompt',
  input: {schema: ChatAssistantInputSchema},
  output: {schema: ChatAssistantOutputSchema},
  prompt: `You are a friendly, helpful, and concise AI assistant for Apex Digital Group, a digital agency in India.
Your primary task is to answer user questions based *only* on the Apex Digital Group Information provided below.
If the information is not available in the context, politely state that you don't have that specific detail and suggest contacting the company or visiting a relevant page if applicable.
When discussing pricing, always use Indian Rupees (₹).
Refer users to specific pages like /services, /contact, /ai-pricing, /blog, /portfolio when relevant.

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
    // Inject the static website context along with dynamic inputs from the user
    const {output} = await prompt({ ...input, websiteContext: staticWebsiteContext }); 
    if (!output) {
      return { botResponse: "I'm sorry, I couldn't generate a response right now. Please try asking something else or try again later." };
    }
    return output;
  }
);
