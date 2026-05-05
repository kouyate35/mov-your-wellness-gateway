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
    <div className="flex justify-between items-center w-full px-5 pt-2 pb-3">
      <div className="flex items-center gap-2">
        <h2 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground/80">
          Applis détectées
        </h2>
      </div>
      <button
        onClick={onAddApp}
        className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-[0_2px_8px_rgba(0,0,0,0.25)] hover:scale-105 active:scale-95 transition-transform"
        aria-label="Ajouter une application"
      >
        <Plus size={16} className="text-black" strokeWidth={2.5} />
      </button>
    </div>
  );
};

export default SectionTabs;
