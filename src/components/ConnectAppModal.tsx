import { X, Shield, Eye, Database } from "lucide-react";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { getAppIcon } from "@/components/AppIcons";
import { AppData } from "@/data/apps";
import movIcon from "@/assets/mov-icon.png";

interface ConnectAppModalProps {
  app: AppData;
  isOpen: boolean;
  onClose: () => void;
  onConnect: () => void;
}

const ConnectAppModal = ({ app, isOpen, onClose, onConnect }: ConnectAppModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md p-0 gap-0 bg-background border-border overflow-hidden max-h-[90vh] flex flex-col">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-50 rounded-full p-1.5 bg-black/20 hover:bg-black/40 transition-colors"
        >
          <X className="w-4 h-4 text-white" />
        </button>

        {/* Gradient header */}
        <div className="h-24 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 relative flex items-center justify-center">
          {/* App icons */}
          <div className="flex items-center gap-3">
            {getAppIcon(app.id, "lg", true)}
            <span className="text-white/60 text-2xl font-light">|</span>
            <div className="w-16 h-16 rounded-2xl overflow-hidden bg-white flex items-center justify-center">
              <img src={movIcon} alt="MOV" className="w-12 h-12 object-contain" />
            </div>
          </div>
        </div>

        {/* Title section */}
        <div className="px-6 pt-6 pb-4 text-center">
          <h2 className="text-xl font-bold text-foreground mb-2">
            Connecter {app.name} à MOV
          </h2>
          <p className="text-sm text-muted-foreground">
            MOV utilise {app.name} pour mieux comprendre vos habitudes numériques et vous proposer un programme de bien-être adapté.
          </p>
        </div>

        {/* Buttons */}
        <div className="px-6 pb-4 flex gap-3">
          <button
            onClick={onConnect}
            className="flex-1 py-3 bg-white text-black font-semibold rounded-full hover:bg-white/90 transition-colors"
          >
            Connecter
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-3 bg-transparent text-foreground font-semibold rounded-full border border-border hover:bg-card transition-colors"
          >
            Annuler
          </button>
        </div>

        {/* Scrollable content sections */}
        <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-4">
          {/* Data usage section */}
          <div className="p-4 bg-card rounded-xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <Database className="w-4 h-4 text-blue-500" />
              </div>
              <h3 className="font-semibold text-foreground">Utilisation des données par MOV</h3>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-0.5">•</span>
                <span>Identifier votre niveau d'exposition aux contenus</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-0.5">•</span>
                <span>Comprendre vos rythmes d'utilisation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-0.5">•</span>
                <span>Adapter votre programme MOV (Move, Breath, Focus)</span>
              </li>
            </ul>
            <p className="mt-3 text-xs text-muted-foreground/80">
              Aucun contenu privé n'est publié ou modifié.
            </p>
          </div>

          {/* Control section */}
          <div className="p-4 bg-card rounded-xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                <Shield className="w-4 h-4 text-green-500" />
              </div>
              <h3 className="font-semibold text-foreground">Vous avez la main</h3>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">•</span>
                <span>Vous pouvez déconnecter {app.name} à tout moment</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">•</span>
                <span>Vos préférences sont respectées</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">•</span>
                <span>MOV n'utilise les données que pour améliorer votre expérience</span>
              </li>
            </ul>
          </div>

          {/* Shared data section */}
          <div className="p-4 bg-card rounded-xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <Eye className="w-4 h-4 text-purple-500" />
              </div>
              <h3 className="font-semibold text-foreground">Données partagées avec cette appli</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              En connectant {app.name} à MOV, vous autorisez l'accès à :
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-purple-500 mt-0.5">•</span>
                <span>Informations générales d'utilisation (fréquence, types d'interactions)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-500 mt-0.5">•</span>
                <span>Données nécessaires à la personnalisation de votre programme</span>
              </li>
            </ul>
            <p className="mt-3 text-xs text-muted-foreground/80">
              Ces données sont utilisées conformément à la Politique de confidentialité et aux Conditions d'utilisation de MOV.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConnectAppModal;
