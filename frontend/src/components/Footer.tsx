import { Github, Twitter, Linkedin, Mail, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  const socialLinks = [
    {
      name: "GitHub",
      icon: Github,
      href: "https://github.com/VidhanThakur09",
      color: "hover:text-foreground"
    },
    {
      name: "Twitter",
      icon: Twitter,
      href: "https://x.com/Vidhannn09",
      color: "hover:text-blue-400"
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "https://www.linkedin.com/in/vidhan-thakur27",
      color: "hover:text-blue-600"
    },
    {
      name: "Email",
      icon: Mail,
      href: "mailto:vidhanthakur2700@gmail.com",
      color: "hover:text-green-500"
    }
  ];

  return (
    <footer className="border-t border-border bg-card mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold">CodeMentor</span>
            <span className="text-muted-foreground">AI</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-2">
            {socialLinks.map((link) => (
              <Button
                key={link.name}
                variant="ghost"
                size="icon"
                asChild
                className={`transition-colors ${link.color}`}
              >
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                >
                  <link.icon className="w-4 h-4" />
                </a>
              </Button>
            ))}
          </div>

          {/* Copyright */}
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <span>Made with</span>
            <Heart className="w-4 h-4 fill-red-500 text-red-500" />
            <span>© 2025 CodeMentorAI</span>
          </div>
        </div>

        {/* Additional Links */}
        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Support
              </a>
            </div>
            
            <p className="text-center">
              Empowering developers with interactive learning experiences
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}