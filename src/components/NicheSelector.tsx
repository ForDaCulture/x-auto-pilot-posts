
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface NicheSelectorProps {
  selectedNiche: string;
  onSelectNiche: (niche: string) => void;
}

export const NicheSelector: React.FC<NicheSelectorProps> = ({ selectedNiche, onSelectNiche }) => {
  return (
    <div className="mb-6">
      <Label htmlFor="niche-select" className="block mb-2">
        Select Niche
      </Label>
      <Select value={selectedNiche} onValueChange={onSelectNiche}>
        <SelectTrigger id="niche-select" className="w-full">
          <SelectValue placeholder="Select a niche" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="history">History</SelectItem>
          <SelectItem value="fitness" disabled>Fitness (Coming Soon)</SelectItem>
          <SelectItem value="science" disabled>Science (Coming Soon)</SelectItem>
          <SelectItem value="art" disabled>Art (Coming Soon)</SelectItem>
          <SelectItem value="philosophy" disabled>Philosophy (Coming Soon)</SelectItem>
        </SelectContent>
      </Select>
      <p className="text-sm text-gray-500 mt-2">
        Currently focused on historical content, with more niches coming soon!
      </p>
    </div>
  );
};
