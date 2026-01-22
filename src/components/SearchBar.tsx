import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchBar = ({ value, onChange, placeholder = "Rechercher une application..." }: SearchBarProps) => {
  return (
    <div className="px-4">
      <div className="relative border border-border rounded-full bg-secondary/20">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-12 pr-4 py-3.5 bg-transparent rounded-full text-foreground placeholder:text-muted-foreground focus:outline-none"
        />
      </div>
    </div>
  );
};

export default SearchBar;
