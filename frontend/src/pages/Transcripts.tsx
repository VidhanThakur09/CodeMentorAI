import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, Upload, Trash2, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import type { Course } from "@/components/ChatBot";
import axios from "axios";

interface Transcript {
  id: string;
  title: string;
  course: Course;
  content: string;
  dateAdded: Date;
}

export default function Transcripts() {
  const { toast } = useToast();
  const backend = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
  const [courses, setCourses] = useState("");
  const [transcripts, setTranscripts] = useState<Transcript[]>([
    {
      id: "1",
      title: "Node.js Basics - Introduction",
      course: "nodejs",
      content:
        "Welcome to Node.js! In this lesson, we'll cover the fundamentals of Node.js runtime environment...",
      dateAdded: new Date("2025-08-15"),
    },
    {
      id: "2",
      title: "Python Fundamentals - Variables",
      course: "python",
      content:
        "Python variables are containers for storing data values. Unlike other programming languages...",
      dateAdded: new Date("2025-08-14"),
    },
  ]);

  const [newTranscript, setNewTranscript] = useState({
    title: "",
    course: "",
    content: "",
  });

  const handleAddTranscript = () => {
    if (!newTranscript.title.trim() || !newTranscript.content.trim()) {
      toast({
        title: "Error",
        description: "Please fill in both title and content fields.",
        variant: "destructive",
      });
      return;
    }

    const transcript: Transcript = {
      id: Date.now().toString(),
      title: newTranscript.title,
      course: courses,
      content: newTranscript.content,
      dateAdded: new Date(),
    };

    setTranscripts((prev) => [transcript, ...prev]);
    setNewTranscript({ title: "", course: courses, content: "" });

    toast({
      title: "Success",
      description: "Transcript added successfully!",
    });
  };

  const handleDeleteTranscript = (id: string) => {
    setTranscripts((prev) => prev.filter((t) => t.id !== id));
    toast({
      title: "Deleted",
      description: "Transcript removed successfully.",
    });
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    const validTypes = ["text/plain", "text/vtt", "application/x-subrip"];
    const validExtensions = [".txt", ".vtt", ".srt", ".ass", ".ssa"];

    if (file) {
      const fileExtension = file.name
        .toLowerCase()
        .slice(file.name.lastIndexOf("."));
      const isValidType =
        validTypes.includes(file.type) ||
        validExtensions.includes(fileExtension);

      if (isValidType) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target?.result as string;
          const cleanFileName = file.name.replace(
            /\.(txt|vtt|srt|ass|ssa)$/i,
            ""
          );
          setNewTranscript((prev) => ({
            ...prev,
            title: cleanFileName,
            content,
          }));
        };
        reader.readAsText(file);

        const formData = new FormData();
        formData.append("file", file); // 👈 your uploaded file
        formData.append("courseName", courses); // 👈 extra JSON field

        await axios.post(`${backend}/upload`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        toast({
          title: "Error",
          description:
            "Please upload a valid subtitle file (VTT, SRT, ASS, SSA) or text file.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="flex-1 bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <FileText className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold">Course Transcripts</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Add New Transcript */}
            <div className="space-y-6">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">
                  Add New Transcript
                </h2>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={newTranscript.title}
                      onChange={(e) =>
                        setNewTranscript((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                      placeholder="Enter transcript title..."
                    />
                  </div>

                  <div>
                    <Label htmlFor="course">Course</Label>
                    <select
                      id="course"
                      value={courses}
                      onChange={(e) => {
                        setCourses(e.target.value); // ✅ update global state
                        setNewTranscript((prev) => ({
                          ...prev,
                          course: e.target.value as Course,
                        }));
                      }}
                      className="w-full px-3 py-2 border border-input rounded-md bg-background"
                    >
                      <option value="nodejs">Node.js Course</option>
                      <option value="python">Python Course</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                      id="content"
                      value={newTranscript.content}
                      onChange={(e) =>
                        setNewTranscript((prev) => ({
                          ...prev,
                          content: e.target.value,
                        }))
                      }
                      placeholder="Paste your transcript content here..."
                      className="min-h-[200px]"
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={handleAddTranscript} className="flex-1">
                      Add Transcript
                    </Button>

                    <div className="relative">
                      <input
                        type="file"
                        accept=".txt,.vtt,.srt,.ass,.ssa"
                        onChange={handleFileUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" multiple
                      />
                      <Button
                        variant="outline"
                        className="flex items-center gap-2"
                      >
                        <Upload className="w-4 h-4" />
                        Upload File
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Existing Transcripts */}
            <div>
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">
                  Your Transcripts ({transcripts.length})
                </h2>

                <ScrollArea className="h-[500px]">
                  <div className="space-y-4">
                    {transcripts.map((transcript) => (
                      <Card key={transcript.id} className="p-4 bg-muted/50">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-medium">{transcript.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {transcript.dateAdded.toLocaleDateString()}
                            </p>
                          </div>

                          <div className="flex items-center gap-2">
                            <Badge
                              variant="outline"
                              className={
                                transcript.course === "nodejs"
                                  ? "border-nodejs text-nodejs"
                                  : "border-python text-python"
                              }
                            >
                              {transcript.course === "nodejs"
                                ? "Node.js"
                                : "Python"}
                            </Badge>

                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() =>
                                handleDeleteTranscript(transcript.id)
                              }
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground line-clamp-3">
                          {transcript.content}
                        </p>

                        <Button
                          variant="ghost"
                          size="sm"
                          className="mt-2 p-0 h-auto"
                        >
                          <Download className="w-3 h-3 mr-1" />
                          View Full Content
                        </Button>
                      </Card>
                    ))}

                    {transcripts.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        <FileText className="w-12 h-12 mx-auto mb-2 opacity-50" />
                        <p>No transcripts added yet.</p>
                        <p className="text-sm">
                          Add your first transcript to get started!
                        </p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
