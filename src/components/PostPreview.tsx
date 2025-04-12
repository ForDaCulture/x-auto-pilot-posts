
import { Card } from "@/components/ui/card";
import { Calendar, Clock, MapPin, MessageCircle, Repeat2, Heart } from "lucide-react";

interface PostPreviewProps {
  text: string;
  imageUrl: string | null;
}

export const PostPreview: React.FC<PostPreviewProps> = ({ text, imageUrl }) => {
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
            
            <div className="mt-4 flex justify-between text-gray-500">
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
