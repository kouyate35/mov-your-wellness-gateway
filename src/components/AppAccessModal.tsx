import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Scan, ShieldCheck, Settings2, Loader2 } from "lucide-react";

interface AppAccessModalProps {
  isOpen: boolean;
  isDetecting: boolean;
  onGrantAccess: () => void;
  onDenyAccess: () => void;
}

const AppAccessModal = ({
  isOpen,
  isDetecting,
  onGrantAccess,
  onDenyAccess,
}: AppAccessModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent 
        className="sm:max-w-md bg-card border-border rounded-3xl p-0 gap-0"
        hideCloseButton
      >
        {/* Header */}
        <div className="p-6 pb-4 text-center border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">
            Accès aux applications
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Pour personnaliser ton expérience Mov
          </p>
        </div>

        {/* Content - 3 blocs d'information */}
        <div className="p-6 space-y-5">
          {/* Bloc 1 - Identification */}
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
              <Scan className="w-5 h-5 text-foreground" strokeWidth={1.5} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-sm text-foreground">
                Identifier tes applications de divertissement
              </h3>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                Mov analyse uniquement les applications liées au divertissement et aux réseaux sociaux (réseaux, vidéos, jeux) afin de t'aider à mieux gérer ton temps.
              </p>
            </div>
          </div>

          {/* Bloc 2 - Confidentialité */}
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-foreground" strokeWidth={1.5} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-sm text-foreground">
                Aucune lecture de contenu
              </h3>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                Mov ne lit ni tes messages, ni tes contenus. Seuls les noms des applications et leur catégorie sont utilisés.
              </p>
            </div>
          </div>

          {/* Bloc 3 - Contrôle */}
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
              <Settings2 className="w-5 h-5 text-foreground" strokeWidth={1.5} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-sm text-foreground">
                Tu gardes le contrôle
              </h3>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                Tu peux désactiver cet accès à tout moment depuis les réglages Mov.
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="p-6 pt-2 space-y-3">
          <button
            onClick={onGrantAccess}
            disabled={isDetecting}
            className="w-full py-3.5 px-6 bg-foreground text-background rounded-full font-medium text-sm transition-all hover:opacity-90 disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {isDetecting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Détection en cours...
              </>
            ) : (
              "Activer l'accès"
            )}
          </button>
          
          <button
            onClick={onDenyAccess}
            disabled={isDetecting}
            className="w-full py-2 text-sm text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
          >
            Plus tard
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AppAccessModal;
