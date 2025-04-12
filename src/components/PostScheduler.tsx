
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, Clock } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface PostSchedulerProps {
  onSchedule: (time: string) => Promise<boolean>;
  disabled: boolean;
  content: {
    text: string;
    imageUrl: string | null;
  };
}

export const PostScheduler: React.FC<PostSchedulerProps> = ({ 
  onSchedule, 
  disabled,
  content 
}) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [hour, setHour] = useState("12");
  const [minute, setMinute] = useState("00");
  const [meridiem, setMeridiem] = useState("PM");
  const [isScheduling, setIsScheduling] = useState(false);
  
  const handleSchedule = async () => {
    if (!date) return;
    
    setIsScheduling(true);
    
    // Format the date and time for display
    const formattedDate = format(date, "PPP");
    const formattedTime = `${hour}:${minute} ${meridiem}`;
    const scheduleTime = `${formattedDate} at ${formattedTime}`;
    
    const success = await onSchedule(scheduleTime);
    
    setIsScheduling(false);
    
    if (success) {
      // Reset the form
      setDate(new Date());
      setHour("12");
      setMinute("00");
      setMeridiem("PM");
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
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div>
          <Label className="block mb-2">Time</Label>
          <div className="flex space-x-2">
            <Select value={hour} onValueChange={setHour}>
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
            
            <Select value={minute} onValueChange={setMinute}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Minute" />
              </SelectTrigger>
              <SelectContent>
                {minutes.map(m => (
                  <SelectItem key={m} value={m}>{m}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={meridiem} onValueChange={setMeridiem}>
              <SelectTrigger className="w-24">
                <SelectValue placeholder="AM/PM" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="AM">AM</SelectItem>
                <SelectItem value="PM">PM</SelectItem>
              </SelectContent>
            </Select>
          </div>
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
