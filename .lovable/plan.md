
# Statistiques d'usage -- Interface premium

## Vision

Creer une page dediee "/usage-stats" accessible depuis le menu hamburger, avec un design premium inspire de TradingView (graphiques financiers elegants, fond sombre, typographie soignee) et des dashboards de sante haut de gamme (cartes de metriques avec mise en page aeree).

## Structure de la page

### 1. Header
- Fleche retour + titre "Statistiques d'usage"
- Style minimal, fond sombre continu

### 2. Hero -- Metrique principale
- Grande valeur "Temps economise" en typographie extra-large (style TradingView avec le prix)
- Variation en pourcentage par rapport a la semaine precedente (fleche verte montante comme TradingView "+2,24%")
- Sous-texte "cette semaine" discret

### 3. Graphique d'activite (style TradingView)
- Graphique en barres/lignes sur 7 jours avec le composant Recharts (deja installe)
- Selecteur de periode en bas : "7J", "1M", "3M", "6M" (pilules comme TradingView "1D 5D 1M 3M")
- Axe Y avec labels discrets, axe X avec jours
- Couleur du graphique : blanc/gris clair sur fond sombre
- Trait fin elegant, pas de grille lourde

### 4. Section "Donnees cles" (style TradingView)
- Liste cle/valeur alignee comme les "Donnees cles" de TradingView
- Lignes :
  - Sessions completees : valeur
  - Moyenne par jour : valeur
  - Meilleur jour : valeur
  - Heure optimale : valeur
- Separateurs fins entre chaque ligne

### 5. Apps les plus defiees
- Classement des 3-5 apps avec icones authentiques, nom, nombre de sessions
- Barre de progression fine style grayscale
- Disposition propre avec espacement genereux

### 6. Impact bien-etre (grille 2x2)
- 4 cartes avec fond subtil (secondary/50)
- Chaque carte : grande valeur numerique + label
  - Squats effectues
  - Minutes respiration
  - Minutes etirement
  - Sessions focus
- Bordure fine, coins arrondis

### 7. Carte Insight
- Encart avec icone TrendingUp
- Message personnalise ("Tu es le plus actif entre 14h-16h")
- Style glassmorphism subtil

## Details techniques

### Fichiers a creer
- `src/pages/UsageStats.tsx` -- Page complete avec toutes les sections

### Fichiers a modifier
- `src/App.tsx` -- Ajouter la route "/usage-stats"
- `src/components/SideMenu.tsx` -- Lier le bouton "Statistiques d'usage" a la navigation vers "/usage-stats"

### Bibliotheques utilisees
- **Recharts** (deja installe) pour le graphique d'activite
- **Lucide icons** pour les icones (ArrowUp, TrendingUp, ArrowLeft, etc.)
- Donnees mock pour le moment (pas de backend necessaire)

### Design tokens
- Fond : `bg-background` (13% lightness)
- Texte principal : `text-foreground` (95% lightness)
- Texte secondaire : `text-muted-foreground` (60% lightness)
- Graphique : traits blancs/gris clair
- Cartes : `bg-secondary/50` avec `border-border/30`
- Selecteur de periode actif : fond blanc texte noir (pilule)
- Aucune couleur vive sauf le vert pour les variations positives
