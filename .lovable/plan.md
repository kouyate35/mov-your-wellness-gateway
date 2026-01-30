
# Plan de Refonte : Explorer + Routines

## Vue d'ensemble

Ce plan couvre deux modifications majeures :
1. **Repenser completement la page Explorer** - Abandonner le bento grid pour une approche "game changer" plus immersive
2. **Creer la section Routines** - Interface affichant uniquement les apps connectees avec barres de temps d'usage et detail premium

---

## 1. Nouvelle Page Explorer - Concept "Immersive Feed"

### Probleme actuel
Le bento grid avec cartes de differentes tailles ne fonctionne pas visuellement. Il manque d'impact et ressemble trop a une simple grille.

### Nouveau concept : "Fullscreen Vertical Swipe"
Inspire des stories Instagram/TikTok mais pour les exercices. Un format vertical immersif ou chaque programme prend tout l'ecran.

```text
+------------------------------------------+
|                                          |
|         VIDEO EXERCICE                   |
|         (Fullscreen)                     |
|                                          |
|     [Overlay gradient bottom]            |
|                                          |
|  +---------+                             |
|  | MOVE    |  <- Badge category          |
|  +---------+                             |
|                                          |
|  SQUATS                                  |
|  ~~~~~~~~                                |
|  30 secondes · Renforce tes jambes       |
|                                          |
|       [ Commencer ]                      |
|                                          |
+------------------------------------------+
|  o   o   o   o   <- Navigation dots      |
+------------------------------------------+
```

### Structure
- Scroll vertical snap : chaque swipe = nouveau programme
- 12 programmes defileraient (3 par categorie x 4 categories)
- Video fullscreen en background
- Badge category en haut a gauche avec couleur (vert MOVE, orange FLEX, bleu BREATH, violet FOCUS)
- Bouton CTA "Commencer" pour lancer le challenge AR
- Effet parallax sur le swipe

### Fichiers a modifier
| Fichier | Action |
|---------|--------|
| `src/pages/Explore.tsx` | Remplacer completement par le nouveau design immersif |
| `src/components/BentoCard.tsx` | Supprimer (plus utilise) |

### Nouveau composant : ExploreCard
```text
Props:
- program: Program (id, name, duration, description)
- category: Category (id, name, color)
- videoSrc: string
- onStart: () => void

Structure:
- Container fullscreen h-screen snap-start
- Video absolute inset-0
- Gradient overlay from-transparent to-black/80
- Category badge (rounded-full, bg-category-color)
- Title + description + duration
- CTA button
```

---

## 2. Section Routines - Apps Connectees avec Usage

### Concept
La section "Routines" (onglet 2 de la home) affiche uniquement les applications connectees a Workout, avec une barre de progression montrant le temps d'usage (comme Image 2).

### Structure de la liste
```text
+------------------------------------------+
|                                          |
|  +------+  TikTok               >        |
|  | icon |  ==================== 5h 19min |
|  +------+                                |
|                                          |
|  +------+  Instagram            >        |
|  | icon |  ========             2h 02min |
|  +------+                                |
|                                          |
+------------------------------------------+
```

### Details
- Icone app squircle avec badge de connexion (check)
- Nom de l'app
- Barre de progression grise (pourcentage du temps max)
- Temps d'usage a droite
- Chevron pour naviguer vers le detail

### Nouveau composant : RoutinesList
```text
Props:
- connectedApps: AppData[] (filtre sur isActive=true)

Pour chaque app:
- Icon + check badge
- Name
- Progress bar (gris sombre, remplissage gris clair)
- Usage time (simule pour l'instant)
- Chevron navigation
```

---

## 3. Interface Detail Routine (au clic sur une app)

### Concept (inspire de l'Image 3)
Quand on clique sur une app dans Routines, on ouvre une interface premium avec :
- Header video fullscreen du programme/categorie selectionne
- Player controls (play/pause, timeline)
- Titre du programme
- Description
- Section "My Progress" avec graphique

### Structure
```text
+------------------------------------------+
|  <                              ...      |
|                                          |
|         [VIDEO EXERCICE]                 |
|         (Header fullscreen 60%)          |
|             [II]                          |
|                                          |
|    >   0:00 -------------------- 5:40    |
+------------------------------------------+
|                                          |
|  Concentration Curl            O 15 min  |
|  ~~~~~~~~~~~~~~~~~~                      |
|  Seated Dumbbell                         |
|                                          |
|  Description du programme...             |
|                                          |
+------------------------------------------+
|                                          |
|  My Progress                    Edit +   |
|  47.5kg                                  |
|                                          |
|  [=====GRAPH=====]                       |
|  Mon  Wed  Thr  Sun                      |
|                                          |
+------------------------------------------+
```

### Fichiers a creer
| Fichier | Description |
|---------|-------------|
| `src/pages/RoutineDetail.tsx` | Page detail d'une routine app |
| `src/components/RoutinesList.tsx` | Liste des apps connectees avec usage |

---

## 4. Integration dans Index.tsx

### Modification du renderTabContent
Remplacer le `EmptySection` pour l'onglet "Routines" par le nouveau composant `RoutinesList` qui filtre les apps sur `isActive === true`.

```text
case 1: // Routines
  return <RoutinesList apps={connectedApps} />;
```

### Logique de filtrage
```text
const connectedApps = useMemo(() => {
  return availableApps.filter(app => activeApps[app.id] === true);
}, [availableApps, activeApps]);
```

---

## 5. Donnees simulees pour l'usage

En attendant l'integration Android reelle, on simule le temps d'usage :
```text
const mockUsageData: Record<string, number> = {
  tiktok: 319, // 5h 19min en minutes
  instagram: 122, // 2h 02min
  youtube: 180,
  // etc.
};
```

---

## Ordre d'Implementation

1. **Creer RoutinesList** - Composant liste des apps connectees avec barres d'usage
2. **Integrer RoutinesList dans Index.tsx** - Remplacer EmptySection pour onglet Routines
3. **Creer RoutineDetail** - Page detail avec video header et progression
4. **Ajouter route /routine/:appId** - Dans App.tsx
5. **Refaire Explore.tsx** - Design immersif vertical swipe fullscreen
6. **Supprimer BentoCard.tsx** - Plus necessaire

---

## Details Techniques

### ExploreCard - Animations
- Transition fade-in/out sur le swipe
- Parallax sur le texte (bouge plus lentement que la video)
- Scale effect sur le bouton au hover

### RoutinesList - Progress Bar
```text
// Calcul pourcentage (max 6h = 360min)
const maxMinutes = 360;
const percentage = Math.min((usageMinutes / maxMinutes) * 100, 100);

// Affichage
<div className="h-1.5 bg-muted rounded-full flex-1">
  <div 
    className="h-full bg-muted-foreground/50 rounded-full"
    style={{ width: `${percentage}%` }}
  />
</div>
```

### RoutineDetail - Video Player
- Video autoplay loop muted
- Overlay avec gradient
- Controls: play/pause center, timeline bottom
- Back button top-left
- Options menu top-right

---

## Assets existants a reutiliser
- `exercise-squats.mp4`, `exercise-pushups.mp4`, etc. pour les videos programmes
- `category-move-video.mp4`, etc. pour les headers categories
- Images `.jpg` comme fallback poster
