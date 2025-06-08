
"use client";

import React, { useState, useRef, useEffect, type FormEvent } from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Bot, UserCircle as UserIcon, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { chatWithAssistant, type ChatAssistantInput } from '@/ai/flows/chat-assistant-flow';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const renderMessageWithLinks = (text: string) => {
  const parts = [];
  let lastIndex = 0;
  // Regex to find markdown links like [text](/path) OR simple paths like /page or /page/subpage
  // (?<!\S) ensures the path is preceded by whitespace or start of string.
  // (?![^\s.,?!]) ensures the path is followed by whitespace, punctuation, or end of string.
  const linkRegex = /\[([^\]]+)\]\(([\/\w-]+(?:\/[\w-]+)*)\)|(?<!\S)(\/[\w-]+(?:\/[\w-]+)*)(?![^\s.,?!])/g;

  let match;
  while ((match = linkRegex.exec(text)) !== null) {
    // Text before the link
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }

    if (match[1] && match[2]) { // Markdown link: [text](url)
      const linkText = match[1];
      const linkUrl = match[2];
      parts.push(<Link href={linkUrl} key={`${linkUrl}-${lastIndex}`} className="text-accent hover:underline">{linkText}</Link>);
    } else if (match[3]) { // Simple path: /page
      const linkUrl = match[3];
      // Ensure simple paths start with a slash and are plausible internal links
      if (linkUrl.startsWith('/')) {
         parts.push(<Link href={linkUrl} key={`${linkUrl}-${lastIndex}`} className="text-accent hover:underline">{linkUrl}</Link>);
      } else {
        // If it's not a valid simple path (e.g. doesn't start with /), treat as text
        parts.push(match[0]);
      }
    }
    lastIndex = linkRegex.lastIndex;
  }

  // Remaining text after the last link
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }
  
  // Wrap each part in a React.Fragment with a unique key
  return parts.length > 0 ? parts.map((part, i) => <React.Fragment key={i}>{part}</React.Fragment>) : text;
};


const ChatWindow = () => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'initial-bot-message',
      text: "Namaste! I'm Apex Digital Group's AI Assistant. How can I help you today? Ask me about our services, pricing, or company information.",
      sender: 'bot',
      timestamp: new Date(),
    }
  ]);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [chatError, setChatError] = useState<string | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      const viewport = messagesContainerRef.current.parentElement;
      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight;
      }
    }
  };
  
  useEffect(() => {
    setTimeout(scrollToBottom, 50);
  }, [messages, isBotTyping]);

  const handleSendMessage = async (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (inputValue.trim() === '') return;

    const userMessageText = inputValue;
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: userMessageText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputValue('');
    setIsBotTyping(true);
    setChatError(null);

    const currentChatHistoryForAI = messages
      .slice(-4) 
      .map(msg => ({ sender: msg.sender, text: msg.text }));
    
    currentChatHistoryForAI.push({ sender: 'user', text: userMessageText });

    try {
      const aiInput: ChatAssistantInput = {
        userMessage: userMessageText,
        chatHistory: currentChatHistoryForAI.slice(0, -1), 
      };
      const response = await chatWithAssistant(aiInput);
      
      const botResponse: Message = {
        id: `bot-${Date.now()}`,
        text: response.botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prevMessages => [...prevMessages, botResponse]);

    } catch (error) {
      console.error("Error calling AI chat assistant:", error);
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred.";
      setChatError(`Sorry, I encountered an issue: ${errorMessage}. Please try again.`);
      const errorBotResponse: Message = {
        id: `bot-error-${Date.now()}`,
        text: `I'm having trouble connecting right now. Please try asking again in a moment.`,
        sender: 'bot',
        timestamp: new Date(),
      };
       setMessages(prevMessages => [...prevMessages, errorBotResponse]);
    } finally {
      setIsBotTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(70vh-5rem)] max-h-[500px] bg-card">
      <ScrollArea className="flex-grow min-h-0">
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
                <div className="whitespace-pre-wrap">
                  {msg.sender === 'bot' ? renderMessageWithLinks(msg.text) : msg.text}
                </div>
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
          {isBotTyping && (
             <div className="flex items-end gap-2.5 mb-3 justify-start">
                <Avatar className="h-8 w-8 self-start flex-shrink-0">
                  <AvatarFallback className="bg-primary/10 text-primary">
                    <Bot size={18} />
                  </AvatarFallback>
                </Avatar>
                <div className="max-w-[75%] rounded-xl p-3 text-sm shadow-sm bg-secondary text-secondary-foreground rounded-bl-none">
                    <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                </div>
            </div>
          )}
        </div>
      </ScrollArea>
       {chatError && (
        <div className="p-2 border-t">
          <Alert variant="destructive" className="text-xs">
            <AlertTitle className="text-sm">Chat Error</AlertTitle>
            <AlertDescription>{chatError}</AlertDescription>
          </Alert>
        </div>
      )}
      <form onSubmit={handleSendMessage} className="border-t p-3 flex items-center gap-2.5 bg-background">
        <Input
          type="text"
          placeholder="Ask about our services, pricing..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-grow h-10"
          aria-label="Chat message input"
          autoComplete="off"
          disabled={isBotTyping}
        />
        <Button type="submit" size="icon" className="h-10 w-10 flex-shrink-0" aria-label="Send message" disabled={!inputValue.trim() || isBotTyping}>
          <Send className="h-5 w-5" />
        </Button>
      </form>
    </div>
  );
};

export default ChatWindow;
