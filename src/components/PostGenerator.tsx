
import { Button } from "@/components/ui/button";
import { Loader2, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";

interface PostGeneratorProps {
  selectedNiche: string;
  onGenerate: () => Promise<void>;
  isGenerating: boolean;
}

export const PostGenerator: React.FC<PostGeneratorProps> = ({ 
  selectedNiche, 
  onGenerate, 
  isGenerating 
}) => {
  return (
    <div>
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="fact-accuracy" className="flex-1">Fact Accuracy</Label>
              <Slider
                id="fact-accuracy"
                defaultValue={[80]}
                max={100}
                step={1}
                className="w-48"
              />
              <span className="ml-2 text-sm text-gray-500 w-8">80%</span>
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="creativity" className="flex-1">Creativity</Label>
              <Slider
                id="creativity"
                defaultValue={[60]}
                max={100}
                step={1}
                className="w-48"
              />
              <span className="ml-2 text-sm text-gray-500 w-8">60%</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label htmlFor="add-image" className="mr-2">Include Image</Label>
              </div>
              <Switch id="add-image" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label htmlFor="add-hashtags" className="mr-2">Add Hashtags</Label>
              </div>
              <Switch id="add-hashtags" defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Button
        onClick={onGenerate}
        disabled={isGenerating}
        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
      >
        {isGenerating ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Sparkles className="mr-2 h-4 w-4" />
            Generate {selectedNiche === "history" ? "Historical" : selectedNiche} Post
          </>
        )}
      </Button>
    </div>
  );
};
