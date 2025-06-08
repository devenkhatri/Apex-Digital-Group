
"use client";
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import ChatWindow from './ChatWindow';
import { useState } from 'react';

const LiveChatButton = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <Dialog open={isChatOpen} onOpenChange={setIsChatOpen}>
      <TooltipProvider>
        <Tooltip>
          <DialogTrigger asChild>
            <TooltipTrigger asChild>
              <Button
                variant="default"
                size="icon"
                className="fixed bottom-6 right-6 rounded-full h-16 w-16 shadow-xl bg-accent hover:bg-accent/90 z-50"
                aria-label="Open live chat"
              >
                <MessageCircle className="h-7 w-7 text-accent-foreground" />
              </Button>
            </TooltipTrigger>
          </DialogTrigger>
          <TooltipContent side="left">
            <p>Chat with us!</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DialogContent className="sm:max-w-[425px] p-0 md:max-w-[500px] lg:max-w-[400px]">
        <DialogHeader className="p-6 pb-2 border-b">
          <DialogTitle className="text-lg font-headline">Chat with Apex Digital Group</DialogTitle>
          <DialogDescription className="text-sm">
            We're here to help! Ask us anything or tell us about your project.
          </DialogDescription>
        </DialogHeader>
        <ChatWindow />
      </DialogContent>
    </Dialog>
  );
};

export default LiveChatButton;
