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

      {/* App Connection Card - Horizontal layout like ChatGPT */}
      <section className="px-4 pt-4">
        <div className="flex items-start gap-4">
          {/* Squircle icon with real app background */}
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center shrink-0 overflow-hidden [&>svg]:w-20 [&>svg]:h-20">
            {appIconComponentsLarge[app.id] || (
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <span className="text-4xl">{app.icon}</span>
              </div>
            )}
          </div>
          
          {/* App name + Connect button */}
          <div className="flex flex-col gap-2 pt-1">
            <h1 className="text-2xl font-bold text-foreground">{app.name}</h1>
            
            {/* Connect button - only show if not connected */}
            {!isConnected && (
              <button
                onClick={() => toggleApp(app.id)}
                className="px-5 py-2 bg-white text-black text-sm font-medium rounded-full hover:bg-white/90 transition-colors w-fit"
              >
                Connecter
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Connected state content */}
      {isConnected && (
        <>
          {/* Activation Toggle */}
          <section className="px-4 mt-6 mb-8">
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
    </div>
  );
};

export default AppDetail;