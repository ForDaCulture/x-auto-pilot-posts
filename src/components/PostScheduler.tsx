
import { useState, useContext, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, Clock } from "lucide-react";
import { format, toDate } from "date-fns";
import { cn, toast } from "@/lib/utils";
import { usePostContext } from "@/context/PostContext";

interface PostSchedulerProps{
  onSchedule: (time: string) => Promise<boolean>;
  disabled: boolean;
  content: {
    text: string;
    imageUrl: string | null;
  };
}

export const PostScheduler: React.FC<PostSchedulerProps> = ({ disabled, content }) => {
  const { dispatch } = useContext(PostContext);
  const { niche } = usePostContext();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [cron, setCron] = useState<string>("0 12 * * *");
  const [suggestedTime, setSuggestedTime] = useState<string | null>(null);
  const [isScheduling, setIsScheduling] = useState(false);

  useEffect(() => {
    const today = new Date();
    today.setHours(12, 0, 0, 0); // Default to 12 PM
    setDate(today);
  }, []);

  const handleSchedule = async () => {
    if (!date) {
      return;
    }
    
    const postDate = toDate(date);
    postDate.setHours(parseInt(hour));
    postDate.setMinutes(parseInt(minute));
    postDate.setSeconds(0);

    setIsScheduling(true);
    
    // Format the date and time for display
    const formattedDate = format(postDate, "PPP");
    const formattedTime = `${hour}:${minute} ${meridiem}`;
    const scheduleTime = `${formattedDate} at ${formattedTime}`;

    dispatch({
      type: "ADD_SCHEDULED_POST",
      payload: { id: crypto.randomUUID(), text: content.text, time: scheduleTime, hasImage: !!content.imageUrl },
    });
      // Reset the form
      setDate(new Date());
      setHour("12");
      setMinute("00");
      setMeridiem("PM");
    }
  };

  const [hour, minute, meridiem] = (() => {
    const [_, h, m] = cron.split(" ");
    const hour = parseInt(h);
    const meridiem = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 === 0 ? 12 : hour % 12;
    return [String(displayHour).padStart(2, "0"), m, meridiem];
  })();

  const handleSuggestTime = async () => {
    if (!niche) {
      toast({
        title: "Error",
        description: "Please select a niche first.",
        variant: "destructive",
      });
      return;
    }

    const response = await fetch("/api/suggest-time", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ niche }),
    });

    if (response.ok) {
      const data = await response.json();
      setCron(data.cron);
      setSuggestedTime(data.timeString);
      toast({ title: "Suggested Time", description: `Best time to post: ${data.timeString} ` });
    } else {
      toast({ title: "Error", description: "Failed to get suggested time.", variant: "destructive" });
    }
  };
  
  const hours = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
  const minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));
  
  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium mb-4">Schedule Your Post</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="schedule-date" className="block mb-2">Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="schedule-date"
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div>
          <Label className="block mb-2">Time</Label>
          <div className="flex space-x-2">
            <Select value={hour} >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Hour" />
              </SelectTrigger>
              <SelectContent>
                {hours.map(h => (
                  <SelectItem key={h} value={h}>{h}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <span className="flex items-center">:</span>
            
            <Select value={minute} >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Minute" />
              </SelectTrigger>
              <SelectContent>
                {minutes.map(m => (
                  <SelectItem key={m} value={m}>{m}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={meridiem} >
              <SelectTrigger className="w-24">
                <SelectValue placeholder="AM/PM" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="AM">AM</SelectItem>
                <SelectItem value="PM">PM</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {suggestedTime && <p className="mt-2 text-sm text-muted-foreground">Suggested time: {suggestedTime}</p>}
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <Button type="button" variant="outline" onClick={handleSuggestTime} disabled={disabled}>
          Suggest Best Time
        </div>
      </div>
      
      <Button
        onClick={handleSchedule}
        disabled={disabled || !date || isScheduling}
        className="mt-6 w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
      >
        {isScheduling ? (
          "Scheduling..."
        ) : (
          <>
            <Clock className="mr-2 h-4 w-4" />
            Schedule Post
          </>
        )}
      </Button>
    </div>
  );
};
