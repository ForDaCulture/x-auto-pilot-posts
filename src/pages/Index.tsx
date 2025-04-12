
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { NicheSelector } from "@/components/NicheSelector";
import { PostGenerator } from "@/components/PostGenerator";
import { PostPreview } from "@/components/PostPreview";
import { PostScheduler } from "@/components/PostScheduler";
import { ScheduledPosts } from "@/components/ScheduledPosts";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const [selectedNiche, setSelectedNiche] = useState("history");
  const [generatedContent, setGeneratedContent] = useState<{
    text: string;
    imageUrl: string | null;
  }>({ text: "", imageUrl: null });
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();
  
  // This function would normally connect to your backend
  const generatePost = async () => {
    setIsGenerating(true);
    
    try {
      // Simulating API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock data based on selected niche
      const historyFacts = [
        "On this day in 1969, Apollo 11 landed on the moon, marking mankind's first steps on another celestial body.",
        "Did you know? The Great Wall of China took over 2,000 years to build, with construction starting in the 7th century BC.",
        "In 1215, King John of England signed the Magna Carta, laying the foundation for constitutional governments worldwide.",
        "The printing press, invented by Johannes Gutenberg around 1440, revolutionized how knowledge was spread across Europe.",
        "Ancient Egyptians were using toothpaste as early as 5000 BC, made from crushed eggshells and ox hooves.",
      ];
      
      const imageUrls = [
        "https://images.unsplash.com/photo-1568219656418-15c329312bf1?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1563781677-a6b9bd7857e3?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1461360228754-6e81c478b882?q=80&w=2074&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1603665330306-dd1a67e0cc4e?q=80&w=2070&auto=format&fit=crop",
      ];
      
      // Select random content based on niche
      const randomIndex = Math.floor(Math.random() * historyFacts.length);
      
      setGeneratedContent({
        text: historyFacts[randomIndex],
        imageUrl: imageUrls[randomIndex],
      });
      
      toast({
        title: "Content Generated",
        description: "Your historical post has been generated successfully.",
      });
    } catch (error) {
      console.error("Error generating post:", error);
      toast({
        title: "Generation Failed",
        description: "There was an error generating your post. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
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
                onSelectNiche={setSelectedNiche} 
              />
              
              <PostGenerator
                selectedNiche={selectedNiche}
                onGenerate={generatePost}
                isGenerating={isGenerating}
              />
            </div>
            
            {generatedContent.text && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Post Preview</h2>
                <PostPreview 
                  text={generatedContent.text} 
                  imageUrl={generatedContent.imageUrl} 
                />
                
                <PostScheduler 
                  onSchedule={schedulePost} 
                  disabled={!generatedContent.text} 
                  content={generatedContent}
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
