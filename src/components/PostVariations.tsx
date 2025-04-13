import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";

interface PostVariationsProps {
  postId: string;
  variations: string[];
  setRecycledPosts: Dispatch<SetStateAction<{ [postId: string]: boolean | string[] }>>;
}

export const PostVariations: React.FC<PostVariationsProps> = ({
  postId,
  variations,
  onSchedule,
}) => {
  const handleSchedule = async (variation: string) => {
    try {
      const response = await fetch("/api/schedule-post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: variation,
          time: "now", // You might want to allow scheduling for a specific time here
        }),
      });

      if (response.ok) {
        // Remove the scheduled variation from the state
        setRecycledPosts((prev) => {
          const updatedVariations = (prev[postId] as string[]).filter(
            (v) => v !== variation
          );
          return { ...prev, [postId]: updatedVariations };
        });

        // Show success toast
        //  toast({
        //    title: "Post Scheduled",
        //    description: "Your recycled post has been scheduled successfully.",
        //  });
      } else {
        console.error("Failed to schedule recycled post:", response.status);
      }
    } catch (error) {
      console.error("Error scheduling recycled post:", error);
    }
  };
  return (
    <div className="space-y-4">
      {variations.map((variation, index) => (
        <Card key={index}>
          <CardContent className="py-4">
            <p className="text-sm text-gray-700">{variation}</p>
          </CardContent>
          <CardFooter className="flex justify-end">            <Button onClick={() => handleSchedule(variation)}>Schedule</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};