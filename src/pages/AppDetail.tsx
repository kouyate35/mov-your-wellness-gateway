import { useParams, useNavigate } from "react-router-dom";
import { ChevronRight, Menu } from "lucide-react";
import { apps } from "@/data/apps";
import { categories, getCategoryById } from "@/data/categories";
import { useAppSettings } from "@/hooks/useAppSettings";
import { Switch } from "@/components/ui/switch";
import ProgramCarousel from "@/components/ProgramCarousel";
import {
  TikTokIcon,
  InstagramIcon,
  YouTubeIcon,
  XIcon,
  SnapchatIcon,
  FacebookIcon,
  WhatsAppIcon,
  NetflixIcon,
  RedditIcon,
  TwitchIcon,
  DiscordIcon,
} from "@/components/AppIcons";

// Map app IDs to their icon components for detail page (larger size)
const appIconComponentsLarge: Record<string, React.ReactNode> = {
  tiktok: <TikTokIcon />,
  instagram: <InstagramIcon />,
  youtube: <YouTubeIcon />,
  twitter: <XIcon />,
  snapchat: <SnapchatIcon />,
  facebook: <FacebookIcon />,
  whatsapp: <WhatsAppIcon />,
  netflix: <NetflixIcon />,
  reddit: <RedditIcon />,
  twitch: <TwitchIcon />,
  discord: <DiscordIcon />,
};

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

  const isConnected = appSetting.isActive;

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header - ChatGPT style with hamburger + breadcrumb */}
      <header className="pt-6 pb-4 px-4">
        <div className="flex items-center gap-3">
          {/* Hamburger menu with blue dot */}
          <button className="relative p-1">
            <Menu className="w-5 h-5 text-muted-foreground" />
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-blue-500 rounded-full" />
          </button>
          
          {/* Breadcrumb: Applis > AppName */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
          >
            <span className="text-base font-medium">Applis</span>
          </button>
          
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
          
          <span className="text-base font-medium text-muted-foreground">{app.name}</span>
        </div>
      </header>

      {/* App Connection Card - ChatGPT style */}
      <section className="px-4 py-8">
        <div className="flex flex-col items-center text-center">
          {/* Large circular icon on white background */}
          <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center mb-6 shadow-sm">
            <div className="w-12 h-12 text-black flex items-center justify-center [&>svg]:w-12 [&>svg]:h-12">
              {appIconComponentsLarge[app.id] || <span className="text-4xl">{app.icon}</span>}
            </div>
          </div>
          
          {/* App name */}
          <h1 className="text-3xl font-bold text-foreground mb-4">{app.name}</h1>
          
          {/* Connect button - only show if not connected */}
          {!isConnected && (
            <button
              onClick={() => toggleApp(app.id)}
              className="px-8 py-3 bg-white text-black font-medium rounded-full hover:bg-white/90 transition-colors"
            >
              Connecter
            </button>
          )}
        </div>
      </section>

      {/* Connected state content */}
      {isConnected && (
        <>
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
          <section>
            <ProgramCarousel
              category={category}
              selectedProgramId={appSetting.selectedProgramId}
              onSelectProgram={(programId) => setProgram(app.id, programId)}
            />
          </section>
        </>
      )}

      {/* Not connected state - simple message */}
      {!isConnected && (
        <section className="px-4 mt-4">
          <p className="text-center text-muted-foreground text-sm">
            Connecte {app.name} à Mov
          </p>
        </section>
      )}
    </div>
  );
};

export default AppDetail;