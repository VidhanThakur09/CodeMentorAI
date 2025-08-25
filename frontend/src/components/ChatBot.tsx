import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import axios from "axios";

export type Course = 'nodejs' | 'python' | 'other';

interface Message {
  id: string;
  content: string;
  type: 'user' | 'bot';
  timestamp: Date;
}

interface ChatBotProps {
  currentCourse: Course;
}

const courseKnowledge = {
  nodejs: {
    greeting: "Hi! I'm your Node.js course assistant. Ask me anything about Node.js development!",
    responses: {
      default: "Great question about Node.js! Node.js is a runtime environment that allows you to run JavaScript on the server side. It's built on Chrome's V8 engine and is perfect for building scalable web applications.",
      "what is node": "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. It allows you to run JavaScript on the server side, making it possible to build full-stack applications using just JavaScript.",
      "express": "Express.js is a minimal and flexible Node.js web application framework. It provides a robust set of features for web and mobile applications, making it easier to build APIs and web servers.",
      "npm": "NPM (Node Package Manager) is the default package manager for Node.js. It helps you install, share, and manage dependencies in your Node.js projects.",
    }
  },
  python: {
    greeting: "Hello! I'm your Python course assistant. Feel free to ask me about Python programming!",
    responses: {
      default: "Excellent Python question! Python is a high-level, interpreted programming language known for its simplicity and readability. It's great for web development, data science, AI, and much more.",
      "what is python": "Python is a high-level, interpreted programming language created by Guido van Rossum. It emphasizes code readability and simplicity, making it perfect for beginners and experts alike.",
      "django": "Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design. It follows the 'Don't Repeat Yourself' principle and handles much of the complexities of web development.",
      "pip": "Pip is the package installer for Python. It allows you to install and manage Python packages from the Python Package Index (PyPI) and other repositories.",
    }
  }
};

export default function ChatBot({ currentCourse }: ChatBotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: courseKnowledge[currentCourse].greeting,
      type: 'bot',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Message[]>([]);

  useEffect(() => {
    setMessages([
      {
        id: Date.now().toString(),
        content: courseKnowledge[currentCourse].greeting,
        type: "bot",
        timestamp: new Date(),
      },
    ]);
    setHistory([]);
  }, [currentCourse]);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      type: 'user',
      timestamp: new Date()
    };
    const userResponse:any={
        role: "user",
        content: input,
    }
    setHistory(prev => [...prev, userResponse]);

    setMessages(prev => [...prev, userMessage]);
    setInput('');


    // api calling /Chat
    async function callingAPI() {
      const backendPort =
        typeof import.meta.env.VITE_BACKEND_PORT !== "undefined" &&
        import.meta.env.VITE_BACKEND_PORT
          ? import.meta.env.VITE_BACKEND_PORT
          : "http://localhost:3000";
      let response = await axios.post(`${backendPort}/chat`, {
        userQuery: input,
        courseName: currentCourse,
        history: history,
      });
      return response;
    }

    // Simulate bot response
    setTimeout(async () => {
      
      let response = await callingAPI();
      let botContent = "";
     if (typeof response.data === "object" && response.data.answer) {
        botContent = response.data.answer;
        console.log("Response from backend:", botContent);
      }else{
        botContent = response.data;
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botContent,
        type: 'bot',
        timestamp: new Date()
      };
      const botResponse:any={
        role: "assistant",
        content: (response.data),
      }

      setMessages(prev => [...prev, botMessage]);
      setHistory(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <Card className="flex flex-col h-[600px] bg-chat-background border-border">
      {/* Chat Header */}
      <div className={cn(
        "p-4 border-b border-border rounded-t-lg",
        currentCourse === 'nodejs' ? "bg-nodejs text-nodejs-foreground" : "bg-python text-python-foreground"
      )}>
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5" />
          <h3 className="font-semibold">
            {currentCourse === 'nodejs' ? 'Node.js Course Assistant' : 'Python Course Assistant'}
          </h3>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex gap-3 max-w-[80%]",
                message.type === 'user' ? "ml-auto" : "mr-auto"
              )}
            >
              {message.type === 'bot' && (
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                  currentCourse === 'nodejs' ? "bg-nodejs" : "bg-python"
                )}>
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}
              
              <div
                className={cn(
                  "rounded-lg p-3",
                  message.type === 'user' 
                    ? "bg-chat-user text-white ml-auto dark:text-black  " 
                    : "bg-chat-bot border border-chat-border"
                )}
              >
                <p className="text-sm">{message.content}</p>
                <span className="text-xs opacity-70 mt-1 block">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>

              {message.type === 'user' && (
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-primary-foreground" />
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t border-border">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={`Ask me about ${currentCourse === 'nodejs' ? 'Node.js' : 'Python'}...`}
            className="flex-1"
          />
          <Button 
            onClick={handleSendMessage} 
            size="icon"
            className={cn(
              currentCourse === 'nodejs' ? "bg-nodejs hover:bg-nodejs/90" : "bg-python hover:bg-python/90"
            )}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}

function callingAPI() {
  throw new Error("Function not implemented.");
}