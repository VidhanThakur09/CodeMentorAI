import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ThemeToggle from "./ThemeToggle";
import { GraduationCap, FileText, MessageCircle } from "lucide-react";

export default function Header() {
  const location = useLocation();
  
  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <GraduationCap className="w-8 h-8 text-primary" />
          <h1 className="text-2xl font-bold">CodeMentorAI</h1>
        </Link>
        
        <nav className="flex items-center gap-2">
          <Button 
            variant={location.pathname === "/" ? "default" : "ghost"} 
            asChild
          >
            <Link to="/" className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              Chat
            </Link>
          </Button>
          
          <Button 
            variant={location.pathname === "/transcripts" ? "default" : "ghost"} 
            asChild
          >
            <Link to="/transcripts" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Transcripts
            </Link>
          </Button>
          
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}