import { Clock } from "lucide-react";

interface EmptySectionProps {
  title: string;
}

const EmptySection = ({ title }: EmptySectionProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-8 text-center">
      <div className="w-16 h-16 rounded-full bg-secondary/50 flex items-center justify-center mb-4">
        <Clock className="w-8 h-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-medium text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-xs">
        Cette fonctionnalité sera bientôt disponible. Reste à l'écoute !
      </p>
    </div>
  );
};

export default EmptySection;
