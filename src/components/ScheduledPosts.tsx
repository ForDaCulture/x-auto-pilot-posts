
import { useContext, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarClock, Sparkles, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { PostContext } from "@/context/PostContext";
import { Switch } from "@/components/ui/switch";
import { PostVariations } from "./PostVariations";

export const ScheduledPosts: React.FC = () => {
  const { toast } = useToast();
  const { state, dispatch } = useContext(PostContext);
  const scheduledPosts = state.scheduledPosts;
  const [recycledPosts, setRecycledPosts] = useState<{
    [postId: string]: boolean | string[];
  }>({});
  const handleDelete = (id: string) => {
    dispatch({ type: "REMOVE_SCHEDULED_POST", payload: id });
    toast({

    title: "Post Removed",

      description: "The scheduled post has been removed.",
    });
  };
    return (
      <div className="text-center text-gray-500 py-8">
        <CalendarClock className="mx-auto h-10 w-10 mb-2 opacity-50" />
        <p>No scheduled posts</p>
        <p className="text-sm mt-1">Generate and schedule posts to see them here</p>
      </div>
    );
  }

  const handleRecycleToggle = async (postId: string, checked: boolean) => {
    if (checked) {
      setRecycledPosts((prev) => ({ ...prev, [postId]: true }));
      try {
        const response = await fetch(`/api/recycle-post/${postId}`, {
          method: "POST",
        });
        if (response.ok) {
          const data = await response.json();
          setRecycledPosts((prev) => ({ ...prev, [postId]: data }));
        } else {
          console.error("Failed to fetch post variations:", response.status);
          setRecycledPosts((prev) => ({ ...prev, [postId]: false })); // Reset on failure
          toast({
            title: "Error",
            description: "Failed to fetch post variations.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error fetching post variations:", error);
        setRecycledPosts((prev) => ({ ...prev, [postId]: false })); // Reset on error
        toast({
          title: "Error",
          description: "Error fetching post variations.",
          variant: "destructive",
        });
      }
    } else {
      setRecycledPosts((prev) => ({ ...prev, [postId]: false }));
    }  };

  if (scheduledPosts.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
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
                <div className="flex items-center space-x-2">
                  {/* Recycle Toggle */}
                    <div className="flex items-center space-x-1">
                      <Switch
                        id={`recycle-${post.id}`}
                        checked={!!recycledPosts[post.id]}
                        onCheckedChange={(checked) =>
                          handleRecycleToggle(post.id, checked)
                        }
                        className={`data-[state=checked]:bg-green-500`}
                      />
                      <label
                        htmlFor={`recycle-${post.id}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Recycle Post
                      </label>
                    </div>
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
              </div>
              {Array.isArray(recycledPosts[post.id]) && (
                <PostVariations
                  postId={post.id}
                  variations={recycledPosts[post.id] as string[]}
                  setRecycledPosts={setRecycledPosts}
                />
              )}
            </CardContent>
          </Card>
        ))}

      </div>
    </div>
  );
};
