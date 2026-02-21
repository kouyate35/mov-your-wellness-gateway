import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Terms = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="px-4 pt-6 pb-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm">Retour</span>
        </button>

        <h1 className="text-3xl font-bold mb-10">Conditions et politiques</h1>
      </header>

      {/* Content */}
      <main className="px-4 pb-16">
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-6">Documents juridiques</h2>

          <ul className="space-y-6">
            <li>
              <span className="underline font-medium">Conditions d'utilisation</span>
              <span className="text-muted-foreground"> : conditions qui régissent l'utilisation de Workout et de ses services pour les particuliers.</span>
            </li>
            <li>
              <span className="underline font-medium">Politique de confidentialité</span>
              <span className="text-muted-foreground"> : pratiques relatives aux informations personnelles que nous collectons auprès de vous ou à votre sujet.</span>
            </li>
            <li>
              <span className="underline font-medium">Conditions de service</span>
              <span className="text-muted-foreground"> : conditions supplémentaires qui régissent votre utilisation de services spécifiques.</span>
            </li>
            <li>
              <span className="underline font-medium">Addendum sur le traitement des données</span>
              <span className="text-muted-foreground"> : garantir que les données à caractère personnel sont traitées de manière appropriée et sécurisée.</span>
            </li>
            <li>
              <span className="underline font-medium">Politique relative aux cookies</span>
              <span className="text-muted-foreground"> : informations sur notre utilisation des cookies et technologies similaires.</span>
            </li>
            <li>
              <span className="underline font-medium">Conditions relatives aux connecteurs et aux actions</span>
              <span className="text-muted-foreground"> : ces conditions régissent la création et l'utilisation de vos connecteurs et actions en relation avec les services de Workout.</span>
            </li>
            <li>
              <span className="underline font-medium">Conditions d'utilisation des crédits de service</span>
              <span className="text-muted-foreground"> : ces conditions régissent les crédits échangeables contre nos services.</span>
            </li>
            <li>
              <span className="underline font-medium">Accord sur les services de Workout</span>
              <span className="text-muted-foreground"> : conditions qui régissent l'utilisation des services de Workout pour les entreprises, les sociétés ou les développeurs.</span>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default Terms;
