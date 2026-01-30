
# Plan de Correction Routines + Développement Programmes

## Partie 1 : Correction des badges d'apps dans Routines

### Problèmes identifiés (screenshots)

| Problème | Cause |
|----------|-------|
| Badge trop gros | `w-5 h-5` au lieu de `w-4 h-4` |
| Position maladroite | `-bottom-1 -left-1` crée un chevauchement |
| Ring de sélection disgracieux | `ring-2 ring-offset-2` = double bordure |
| Effet confus "deux blocs" | Scale + opacity mal gérés |

### Solution : Aligner sur le style AppList

Le composant `AppList` a déjà un badge de connexion élégant et discret :
```text
- Badge plus petit (w-4 h-4)
- Position naturelle (-bottom-0.5 -left-0.5)
- Bordure background pour intégration
- Pas de ring, juste une légère opacité pour non-sélectionné
```

### Fichier à modifier
`src/components/ProgressionSection.tsx`

### Nouveau design du sélecteur d'apps

```text
+------------------------------------------+
|                                          |
|  [TikTok] [Insta] [Snap] [Discord]       |
|     ✓        ✓       ✓       ✓           |
|                                          |
+------------------------------------------+

- Taille icône : w-12 h-12 (au lieu de md qui est w-12)
- Badge : w-4 h-4, -bottom-0.5 -left-0.5
- Sélection : juste scale-110 + légère ombre
- Non sélectionné : opacity-50
- PAS de ring/outline de sélection
```

---

## Partie 2 : Section Programmes

### Objectif
Créer une interface "Programmes" qui affiche les 12 programmes organisés par catégorie, avec un design cohérent et premium.

### Concept : Liste par catégorie avec preview vidéo

Inspiré des autres sections mais adapté pour une navigation par catégorie :

```text
+------------------------------------------+
|                                          |
|  MOVE                                    |
|  Corps & Mobilité                        |
|                                          |
|  +-------+ +-------+ +-------+           |
|  |       | |       | |       |           |
|  | VIDEO | | VIDEO | | VIDEO |  <- scroll|
|  |       | |       | |       |     horiz |
|  |Squats | |Pompes | |Gainage|           |
|  +-------+ +-------+ +-------+           |
|                                          |
|  FLEX                                    |
|  Souplesse & Articulation                |
|                                          |
|  +-------+ +-------+ +-------+           |
|  | VIDEO | | VIDEO | | VIDEO |           |
|  |Lateral| |Pince  | |Yoga   |           |
|  +-------+ +-------+ +-------+           |
|                                          |
|  BREATH                                  |
|  ...                                     |
|                                          |
+------------------------------------------+
```

### Structure des cartes programme

```text
+-------------------+
|                   |
|  [VIDEO LOOP]     |  <- aspect-[3/4]
|                   |
|  Gradient bottom  |
|                   |
|  10 Squats        |
|  30 sec           |
+-------------------+
```

### Design sobre et professionnel

- **Titres catégorie** : Texte simple, pas de badges colorés
- **Cartes** : Fond vidéo, overlay gradient, texte blanc
- **Scroll horizontal** par catégorie
- **Pas d'icônes décoratives**
- **Palette** : Uniquement grayscale + blanc

### Fichier à créer
`src/components/ProgramsSection.tsx`

### Intégration
Remplacer `EmptySection` pour l'onglet Programmes dans `Index.tsx`

---

## Partie 3 : Réorganisation de l'ordre dans ProgressionSection

Selon les screenshots, l'ordre actuel n'est pas optimal. Nouvel ordre :

1. `Cette semaine` + cercles jours
2. Applications connectées (horizontal scroll)
3. `X jours consécutifs`
4. Hero card vidéo
5. Grille activités précédentes
6. Stats footer

---

## Détails techniques

### Badge de connexion (style unifié)

```text
<div className="absolute -bottom-0.5 -left-0.5 w-4 h-4 bg-background rounded-full flex items-center justify-center">
  <div className="w-3.5 h-3.5 bg-white rounded-full flex items-center justify-center">
    <Check className="w-2 h-2 text-gray-800" strokeWidth={3} />
  </div>
</div>
```

### Effet de sélection simplifié

```text
// Sélectionné
className="scale-110 shadow-lg"

// Non sélectionné  
className="opacity-40 hover:opacity-70"

// Transition
className="transition-all duration-200"
```

### Programme Card

```text
<div className="relative w-36 aspect-[3/4] rounded-2xl overflow-hidden shrink-0">
  <video src={videoSrc} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" />
  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
  <div className="absolute bottom-3 left-3 right-3">
    <p className="text-sm font-medium text-white">{name}</p>
    <p className="text-xs text-white/60">{duration}</p>
  </div>
</div>
```

---

## Ordre d'implémentation

1. **Corriger ProgressionSection** - Refaire le sélecteur d'apps avec badges propres
2. **Créer ProgramsSection** - Nouvelle interface programmes par catégorie
3. **Intégrer dans Index.tsx** - Remplacer EmptySection

---

## Mapping vidéos pour programmes

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

## Résultat attendu

- **Routines** : Sélecteur d'apps discret et élégant, cohérent avec AppList
- **Programmes** : Liste organisée par catégorie avec preview vidéo
- **Cohérence visuelle** : Même esthétique sombre et minimaliste partout
