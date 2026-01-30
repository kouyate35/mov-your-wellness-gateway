

# Plan de Refonte Totale : Section Routines

## Diagnostic du Probleme

La section "Routines" actuelle casse completement l'esthetique premium de l'application :

| Ce qui marche ailleurs | Ce qui casse dans Routines |
|------------------------|---------------------------|
| Videos en fond, overlay noir | Gradients orange/jaune voyants |
| Texte blanc sur fond sombre | Icones colorees enfantines (Flame, Trophy) |
| Minimalisme, peu de texte | Dashboard surcharge d'infos |
| Pas de bordures colorees | Cards avec bordures orange/yellow |
| Squircles sobres | Emojis dans les categories |

---

## Nouveau Concept : "Journal Minimaliste"

### Philosophie
- **Tout est sombre** : meme palette que le reste (13% lightness)
- **Pas d'icones colorees** : juste du texte et des formes subtiles
- **Respiration** : beaucoup d'espace vide, peu d'elements
- **Videos** : reutiliser les videos d'exercice comme element visuel principal
- **Pas de gamification voyante** : pas de flames, trophees, badges colores

---

## Structure de la Nouvelle Interface

```text
+------------------------------------------+
|                                          |
|  Cette semaine                           |
|                                          |
|  Lun  Mar  Mer  Jeu  Ven  Sam  Dim       |
|  ●    ●    ●    ○    ○    ○    ○         |
|                                          |
|  7 jours consecutifs                     |
|                                          |
+------------------------------------------+
|                                          |
|  +------------------------------------+  |
|  |                                    |  |
|  |  [VIDEO DERNIERE ACTIVITE]         |  |
|  |        (fullscreen card)           |  |
|  |                                    |  |
|  |  Aujourd'hui, 14:32                |  |
|  |  10 Squats · TikTok debloque       |  |
|  |                                    |  |
|  +------------------------------------+  |
|                                          |
|  +-------------+  +-------------+        |
|  | Hier 22:45  |  | Hier 18:20  |        |
|  | 10 Pompes   |  | Flex lat.   |        |
|  +-------------+  +-------------+        |
|                                          |
+------------------------------------------+
```

---

## Elements de Design

### 1. Indicateur de Serie (Streak)
- **Pas d'icone flame** : juste des cercles
- Cercles remplis (●) pour les jours completes
- Cercles vides (○) pour les jours futurs/manques
- Texte sobre : "7 jours consecutifs"
- Couleur : blanc/gris uniquement

### 2. Derniere Activite (Hero Card)
- **Video en fond** de l'exercice realise
- Overlay gradient noir
- Timestamp discret en haut
- Nom du programme + app debloquee
- Meme style que ExploreCard mais en miniature

### 3. Activites Precedentes (Petites Cards)
- Grid de 2 colonnes
- Fond sombre uni (pas de video pour economiser les ressources)
- Timestamp + nom de l'exercice
- Coins tres arrondis (rounded-2xl)

### 4. Statistiques (si necessaire)
- **En bas de page**, tres discret
- Juste des chiffres : "47 sessions · 2h 36min"
- Pas de cards, pas de bordures
- Texte muted-foreground

---

## Implementation Technique

### Fichiers a modifier

| Fichier | Action |
|---------|--------|
| `src/components/ProgressionSection.tsx` | Remplacer completement |

### Composants supprimes
- Toutes les icones Lucide (Flame, Trophy, TrendingUp, Calendar)
- Tous les gradients colores (from-orange-500, from-yellow-500)
- Toutes les bordures colorees (border-orange-500/30)
- Tous les emojis dans les categories

### Nouveaux elements
- Cercles de semaine (simples div avec bg-white ou bg-muted)
- Hero card avec video (reutiliser les assets existants)
- Grid de petites cards grises

---

## Mapping Videos pour Activites

Reutiliser les videos existantes :
```text
squats-10 → exercise-squats.mp4
pompes-10 → exercise-pushups.mp4
gainage → exercise-plank.mp4
lateral-stretch → exercise-lateral-stretch.mp4
forward-fold → exercise-forward-fold.mp4
yoga-arms → exercise-yoga-arms.mp4
box-breathing → exercise-box-breathing.mp4
coherence → exercise-coherence.mp4
pause → exercise-pause.mp4
```

---

## Palette de Couleurs (stricte)

- **Fond principal** : bg-background (13% lightness)
- **Cards** : bg-card ou bg-secondary (12-18% lightness)
- **Texte principal** : text-foreground (blanc 95%)
- **Texte secondaire** : text-muted-foreground (gris 60%)
- **Accents** : AUCUN - tout en niveaux de gris
- **Cercles actifs** : bg-white
- **Cercles inactifs** : bg-muted

---

## Code Simplifie

La nouvelle structure sera beaucoup plus legere :

```text
ProgressionSection
├── WeekIndicator (7 cercles + texte streak)
├── HeroActivityCard (video + overlay + info)
└── PreviousActivitiesGrid (2 colonnes, 4-6 cards max)
```

Pas de :
- Dropdown/toggle semaine/mois
- Graphiques
- Progress bars colorees
- Category breakdown avec emojis
- Icones Lucide decoratives

---

## Resultat Attendu

Une interface qui :
- S'integre parfaitement avec le reste de l'app
- Fait "professionnel" et "premium"
- Utilise les videos comme element visuel principal
- Reste sobre et minimaliste
- Ne surcharge pas l'utilisateur d'informations

