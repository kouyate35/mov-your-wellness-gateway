import { useNavigate } from "react-router-dom";
import SplashScreen from "@/components/SplashScreen";

const Splash = () => {
  const navigate = useNavigate();
  return <SplashScreen onComplete={() => navigate("/onboarding-2", { replace: true })} />;
};

export default Splash;
