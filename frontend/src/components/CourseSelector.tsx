import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Code, FileCode } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Course } from "./ChatBot";

interface CourseSelectorProps {
  currentCourse: Course;
  onCourseChange: (course: Course) => void;
}

export default function CourseSelector({ currentCourse, onCourseChange }: CourseSelectorProps) {
  return (
    <Card className="p-6 bg-card border-border">
      <h2 className="text-xl font-semibold mb-4 text-center">Choose Your Course</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button
          onClick={() => onCourseChange('nodejs')}
          variant={currentCourse === 'nodejs' ? 'default' : 'outline'}
          className={cn(
            "h-auto p-6 flex flex-col items-center gap-3 transition-all duration-300",
            currentCourse === 'nodejs' 
              ? "bg-nodejs text-nodejs-foreground hover:bg-nodejs/90" 
              : "hover:border-nodejs hover:text-nodejs"
          )}
        >
          <div className="w-12 h-12 rounded-lg bg-nodejs/10 flex items-center justify-center">
            <FileCode className={cn(
              "w-6 h-6",
              currentCourse === 'nodejs' ? "text-nodejs-foreground" : "text-nodejs"
            )} />
          </div>
          <div className="text-center">
            <h3 className="font-semibold mb-1">Node.js Course</h3>
            <p className="text-sm opacity-80">Learn backend development with JavaScript</p>
          </div>
        </Button>

        <Button
          onClick={() => onCourseChange('python')}
          variant={currentCourse === 'python' ? 'default' : 'outline'}
          className={cn(
            "h-auto p-6 flex flex-col items-center gap-3 transition-all duration-300",
            currentCourse === 'python' 
              ? "bg-python text-python-foreground hover:bg-python/90" 
              : "hover:border-python hover:text-python"
          )}
        >
          <div className="w-12 h-12 rounded-lg bg-python/10 flex items-center justify-center">
            <Code className={cn(
              "w-6 h-6",
              currentCourse === 'python' ? "text-python-foreground" : "text-python"
            )} />
          </div>
          <div className="text-center">
            <h3 className="font-semibold mb-1">Python Course</h3>
            <p className="text-sm opacity-80">Master programming with Python</p>
          </div>
        </Button>
      </div>
    </Card>
  );
}