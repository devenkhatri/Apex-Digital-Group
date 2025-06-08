
import { config } from 'dotenv';
config();

import '@/ai/flows/suggest-pricing.ts';
import '@/ai/flows/chat-assistant-flow.ts';
import '@/ai/flows/generate-website-image-flow.ts'; // Added new image generation flow
