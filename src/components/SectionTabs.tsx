import { useState } from "react";

interface SectionTabsProps {
  activeTab: number;
  onTabChange: (index: number) => void;
}

const tabs = [
  { id: "applis", label: "Applis" },
  { id: "routines", label: "Routines" },
  { id: "programmes", label: "Programmes" },
  { id: "insights", label: "Insights" },
];

const SectionTabs = ({ activeTab, onTabChange }: SectionTabsProps) => {
  return (
    <div className="flex justify-between w-full px-4 py-3">
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
  );
};

export default SectionTabs;
