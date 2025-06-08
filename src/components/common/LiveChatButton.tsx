"use client";
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const LiveChatButton = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="default"
            size="icon"
            className="fixed bottom-6 right-6 rounded-full h-16 w-16 shadow-xl bg-accent hover:bg-accent/90 z-50"
            aria-label="Open live chat"
            onClick={() => alert('Live Chat functionality would open here.')}
          >
            <MessageCircle className="h-7 w-7 text-accent-foreground" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>Chat with us!</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default LiveChatButton;
