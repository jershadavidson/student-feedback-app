import { useState } from "react";
import { FeedbackForm } from "@/components/FeedbackForm";
import { LatestFeedback } from "@/components/LatestFeedback";
import { supabase } from "@/lib/supabaseClient";

interface FeedbackData {
  studentName: string;
  courseName: string;
  email: string;
  rating: string;
  feedbackMessage: string;
}

const Index = () => {
  const [latestFeedback, setLatestFeedback] = useState<FeedbackData | null>(null);

  const handleSubmit = async (data: FeedbackData) => {
    const { data: insertedData, error } = await supabase
      .from("feedback")
      .insert({
        student_name: data.studentName,
        course_name: data.courseName,
        email: data.email,
        rating: Number(data.rating),
        feedback_message: data.feedbackMessage,
      })
      .select()
      .single();

    if (error) {
      console.error("Error inserting feedback:", error);
    } else {
      setLatestFeedback({
        studentName: insertedData.student_name,
        courseName: insertedData.course_name,
        email: insertedData.email,
        rating: insertedData.rating,
        feedbackMessage: insertedData.feedback_message,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-3 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-primary/80 to-accent bg-clip-text text-transparent">
            Course Feedback System
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Help us improve by sharing your experience
          </p>
        </div>

        <div className="flex flex-col items-center gap-8">
          <FeedbackForm onSubmit={handleSubmit} />
          <LatestFeedback feedback={latestFeedback} />
        </div>
      </div>
    </div>
  );
};

export default Index;

