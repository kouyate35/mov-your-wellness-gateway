import { X, HelpCircle, FileText, Bug, ChevronRight, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HelpModal = ({ isOpen, onClose }: HelpModalProps) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const items = [
    {
      icon: HelpCircle,
      label: "Centre d'assistance",
      hasExternal: true,
      action: () => { navigate("/help-center"); onClose(); },
    },
    {
      icon: FileText,
      label: "Conditions et politiques",
      action: () => { navigate("/terms"); onClose(); },
    },
    {
      icon: Bug,
      label: "Signaler un bug",
      action: () => {},
    },
  ];

  return (
    <div className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md mx-3 mb-3 sm:mb-0 bg-card/95 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <h2 className="text-lg font-semibold text-foreground tracking-tight">Aide</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="h-px bg-border/50 mx-5" />

        {/* Items */}
        <div className="p-3">
          {items.map((item, index) => (
            <button
              key={index}
              onClick={item.action}
              className="w-full flex items-center justify-between px-4 py-4 text-foreground hover:bg-muted rounded-xl transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm font-medium">{item.label}</span>
              </div>
              {item.hasExternal ? (
                <ExternalLink className="w-4 h-4 text-muted-foreground" />
              ) : (
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HelpModal;
