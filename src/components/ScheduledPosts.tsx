
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarClock, Sparkles, Trash2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";

export const ScheduledPosts = () => {
  const { toast } = useToast();
  const [scheduledPosts, setScheduledPosts] = useState([
    {
      id: "1",
      text: "The Great Pyramid of Giza was the tallest man-made structure for over 3,800 years until the completion of Lincoln Cathedral in 1311 AD.",
      time: "April 15, 2025 at 10:30 AM",
      hasImage: true,
    },
    {
      id: "2",
      text: "In 1666, the Great Fire of London destroyed over 13,000 homes but officially killed only six people.",
      time: "April 18, 2025 at 02:15 PM",
      hasImage: true,
    },
  ]);

  const handleDelete = (id: string) => {
    setScheduledPosts(scheduledPosts.filter(post => post.id !== id));
    toast({
      title: "Post Removed",
      description: "The scheduled post has been removed.",
    });
  };

  if (scheduledPosts.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        <CalendarClock className="mx-auto h-10 w-10 mb-2 opacity-50" />
        <p>No scheduled posts</p>
        <p className="text-sm mt-1">Generate and schedule posts to see them here</p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Upcoming Posts</h3>
      <div className="space-y-4">
        {scheduledPosts.map((post, index) => (
          <Card key={post.id} className="bg-gray-50">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="text-sm font-medium flex items-center text-blue-600">
                    <CalendarClock className="h-3 w-3 mr-1" />
                    {post.time}
                  </p>
                  <p className="mt-2 line-clamp-2 text-sm">
                    {post.text}
                  </p>
                  {post.hasImage && (
                    <p className="text-xs text-gray-500 mt-1 flex items-center">
                      <Sparkles className="h-3 w-3 mr-1" />
                      Includes image
                    </p>
                  )}
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-gray-400 hover:text-red-500"
                  onClick={() => handleDelete(post.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
