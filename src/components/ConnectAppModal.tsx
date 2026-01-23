import { X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { getAppIcon, MovIcon } from "@/components/AppIcons";
import { AppData } from "@/data/apps";
import { Separator } from "@/components/ui/separator";

interface ConnectAppModalProps {
  app: AppData;
  isOpen: boolean;
  onClose: () => void;
  onConnect: () => void;
}

const ConnectAppModal = ({ app, isOpen, onClose, onConnect }: ConnectAppModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md p-0 gap-0 border-0 overflow-hidden max-h-[90vh] flex flex-col bg-background">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-50 rounded-full p-2 bg-black/30 hover:bg-black/50 transition-colors"
        >
          <X className="w-4 h-4 text-white" />
        </button>

        {/* Large gradient header - ChatGPT style */}
        <div className="min-h-[340px] bg-gradient-to-br from-sky-300 via-sky-200 to-amber-200 relative flex flex-col items-center justify-center px-6 py-8">
          {/* App icons side by side */}
          <div className="flex items-center gap-4 mb-6">
            {getAppIcon(app.id, "xl", true)}
            <span className="text-black/30 text-3xl font-light">|</span>
            <MovIcon size="xl" />
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold text-black text-center mb-2">
            Connecter {app.name}
          </h2>
          <h2 className="text-xl font-bold text-black text-center mb-4">
            à MOV
          </h2>

          {/* Subtitle */}
          <p className="text-sm text-black/70 text-center max-w-xs mb-8">
            MOV utilise {app.name} pour mieux comprendre vos habitudes numériques et vous proposer un programme de bien-être adapté.
          </p>

          {/* Buttons - small, minimal, inside gradient */}
          <div className="flex items-center gap-3">
            <button
              onClick={onConnect}
              className="px-6 py-2.5 bg-white text-black font-medium rounded-full text-sm hover:bg-white/90 transition-colors shadow-sm"
            >
              Connecter
            </button>
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-zinc-800 text-white font-medium rounded-full text-sm hover:bg-zinc-700 transition-colors"
            >
              Annuler
            </button>
          </div>
        </div>

        {/* Scrollable content sections - simple text, no icons */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-0 bg-background">
          {/* Data usage section */}
          <div className="py-4">
            <p className="text-sm text-foreground leading-relaxed">
              <span className="font-semibold">Se référer aux données d'utilisation. </span>
              Autoriser MOV à analyser certains signaux d'utilisation de {app.name} pour identifier votre niveau d'exposition aux contenus, comprendre vos rythmes d'utilisation et adapter votre programme MOV (Move, Breath, Focus).
            </p>
          </div>

          <Separator className="bg-border/50" />

          {/* Control section */}
          <div className="py-4">
            <p className="text-sm text-foreground leading-relaxed">
              <span className="font-semibold">Vous avez la main. </span>
              MOV respecte toujours vos préférences en matière d'utilisation des données. Vous pouvez déconnecter {app.name} à tout moment depuis les paramètres. Aucun contenu privé n'est publié ou modifié.
            </p>
          </div>

          <Separator className="bg-border/50" />

          {/* Shared data section */}
          <div className="py-4">
            <p className="text-sm text-foreground leading-relaxed">
              <span className="font-semibold">Données partagées avec cette appli. </span>
              En connectant {app.name} à MOV, vous autorisez l'accès aux informations générales d'utilisation (fréquence, types d'interactions, périodes d'activité) ainsi qu'aux données nécessaires à la personnalisation de votre programme. Ces données sont utilisées conformément à la Politique de confidentialité de MOV.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConnectAppModal;
