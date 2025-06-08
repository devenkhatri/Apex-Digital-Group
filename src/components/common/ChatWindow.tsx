
"use client";

import { useState, useRef, useEffect, type FormEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Bot, UserCircle as UserIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatWindow = () => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'initial-bot-message',
      text: "Namaste! How can Apex Digital Group assist you today? Feel free to ask about our services or your project.",
      sender: 'bot',
      timestamp: new Date(),
    }
  ]);
  const messagesContainerRef = useRef<HTMLDivElement>(null); // Renamed for clarity

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      const viewport = messagesContainerRef.current.parentElement; // This should be the ScrollArea Viewport
      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight;
      }
    }
  };
  
  useEffect(() => {
    // A brief timeout can help ensure the DOM has updated before scrolling
    setTimeout(scrollToBottom, 0);
  }, [messages]);

  const handleSendMessage = (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (inputValue.trim() === '') return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputValue('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: `bot-${Date.now()}`,
        text: "Thank you for your message! A representative from our India team will connect with you shortly. In the meantime, how else can I assist?",
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prevMessages => [...prevMessages, botResponse]);
    }, 1200);
  };

  return (
    <div className="flex flex-col h-[calc(70vh-5rem)] max-h-[500px] bg-card">
      <ScrollArea className="flex-grow min-h-0"> {/* Added min-h-0 */}
        <div ref={messagesContainerRef} className="p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                "flex items-end gap-2.5 mb-3",
                msg.sender === 'user' ? "justify-end" : "justify-start"
              )}
            >
              {msg.sender === 'bot' && (
                <Avatar className="h-8 w-8 self-start flex-shrink-0">
                  <AvatarFallback className="bg-primary/10 text-primary">
                    <Bot size={18} />
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn(
                  "max-w-[75%] rounded-xl p-3 text-sm shadow-sm",
                  msg.sender === 'user'
                    ? "bg-primary text-primary-foreground rounded-br-none"
                    : "bg-secondary text-secondary-foreground rounded-bl-none"
                )}
              >
                <p className="whitespace-pre-wrap">{msg.text}</p>
                <p className={cn(
                  "text-xs mt-1.5",
                  msg.sender === 'user' ? "text-primary-foreground/70 text-right" : "text-muted-foreground text-left"
                )}>
                  {msg.timestamp.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })}
                </p>
              </div>
              {msg.sender === 'user' && (
                <Avatar className="h-8 w-8 self-start flex-shrink-0">
                  <AvatarFallback className="bg-accent/10 text-accent">
                    <UserIcon size={18} />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
      <form onSubmit={handleSendMessage} className="border-t p-3 flex items-center gap-2.5 bg-background">
        <Input
          type="text"
          placeholder="Type your message..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-grow h-10"
          aria-label="Chat message input"
          autoComplete="off"
        />
        <Button type="submit" size="icon" className="h-10 w-10 flex-shrink-0" aria-label="Send message" disabled={!inputValue.trim()}>
          <Send className="h-5 w-5" />
        </Button>
      </form>
    </div>
  );
};

export default ChatWindow;
