
# Plan : Ajout FOCUS aux Programmes + Section Insights Premium

## Partie 1 : Catégorie FOCUS dans Programmes

### Situation actuelle
Les 3 programmes FOCUS (intention, timer, affirmation) n'ont pas de vidéos individuelles. Actuellement :
- `category-focus-video.mp4` existe (vidéo générique de la catégorie)
- `ProgramsSection.tsx` exclut FOCUS explicitement (ligne 87)
- `Explore.tsx` utilise `categoryFocusVideo` comme fallback

### Solution proposée
Plutôt que de créer des vidéos (impossible dans ce contexte), utiliser la vidéo générique FOCUS comme fond pour les 3 cartes, avec des variations visuelles subtiles :

```text
+-------+ +-------+ +-------+
|       | |       | |       |
| VIDEO | | VIDEO | | VIDEO |  <- même vidéo focus mais overlay différent
|       | |       | |       |
|Intent.| |Timer  | |Affirm.|
+-------+ +-------+ +-------+
```

### Fichiers à modifier

| Fichier | Modification |
|---------|--------------|
| `src/components/ProgramsSection.tsx` | Ajouter mapping vidéo FOCUS + inclure catégorie |

### Code clé
```typescript
// Ajouter au videoMap
"intention": "/src/assets/category-focus-video.mp4",
"timer": "/src/assets/category-focus-video.mp4",
"affirmation": "/src/assets/category-focus-video.mp4",

// Retirer le filtre exclusion FOCUS
const categoriesWithVideos = categories; // Toutes les catégories maintenant
```

---

## Partie 2 : Section Insights Premium

### Concept : "Journal de Bien-être Digital"

L'onglet Insights doit offrir une vue analytique claire et premium sur l'usage des apps et l'impact de Workout.

### Structure proposée

```text
+------------------------------------------+
|                                          |
|  Temps économisé                         |
|  2h 34min cette semaine                  |
|  ↑ 45% vs la semaine dernière            |
|                                          |
+------------------------------------------+
|                                          |
|  +------------------------------------+  |
|  |                                    |  |
|  |  [GRAPHIQUE MINIMALISTE]           |  |
|  |  Courbe temps d'écran 7 jours      |  |
|  |                                    |  |
|  +------------------------------------+  |
|                                          |
+------------------------------------------+
|                                          |
|  Apps les plus défiées                   |
|                                          |
|  TikTok     ████████████░  32 sessions   |
|  Instagram  ████████░░░░░  21 sessions   |
|  Snapchat   ████░░░░░░░░░  12 sessions   |
|                                          |
+------------------------------------------+
|                                          |
|  Impact bien-être                        |
|                                          |
|  +-------------+ +-------------+         |
|  | 147         | | 23          |         |
|  | Squats      | | Minutes     |         |
|  | effectués   | | respiration |         |
|  +-------------+ +-------------+         |
|                                          |
+------------------------------------------+
|                                          |
|  Meilleur moment                         |
|  Tu es plus actif à 14h-16h              |
|                                          |
+------------------------------------------+
```

### Principes de design

1. **Minimalisme total** : Pas de graphiques complexes, juste des barres horizontales simples
2. **Palette grayscale** : Uniquement noir/blanc/gris, pas de couleurs d'accent
3. **Typographie claire** : Grands chiffres pour les métriques clés
4. **Hiérarchie visuelle** : Les infos les plus importantes en haut
5. **Pas d'icônes décoratives** : Juste du texte et des formes géométriques

### Composants Insights

| Composant | Description |
|-----------|-------------|
| `TimeSavedHero` | Grand chiffre "temps économisé" + comparaison semaine |
| `WeeklyChart` | Courbe minimaliste 7 jours (barres verticales grises) |
| `TopAppsRanking` | Top 3 apps avec barres de progression horizontales |
| `WellnessImpact` | Grid 2 colonnes avec métriques (squats, minutes respiration) |
| `BestMoment` | Insight sur l'heure la plus active |

### Fichier à créer
`src/components/InsightsSection.tsx`

### Intégration
Remplacer `EmptySection` pour l'onglet Insights dans `Index.tsx` (case 3)

---

## Partie 3 : Mise à jour des autres fichiers

### ProgressionSection.tsx
Ajouter les programmes FOCUS au videoMap si utilisés dans l'historique

### Explore.tsx
Déjà configuré avec fallback FOCUS (aucun changement nécessaire)

---

## Structure finale InsightsSection

```text
InsightsSection
├── TimeSavedHero (chiffre principal + tendance)
├── WeeklyActivityChart (7 barres verticales)
├── TopChallengedApps (3 apps avec progress bars)
├── WellnessImpactGrid (2x2 stats cards)
└── BestMomentInsight (texte simple)
```

---

## Palette stricte pour Insights

- **Fond** : `bg-background` (13% lightness)
- **Cards** : `bg-secondary` (légèrement plus clair)
- **Texte principal** : `text-foreground` (blanc)
- **Texte secondaire** : `text-muted-foreground` (gris)
- **Barres de progression** : `bg-foreground` (blanc) sur `bg-muted` (gris foncé)
- **Aucune couleur d'accent** : Pas de vert, bleu, violet, etc.

---

## Données mockées pour Insights

```typescript
const mockInsights = {
  timeSaved: { 
    minutes: 154, 
    percentChange: 45 
  },
  weeklyActivity: [3, 5, 4, 6, 2, 0, 0], // sessions par jour
  topApps: [
    { id: "tiktok", sessions: 32 },
    { id: "instagram", sessions: 21 },
    { id: "snapchat", sessions: 12 },
  ],
  wellnessStats: {
    totalSquats: 147,
    breathMinutes: 23,
    stretchMinutes: 18,
    focusSessions: 9,
  },
  bestHour: "14h-16h",
};
```

---

## Ordre d'implémentation

1. **Modifier ProgramsSection.tsx** : Ajouter FOCUS au videoMap + retirer le filtre
2. **Créer InsightsSection.tsx** : Nouvelle interface analytics minimaliste
3. **Modifier Index.tsx** : Remplacer EmptySection par InsightsSection pour case 3

---

## Résultat attendu

- **Programmes** : 4 catégories complètes (MOVE, FLEX, BREATH, FOCUS)
- **Insights** : Dashboard analytique premium et minimaliste
- **Cohérence** : Même esthétique sombre partout
