

# Plan de Refonte : MOV devient WORKOUT + Nouvelle Page Explorer

## Apercu des Changements

Ce plan couvre trois modifications majeures :
1. Renommer l'application de "Mov" a "Workout"
2. Afficher les 4 onglets (Applis, Routines, Programmes, Insights) sans scroll horizontal
3. Creer une nouvelle page "Explorer" avec un layout de type "bento grid" (cartes en bulles avec animations d'exercices)

---

## 1. Renommage : MOV vers WORKOUT

### Fichiers a modifier

| Fichier | Changement |
|---------|-----------|
| `src/pages/Index.tsx` | Titre header : "Mov" devient "Workout" |
| `src/pages/Index.tsx` | Tagline : "Bouger avant de scroller" devient "Work avant de scroll" ou similaire |
| `src/pages/Onboarding.tsx` | Alt text image |
| `src/pages/OnboardingStep2.tsx` | "MOV vous demande" devient "WORKOUT vous demande" |
| `src/components/SideMenu.tsx` | Alt text du logo |
| `src/components/AppIcons.tsx` | Renommer `MovIcon` en `WorkoutIcon`, alt text |
| `src/assets/mov-icon.png` | Idealement remplacer par un nouveau logo (ou garder en attendant) |
| `index.html` | Titre de la page |

### Exemple de changement (Index.tsx header)

```text
Avant:  M<span>ov</span>
Apres:  W<span>orkout</span>
```

---

## 2. Section Tabs Sans Scroll

### Probleme actuel
Les 4 onglets (Applis, Routines, Programmes, Insights) sont dans un container `overflow-x-auto` avec `gap-2` et `px-5 py-2.5` - ils debordent et necessitent un scroll horizontal sur mobile.

### Solution
Modifier le composant `SectionTabs.tsx` pour :
- Utiliser `justify-between` au lieu de `gap-2`
- Reduire le padding des boutons (`px-3 py-2` au lieu de `px-5 py-2.5`)
- Ajuster la taille de police (`text-xs` au lieu de `text-sm`)
- Supprimer `overflow-x-auto`

### Structure CSS resultante

```text
Container: flex justify-between w-full px-4
Boutons:   px-3 py-2 text-xs font-medium rounded-full
```

Cela garantit que les 4 onglets occupent toute la largeur et sont toujours visibles.

---

## 3. Nouvelle Page Explorer avec Bento Grid

### Concept
Une page inspiree de l'image 4 (reference sante) avec des cartes de differentes tailles disposees en grille organique ("bento box"). Chaque carte represente une categorie ou un programme avec une video d'exercice en boucle.

### Structure de la page

```text
+------------------------------------------+
|  Header: "Explorer"                      |
+------------------------------------------+
|                                          |
|  +--------+  +------------------+        |
|  |        |  |                  |        |
|  | MOVE   |  |      FLEX        |        |
|  | (video)|  |     (video)      |        |
|  +--------+  +------------------+        |
|                                          |
|  +------------------+  +--------+        |
|  |                  |  |        |        |
|  |     BREATH       |  | FOCUS  |        |
|  |     (video)      |  |(video) |        |
|  +------------------+  +--------+        |
|                                          |
|  +--------+  +--------+  +--------+      |
|  | Squats |  | Pompes |  | Box    |      |
|  |        |  |        |  | Breath |      |
|  +--------+  +--------+  +--------+      |
|                                          |
+------------------------------------------+
```

### Fichiers a creer

| Fichier | Description |
|---------|-------------|
| `src/pages/Explore.tsx` | Nouvelle page avec bento grid |
| `src/components/BentoCard.tsx` | Composant de carte avec video animee |

### Caracteristiques des cartes Bento

- **Pas de texte lourd** : Juste un petit badge glassmorphism avec le nom
- **Videos en boucle** : Reutiliser les videos existantes des categories/programmes
- **Tailles variees** : CSS Grid avec `grid-row-span` et `grid-col-span` differents
- **Coins arrondis** : Aspect "bulle" avec `rounded-3xl`
- **Au clic** : Navigation vers le detail de la categorie/programme

### Integration dans l'application

1. Ajouter la route `/explore` dans `App.tsx`
2. Connecter le bouton "Explorer" du `SideMenu` a cette nouvelle page
3. Style de fond sombre avec gradient subtil (comme l'image 3)

---

## Details Techniques

### BentoCard Component

```text
Props:
- id: string (categorie ou programme)
- name: string
- videoSrc: string
- size: "small" | "medium" | "large"
- onClick: () => void

Styles:
- Container: relative overflow-hidden rounded-3xl
- Video: absolute inset-0 object-cover autoplay loop muted
- Badge: absolute top-3 left-3, backdrop-blur, bg-white/20
```

### CSS Grid pour Bento Layout

```text
grid-template-columns: repeat(4, 1fr)
grid-auto-rows: 100px

Carte large:  col-span-2 row-span-2
Carte medium: col-span-2 row-span-1
Carte small:  col-span-1 row-span-1
```

---

## Ordre d'Implementation

1. **Renommage MOV vers WORKOUT** (tous les fichiers)
2. **Modification SectionTabs** (affichage sans scroll)
3. **Creation BentoCard component**
4. **Creation page Explore**
5. **Integration route et navigation**

