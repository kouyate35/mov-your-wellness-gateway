import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { toast } from "sonner";
import type { User as SupabaseUser, Session } from "@supabase/supabase-js";

type AuthMode = "signin" | "signup" | "forgot-password";

const Auth = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<AuthMode>("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          navigate("/home");
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        navigate("/home");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const validateForm = () => {
    if (!email) {
      toast.error("Veuillez entrer votre email");
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Veuillez entrer une adresse email valide");
      return false;
    }

    if (mode !== "forgot-password") {
      if (!password) {
        toast.error("Veuillez entrer votre mot de passe");
        return false;
      }
      
      if (password.length < 6) {
        toast.error("Le mot de passe doit contenir au moins 6 caractères");
        return false;
      }
    }
    
    return true;
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    const redirectUrl = `${window.location.origin}/home`;
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          full_name: name,
        }
      }
    });

    setIsLoading(false);

    if (error) {
      if (error.message.includes("already registered")) {
        toast.error("Cet email est déjà utilisé. Essayez de vous connecter.");
      } else {
        toast.error(error.message);
      }
      return;
    }

    if (data.user) {
      toast.success("Compte créé avec succès !");
      navigate("/home");
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setIsLoading(false);

    if (error) {
      if (error.message.includes("Invalid login credentials")) {
        toast.error("Email ou mot de passe incorrect");
      } else {
        toast.error(error.message);
      }
      return;
    }

    if (data.user) {
      toast.success("Connexion réussie !");
      navigate("/home");
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    const redirectUrl = `${window.location.origin}/auth?mode=reset`;
    
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: redirectUrl,
    });

    setIsLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Un email de réinitialisation a été envoyé !");
    setMode("signin");
  };

  const handleSubmit = (e: React.FormEvent) => {
    if (mode === "signup") {
      handleSignUp(e);
    } else if (mode === "signin") {
      handleSignIn(e);
    } else {
      handleForgotPassword(e);
    }
  };

  const getTitle = () => {
    switch (mode) {
      case "signup": return "Créer un compte";
      case "signin": return "Se connecter";
      case "forgot-password": return "Mot de passe oublié";
    }
  };

  const getSubtitle = () => {
    switch (mode) {
      case "signup": return "Rejoignez MOV et reprenez le contrôle de votre temps.";
      case "signin": return "Bon retour parmi nous !";
      case "forgot-password": return "Entrez votre email pour recevoir un lien de réinitialisation.";
    }
  };

  const getButtonText = () => {
    if (isLoading) return "Chargement...";
    switch (mode) {
      case "signup": return "Créer mon compte";
      case "signin": return "Se connecter";
      case "forgot-password": return "Envoyer le lien";
    }
  };

  return (
    <div className="fixed inset-0 overflow-hidden bg-background flex flex-col">
      {/* Header with back button */}
      <div className="px-4 pt-4 pb-2">
        <button
          onClick={() => {
            if (mode === "forgot-password") {
              setMode("signin");
            } else {
              navigate("/onboarding-2");
            }
          }}
          className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-secondary transition-colors"
        >
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center px-6 pb-8 overflow-y-auto">
        {/* Title */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-1">
            {getTitle()}
          </h1>
          <p className="text-sm text-muted-foreground">
            {getSubtitle()}
          </p>
        </div>

        {/* Form */}
        <form 
          onSubmit={handleSubmit}
          className="space-y-3 max-w-sm mx-auto w-full"
        >
          {mode === "signup" && (
            <div className="space-y-1.5">
              <Label htmlFor="name" className="text-muted-foreground text-sm">
                Nom
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Votre nom"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10 h-11 bg-card border-border text-foreground placeholder:text-muted-foreground/50"
                />
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-muted-foreground text-sm">
              Email
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="exemple@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 h-11 bg-card border-border text-foreground placeholder:text-muted-foreground/50"
              />
            </div>
          </div>

          {mode !== "forgot-password" && (
            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-muted-foreground text-sm">
                Mot de passe
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 h-11 bg-card border-border text-foreground placeholder:text-muted-foreground/50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </button>
              </div>
            </div>
          )}

          {mode === "signin" && (
            <div className="text-right">
              <button 
                type="button"
                onClick={() => setMode("forgot-password")}
                className="text-sm text-info hover:underline"
              >
                Mot de passe oublié ?
              </button>
            </div>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-11 bg-primary text-primary-foreground hover:bg-primary/90 font-medium text-sm mt-4"
          >
            {getButtonText()}
          </Button>
        </form>

        {mode !== "forgot-password" && (
          <>
            {/* Divider */}
            <div className="flex items-center gap-4 my-5 max-w-sm mx-auto w-full">
              <div className="flex-1 h-px bg-border" />
              <span className="text-muted-foreground text-xs">ou</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            {/* Social buttons placeholder */}
            <div className="flex justify-center gap-3 max-w-sm mx-auto">
              <button className="w-11 h-11 rounded-full bg-card border border-border flex items-center justify-center hover:bg-secondary transition-colors">
                <svg className="h-4 w-4" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"/>
                </svg>
              </button>
              <button className="w-11 h-11 rounded-full bg-card border border-border flex items-center justify-center hover:bg-secondary transition-colors">
                <svg className="h-4 w-4" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </button>
              <button className="w-11 h-11 rounded-full bg-card border border-border flex items-center justify-center hover:bg-secondary transition-colors">
                <svg className="h-4 w-4" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
              </button>
            </div>

            {/* Switch mode */}
            <p className="text-center text-muted-foreground text-sm mt-6">
              {mode === "signup" ? (
                <>
                  Déjà un compte ?{" "}
                  <button 
                    onClick={() => setMode("signin")}
                    className="text-info hover:underline font-medium"
                  >
                    Se connecter
                  </button>
                </>
              ) : (
                <>
                  Pas encore de compte ?{" "}
                  <button 
                    onClick={() => setMode("signup")}
                    className="text-info hover:underline font-medium"
                  >
                    S'inscrire
                  </button>
                </>
              )}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Auth;
