import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

interface FeedbackData {
  studentName: string;
  courseName: string;
  email: string;
  rating: string;
  feedbackMessage: string;
}

interface LatestFeedbackProps {
  feedback: FeedbackData | null;
}

export const LatestFeedback = ({ feedback }: LatestFeedbackProps) => {
  if (!feedback) {
    return (
      <Card className="w-full max-w-2xl shadow-md border-2 border-dashed border-muted">
        <CardHeader>
          <CardTitle className="text-xl text-muted-foreground">No Feedback Yet</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Submit the form above to see the latest feedback displayed here.
          </p>
        </CardContent>
      </Card>
    );
  }

  const renderStars = (rating: string) => {
    const numRating = parseInt(rating);
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            className={`w-5 h-5 ${
              index < numRating ? "fill-accent text-accent" : "text-muted"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <Card className="w-full max-w-2xl shadow-md hover:shadow-lg transition-shadow duration-300 border-primary/20">
      <CardHeader className="space-y-3 bg-gradient-to-r from-primary/5 to-secondary/20 rounded-t-xl">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold">Latest Feedback</CardTitle>
          <Badge variant="secondary" className="px-3 py-1">
            Most Recent
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-semibold text-muted-foreground mb-1">Student</p>
            <p className="text-lg font-medium">{feedback.studentName}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-muted-foreground mb-1">Course</p>
            <p className="text-lg font-medium">{feedback.courseName}</p>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-muted-foreground mb-1">Email</p>
          <p className="text-base text-primary">{feedback.email}</p>
        </div>

        <div>
          <p className="text-sm font-semibold text-muted-foreground mb-2">Rating</p>
          <div className="flex items-center gap-3">
            {renderStars(feedback.rating)}
            <span className="text-lg font-bold text-foreground">
              {feedback.rating}/5
            </span>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-muted-foreground mb-2">Feedback</p>
          <div className="bg-muted/50 rounded-lg p-4 border border-border">
            <p className="text-base leading-relaxed">{feedback.feedbackMessage}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
