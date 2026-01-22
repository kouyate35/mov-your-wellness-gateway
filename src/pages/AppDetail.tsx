import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { apps } from "@/data/apps";
import { categories, getCategoryById } from "@/data/categories";
import { useAppSettings } from "@/hooks/useAppSettings";
import { Switch } from "@/components/ui/switch";
import ProgramCarousel from "@/components/ProgramCarousel";

const AppDetail = () => {
  const { appId } = useParams<{ appId: string }>();
  const navigate = useNavigate();
  const { selectedCategory, getAppSetting, toggleApp, setProgram } = useAppSettings();

  const app = apps.find((a) => a.id === appId);
  const category = getCategoryById(selectedCategory);
  const appSetting = appId ? getAppSetting(appId) : null;

  if (!app || !category || !appSetting) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Application non trouvée</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <header className="pt-12 pb-6 px-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm">Applis</span>
        </button>

        {/* App Info */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-card flex items-center justify-center text-3xl">
            {app.icon}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-foreground">{app.name}</h1>
            <p className="text-muted-foreground">{app.description}</p>
          </div>
        </div>
      </header>

      {/* Activation Toggle */}
      <section className="px-4 mb-8">
        <div className="flex items-center justify-between p-4 bg-card rounded-xl">
          <div>
            <h3 className="font-semibold text-foreground">Activer MOV</h3>
            <p className="text-sm text-muted-foreground">
              Conditionner l'accès à {app.name}
            </p>
          </div>
          <Switch
            checked={appSetting.isActive}
            onCheckedChange={() => toggleApp(app.id)}
            className="data-[state=checked]:bg-move"
          />
        </div>
      </section>

      {/* Category Indicator */}
      <section className="px-4 mb-6">
        <div className={`p-4 rounded-xl bg-gradient-to-r ${category.gradient}`}>
          <div className="flex items-center gap-3">
            <span className="text-2xl">{category.icon}</span>
            <div>
              <h3 className="font-semibold text-white">{category.name}</h3>
              <p className="text-sm text-white/80">{category.tagline}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Program Selection */}
      {appSetting.isActive && (
        <section>
          <ProgramCarousel
            category={category}
            selectedProgramId={appSetting.selectedProgramId}
            onSelectProgram={(programId) => setProgram(app.id, programId)}
          />
        </section>
      )}

      {/* Instructions when not active */}
      {!appSetting.isActive && (
        <section className="px-4">
          <div className="p-6 bg-card rounded-xl text-center">
            <p className="text-muted-foreground">
              Active MOV pour choisir un programme à effectuer avant d'ouvrir {app.name}
            </p>
          </div>
        </section>
      )}
    </div>
  );
};

export default AppDetail;
