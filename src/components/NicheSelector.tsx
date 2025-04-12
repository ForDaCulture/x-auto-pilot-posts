
import { Label } from "@/components/ui/label";import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface NicheSelectorProps {
  selectedNiche: string;
  onSelectNiche: (niche: string) => void;
}

export const NicheSelector: React.FC<NicheSelectorProps> = ({ selectedNiche, onSelectNiche }) => {
  const [niches, setNiches] = useState<{ id: string; name: string; }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch niches from API
  useEffect(() => {
    const fetchNiches = async () => {
      try {
        const response = await fetch("/api/niches");
        if (!response.ok) {
          throw new Error("Failed to fetch niches");
        }
        const data = await response.json();
        setNiches(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNiches();
  }, []);

  return (
    <div className="mb-6">
      <Label htmlFor="niche-select" className="block mb-2">
        Select Niche
      </Label>
      {loading ? (
        <Select disabled>
          <SelectTrigger id="niche-select" className="w-full">
            <SelectValue placeholder="Loading niches..." />
          </SelectTrigger>
        </Select>
      ) : error ? (
        <div className="text-red-500">Error: {error}</div>
      ) : (
        <Select value={selectedNiche} onValueChange={onSelectNiche}>
          <SelectTrigger id="niche-select" className="w-full">
            <SelectValue placeholder="Select a niche" />
          </SelectTrigger>
          <SelectContent>
            {niches.map((niche) => (
              <SelectItem key={niche.id} value={niche.id}>
                {niche.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
      {/* This component now fetches niches from the API */}
    </div>
  );
};
