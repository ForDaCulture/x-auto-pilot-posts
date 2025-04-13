
import { Card } from "@/components/ui/card";
import { MessageCircle, Repeat2, Heart } from "lucide-react";
import calculatePostScore from "@/utils/postScore";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { usePostContext } from "@/context/PostContext";
import { Textarea } from "@/components/ui/textarea";
import { Copy } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

interface PostPreviewProps {
  text: string;
  imageUrl: string | null;
  sentiment: string | null;
}

const SentimentBadge: React.FC<{ sentiment: string }> = ({ sentiment }) => {
  let bgColor = "bg-gray-200";
  switch (sentiment) {
    case "Positive":
      bgColor = "bg-green-100 text-green-800";
      break;
    case "Neutral":
      bgColor = "bg-yellow-100 text-yellow-800";
      break;
    case "Negative":
      bgColor = "bg-red-100 text-red-800";
      break;
  }

  return (
    <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${bgColor}`}>
      {sentiment}
    </span>
  );
};

export const PostPreview: React.FC<PostPreviewProps> = ({ text, imageUrl, sentiment }) => {
  const { niche, originalText, ctaText, setOriginalText, setCtaText } = usePostContext();
  const { toast } = useToast();
  const [useCta, setUseCta] = useState(false);
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [ctaEnabled, setCtaEnabled] = useState(false);
  const [ctaText, setCtaText] = useState(text);
  const [originalText, setOriginalText] = useState(text);

  return (
    <div className="mb-6">
      <Card className="p-4 border border-gray-200 bg-white rounded-xl overflow-hidden">

        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-gray-300 to-gray-400 flex items-center justify-center text-white font-bold">
            HP
          </div>
          
          <div className="flex-1">
            <div className="flex items-center">
              <span className="font-bold">History Pilot</span>
              <span className="ml-1 text-gray-500">@historypilot · 1h</span>
            </div>

            {sentiment && (
              <div className="mb-2">
                <SentimentBadge sentiment={sentiment} />
              </div>
            )}
            
            <p className="mt-2 text-gray-800 whitespace-pre-line">{useCta ? ctaText : originalText}</p>
            
            <div className="mt-2 text-sm text-blue-600">
              {imageUrl && (<div className="mt-3 rounded-xl overflow-hidden border border-gray-200">
                <img 
                  src={imageUrl} 
                  alt="Historical visualization" 
                  className="w-full h-60 object-cover"
                />
              </div>
            )}
            </div>

            <Button
              onClick={async () => {
                const response = await fetch('/api/generate-hashtags', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ niche }),
                });

                if (response.ok) {
                  const data = await response.json();
                  setHashtags(data.hashtags);
                } else {
                  console.error('Failed to generate hashtags');
                }
              }}
              className="mt-4"
            >
              Generate Hashtags
            </Button>

            {hashtags.length > 0 && (
              <div className="mt-4">
                <Textarea
                  value={hashtags.join(' ')}
                  onChange={(e) => setHashtags(e.target.value.split(' '))}
                  className="w-full rounded-md border border-gray-200 p-2 text-sm"
                />
                <Button
                  onClick={() => navigator.clipboard.writeText(hashtags.join(' '))}
                  className="mt-2"
                >
                  <Copy className="mr-2 h-4 w-4" />
                  Copy Hashtags
                </Button>
              </div>
            )}

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Switch
                  id="cta-toggle"
                  checked={ctaEnabled}
                  onCheckedChange={async (checked) => {
                    setCtaEnabled(checked);
                    if (checked) {
                      const response = await fetch('/api/generate-cta', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ text: originalText }),
                      });

                      if (response.ok) {
                        const data = await response.json();
                        setCtaText(data.text);
                        toast({ title: "CTA Added", description: "Call-to-action added successfully!" });
                      } else {
                        toast({ title: "Error", description: "Failed to add call-to-action.", variant: "destructive" });
                        setCtaEnabled(false); 
                      }
                    } else {
                      setCtaText(originalText);
                    }
                  }}
                />
                <label htmlFor="cta-toggle" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Add Call-to-Action</label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="use-cta-toggle"
                  checked={useCta}
                  onCheckedChange={(checked) => {
                    setUseCta(checked);
                  }}
                  disabled={!ctaEnabled}
                />
                <label htmlFor="use-cta-toggle" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Use CTA in Post</label>
              </div>
            </div>


            <div className="mt-3 flex items-center text-gray-500">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="text-sm mr-2 cursor-help">
                      Post Quality Score: {calculatePostScore(text, sentiment)}/100
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      This score (0-100) reflects the post's likely engagement based on length, keyword use, and sentiment.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>                
            </div>

            <div className="mt-2 flex justify-between text-gray-500">
              <button className="flex items-center hover:text-blue-500">
                <MessageCircle size={18} />
                <span className="ml-2">0</span>
              </button>
              <button className="flex items-center hover:text-green-500">
                <Repeat2 size={18} />
                <span className="ml-2">0</span>
              </button>
              <button className="flex items-center hover:text-red-500">
                <Heart size={18} />
                <span className="ml-2">0</span>
              </button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
