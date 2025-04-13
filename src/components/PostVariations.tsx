import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Post } from "@/types/types";
import { useToast } from "@/hooks/use-toast";
import { Dispatch, SetStateAction, useContext } from "react";
import { PostContext } from "@/context/PostContext";

interface PostVariationsProps {
  post: Post;
  variations: string[]; // Only the text variations
  setRecycledPosts: Dispatch<
    SetStateAction<{ [postId: string]: boolean | string[] }>
  >;
}

export const PostVariations: React.FC<PostVariationsProps> = ({
  post,
  variations,
  setRecycledPosts,
}) => {
  const { niche } = useContext(PostContext);
  const { toast } = useToast();

  const handleSchedule = async (variation: string) => {
    try {
      const response = await fetch("/api/schedule-post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: variation, imageUrl: post.imageUrl, niche, postId: post.id }),
      });

      if (response.ok) {
        // Remove the variation UI for this post (optional)
        // setRecycledPosts((prev) => {
        //   const updatedVariations = (prev[post.id] as string[]).filter(
        //     (v) => v !== variation
        //   );
        //   return { ...prev, [post.id]: updatedVariations };
        // });

        // Show success toast.
        toast({
          title: "Variation Scheduled",
          description: "Variation scheduled successfully.",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to schedule variation.",
          variant: "destructive",
        });
        console.error("Failed to schedule variation:", response.status);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Error scheduling variation.",
        variant: "destructive",
      });
      console.error("Error scheduling variation:", error);
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