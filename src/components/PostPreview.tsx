
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, MapPin, MessageCircle, Repeat2, Heart } from "lucide-react";
import calculatePostScore from "@/utils/postScore";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
            
            <p className="mt-2 text-gray-800 whitespace-pre-line">{text}</p>
            
            <div className="mt-2 text-sm text-blue-600">
              #History #HistoricalFacts #DidYouKnow #TodayInHistory
            </div>
            
            {imageUrl && (
              <div className="mt-3 rounded-xl overflow-hidden border border-gray-200">
                <img 
                  src={imageUrl} 
                  alt="Historical visualization" 
                  className="w-full h-60 object-cover"
                />
              </div>
            )}
            
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
