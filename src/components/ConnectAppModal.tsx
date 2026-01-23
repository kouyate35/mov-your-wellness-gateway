import { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { getAppIcon, MovIcon } from "@/components/AppIcons";
import { AppData } from "@/data/apps";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

interface ConnectAppModalProps {
  app: AppData;
  isOpen: boolean;
  onClose: () => void;
  onConnect: () => void;
}

const ConnectAppModal = ({ app, isOpen, onClose, onConnect }: ConnectAppModalProps) => {
  const [scrollY, setScrollY] = useState(0);
  const [referToChats, setReferToChats] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Handle scroll for parallax effect on header
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      setScrollY(scrollContainerRef.current.scrollTop);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [isOpen]);

  // Calculate header transform based on scroll
  const headerTransform = Math.min(scrollY * 0.5, 100);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent 
        hideCloseButton
        className="sm:max-w-[calc(100%-32px)] max-w-[calc(100%-32px)] mx-4 p-0 gap-0 border-0 overflow-hidden max-h-[85vh] flex flex-col bg-background rounded-3xl"
      >
        {/* Scrollable container for parallax effect */}
        <div 
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto overflow-x-hidden"
        >
          {/* Large gradient header - ChatGPT style with parallax */}
          <div 
            className="min-h-[320px] relative flex flex-col items-center justify-center px-6 py-8"
            style={{
              background: 'linear-gradient(to bottom right, hsl(199 89% 60%), hsl(199 89% 70%), hsl(40 90% 75%))',
              transform: `translateY(${headerTransform}px)`,
              marginBottom: `-${headerTransform}px`
            }}
          >
            {/* Close button - only one, positioned in corner */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-50 rounded-full p-2 bg-foreground/20 hover:bg-foreground/30 transition-colors"
            >
              <X className="w-5 h-5 text-primary-foreground" />
            </button>

            {/* App icons side by side - smaller size */}
            <div className="flex items-center gap-4 mb-5">
              {getAppIcon(app.id, "lg", true)}
              <span className="text-primary-foreground/50 text-2xl font-light">|</span>
              <MovIcon size="lg" />
            </div>

            {/* Title - WHITE text, single line */}
            <h2 className="text-2xl font-bold text-primary-foreground text-center mb-3 whitespace-nowrap">
              Connecter {app.name} à MOV
            </h2>

            {/* Subtitle - WHITE text, max 3 lines */}
            <p className="text-sm text-primary-foreground/90 text-center max-w-[280px] mb-6 line-clamp-3">
              MOV utilise {app.name} pour mieux comprendre vos habitudes numériques et vous proposer un programme adapté.
            </p>

            {/* Buttons - small, minimal, inside gradient */}
            <div className="flex items-center gap-3">
              <button
                onClick={onConnect}
                className="px-6 py-2.5 bg-primary text-primary-foreground font-medium rounded-full text-sm hover:bg-primary/90 transition-colors shadow-sm"
              >
                Connecter
              </button>
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-secondary text-secondary-foreground font-medium rounded-full text-sm hover:bg-secondary/80 transition-colors"
              >
                Annuler
              </button>
            </div>
          </div>

          {/* Content sections - simple text with blue highlights */}
          <div className="px-5 py-4 space-y-0 bg-background">
            {/* Refer to chats section with toggle */}
            <div className="py-4 flex items-start gap-4">
              <div className="flex-1">
                <p className="text-sm text-foreground leading-relaxed">
                  <span className="font-semibold text-info">Se référer aux données d'utilisation.</span>{" "}
                  Autoriser MOV à analyser certains signaux d'utilisation de {app.name} pour identifier votre niveau d'exposition aux contenus et adapter votre programme.
                </p>
              </div>
              <Switch
                checked={referToChats}
                onCheckedChange={setReferToChats}
                className="shrink-0 mt-1"
              />
            </div>

            <Separator className="bg-border/50" />

            {/* Control section */}
            <div className="py-4">
              <p className="text-sm text-foreground leading-relaxed">
                <span className="font-semibold text-info">Vous avez la main.</span>{" "}
                MOV respecte toujours vos préférences en matière d'utilisation des données. Vous pouvez déconnecter {app.name} à tout moment.
              </p>
            </div>

            <Separator className="bg-border/50" />

            {/* Risk section */}
            <div className="py-4">
              <p className="text-sm text-foreground leading-relaxed">
                <span className="font-semibold text-info">L'utilisation d'applis peut comporter des risques.</span>{" "}
                MOV est conçu pour protéger vos données, mais des acteurs malveillants pourraient tenter d'accéder à vos données.
              </p>
            </div>

            <Separator className="bg-border/50" />

            {/* Shared data section */}
            <div className="py-4 pb-6">
              <p className="text-sm text-foreground leading-relaxed">
                <span className="font-semibold text-info">Données partagées avec cette appli.</span>{" "}
                En connectant {app.name} à MOV, vous autorisez l'accès aux informations générales d'utilisation. Ces données sont utilisées conformément à la{" "}
                <span className="text-info underline">Politique de confidentialité</span> de MOV.
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConnectAppModal;
