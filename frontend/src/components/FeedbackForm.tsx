import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

interface FeedbackData {
  studentName: string;
  courseName: string;
  email: string;
  rating: string;
  feedbackMessage: string;
}

interface FeedbackFormProps {
  onSubmit: (data: FeedbackData) => void;
}

export const FeedbackForm = ({ onSubmit }: FeedbackFormProps) => {
  const [formData, setFormData] = useState<FeedbackData>({
    studentName: "",
    courseName: "",
    email: "",
    rating: "",
    feedbackMessage: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.studentName || !formData.courseName || !formData.email || !formData.rating || !formData.feedbackMessage) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields before submitting.",
        variant: "destructive",
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    onSubmit(formData);

    // Clear form
    setFormData({
      studentName: "",
      courseName: "",
      email: "",
      rating: "",
      feedbackMessage: "",
    });

    toast({
      title: "Feedback Submitted!",
      description: "Thank you for your valuable feedback.",
    });
  };

  return (
    <Card className="w-full max-w-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="space-y-1 bg-gradient-to-r from-primary/5 to-primary/10 rounded-t-xl">
        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
          Student Feedback Form
        </CardTitle>
        <CardDescription className="text-base">
          Share your thoughts about the course and help us improve
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="studentName" className="text-sm font-semibold">
              Student Name
            </Label>
            <Input
              id="studentName"
              placeholder="Enter your full name"
              value={formData.studentName}
              onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
              className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="courseName" className="text-sm font-semibold">
              Course Name
            </Label>
            <Input
              id="courseName"
              placeholder="Enter the course name"
              value={formData.courseName}
              onChange={(e) => setFormData({ ...formData, courseName: e.target.value })}
              className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-semibold">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="rating" className="text-sm font-semibold">
              Course Rating
            </Label>
            <Select value={formData.rating} onValueChange={(value) => setFormData({ ...formData, rating: value })}>
              <SelectTrigger id="rating" className="transition-all duration-200 focus:ring-2 focus:ring-primary/20">
                <SelectValue placeholder="Select a rating (1-5)" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                <SelectItem value="1">1 - Poor</SelectItem>
                <SelectItem value="2">2 - Fair</SelectItem>
                <SelectItem value="3">3 - Good</SelectItem>
                <SelectItem value="4">4 - Very Good</SelectItem>
                <SelectItem value="5">5 - Excellent</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="feedbackMessage" className="text-sm font-semibold">
              Feedback Message
            </Label>
            <Textarea
              id="feedbackMessage"
              placeholder="Share your detailed feedback about the course..."
              value={formData.feedbackMessage}
              onChange={(e) => setFormData({ ...formData, feedbackMessage: e.target.value })}
              className="min-h-[120px] transition-all duration-200 focus:ring-2 focus:ring-primary/20 resize-none"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-accent to-accent/90 hover:from-accent/90 hover:to-accent/80 text-accent-foreground font-semibold py-6 text-lg shadow-md hover:shadow-lg transition-all duration-300"
          >
            Submit Feedback
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
