import { useState } from "react";
import ChatBot, { type Course } from "@/components/ChatBot";
import CourseSelector from "@/components/CourseSelector";
import Header from "@/components/Header";

const Index = () => {
  const [currentCourse, setCurrentCourse] = useState<Course>('nodejs');

  return (
    <div className="flex-1 bg-background">
      <Header />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Course Selection */}
          <CourseSelector 
            currentCourse={currentCourse}
            onCourseChange={setCurrentCourse}
          />

          {/* Chat Interface */}
          <ChatBot currentCourse={currentCourse} />
        </div>
      </main>
    </div>
  );
};

export default Index;
