
import { useContext } from "react";
import { Layout } from "@/components/Layout";
import { NicheSelector } from "@/components/NicheSelector";
import { PostGenerator } from "@/components/PostGenerator";
import { PostPreview } from "@/components/PostPreview";
import { PostScheduler } from "@/components/PostScheduler";
import { ScheduledPosts } from "@/components/ScheduledPosts";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PostContext } from "@/context/PostContext";

const Index = () => {
  const { state, dispatch } = useContext(PostContext);
  const { selectedNiche, generatedContent, isGenerating } = state;
  const { toast } = useToast();

  // Helper function for retry logic with exponential backoff
  const withRetry = async <T, >(
    fn: () => Promise<T>,
    maxRetries: number = 3,
    delay: number = 1000
  ): Promise<T> => {
    let attempts = 0;
    while (attempts < maxRetries) {
      try {
        return await fn();
      } catch (error) {
        attempts++;
        console.error(`Attempt ${attempts} failed:`, error);
        if (attempts === maxRetries) throw error;
        await new Promise((resolve) => setTimeout(resolve, delay * 2 ** attempts));
      }
    }
    throw new Error("Max retries exceeded"); // This line should never be reached, but it satisfies TypeScript
  };

  // This function connects to the backend API for post generation
  const generatePost = async () => {
    dispatch({ type: "SET_GENERATING", payload: true });

    try {
      // Use withRetry to add retry logic to the API call
      const response = await withRetry(async () => {
        const res = await fetch("/api/generate-post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ niche: selectedNiche }),
        });

        if (!res.ok) {
          // Provide more specific error messages based on status code
          if (res.status === 429) {
            throw new Error("Too many requests. Please try again later.");
          } else {
            throw new Error(`Failed to generate post: ${res.status} - ${res.statusText}`);
          }
        }
        return res;
      });

      const data = await response.json();
      let content = { ...data, sentiment: null };

      toast({ title: "Content Generated", description: "Post generated successfully." });
    } catch (error: any) {
      // Handle errors with more specific messages
      const errorMessage =
        error.message === "Max retries exceeded"
          ? "Failed to generate post after multiple attempts. Please try again later."
          : error.message || "An unexpected error occurred during post generation.";

      console.error("Error generating post:", error);
      toast({ title: "Generation Failed", description: errorMessage, variant: "destructive" });
    }

    if (generatedContent.text) {
      try {
        // Call the sentiment analysis endpoint
        const sentimentResponse = await fetch("/api/sentiment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: generatedContent.text }),
        });

        if (sentimentResponse.ok) {
          const sentimentData = await sentimentResponse.json();
          content.sentiment = sentimentData.sentiment;
        } else {
          console.error("Sentiment analysis failed:", sentimentResponse.status, sentimentResponse.statusText);
          // Handle sentiment analysis error - set sentiment to null
          content.sentiment = null;
        }
      } catch (error) {
        console.error("Error during sentiment analysis:", error);
        // Handle sentiment analysis error - set sentiment to null
        content.sentiment = null;
      }
    } finally {
      dispatch({ type: "SET_GENERATING", payload: false });
    }
  };
  
  const schedulePost = async (scheduledTime: string) => {
    try {
      // Simulate API call to schedule post
      await new Promise(resolve => setTimeout(resolve, 800));
      
      toast({
        title: "Post Scheduled",
        description: `Your post has been scheduled for ${scheduledTime}`,
      });
      
      return true;
    } catch (error) {
      console.error("Error scheduling post:", error);
      toast({
        title: "Scheduling Failed",
        description: "There was an error scheduling your post. Please try again.",
        variant: "destructive",
      });
      
      return false;
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-6 px-4 md:px-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          X Auto-Pilot Posts
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Content Generator</h2>
              
              <NicheSelector 
                selectedNiche={selectedNiche} 
                onSelectNiche={(niche) => dispatch({ type: "SET_NICHE", payload: niche })}
              />
              
              <PostGenerator
                onGenerate={generatePost}
                isGenerating={state.isGenerating}
                selectedNiche={state.selectedNiche}
              />
            </div>
            
            {generatedContent.text && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Post Preview</h2>
                <PostPreview 
                  text={generatedContent.text} 
                  imageUrl={generatedContent.imageUrl} 
                  sentiment={generatedContent.sentiment}
                />
                
                <PostScheduler 
                  onSchedule={schedulePost} 
                  disabled={!generatedContent.text} 
                />
              </div>            
            )}
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 h-full">
              <Tabs defaultValue="scheduled">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
                  <TabsTrigger value="history">Post History</TabsTrigger>
                </TabsList>
                
                <TabsContent value="scheduled" className="mt-0">
                  <ScheduledPosts />
                </TabsContent>
                
                <TabsContent value="history" className="mt-0">
                  <div className="text-center text-gray-500 py-8">
                    <p>Your post history will appear here</p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
