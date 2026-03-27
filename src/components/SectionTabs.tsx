import { Plus } from "lucide-react";

interface SectionTabsProps {
  activeTab: number;
  onTabChange: (index: number) => void;
  onAddApp?: () => void;
}

const tabs = [
  { id: "applis", label: "Applis détectées" },
];

const SectionTabs = ({ activeTab, onTabChange, onAddApp }: SectionTabsProps) => {
  return (
    <div className="flex justify-between items-center w-full px-4 py-3">
      <div className="flex gap-2">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(index)}
            className={`
              px-3 py-2 rounded-full whitespace-nowrap text-xs font-medium transition-all duration-200
              ${activeTab === index 
                ? "bg-secondary text-foreground" 
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <button
        onClick={onAddApp}
        className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0"
      >
        <Plus size={20} className="text-black" />
      </button>
    </div>
  );
};

export default SectionTabs;
