
# Plan : Modal de demande d'accès aux applications + Détection simulée

## Contexte

L'objectif est de créer une expérience utilisateur professionnelle (style ChatGPT) pour demander l'accès aux applications de l'utilisateur, puis afficher les applications de divertissement détectées.

### Contrainte technique importante

La détection des **vraies applications** installées nécessite un plugin Capacitor natif (par exemple `capacitor-plugin-get-app-info` ou `installed-apps-plugin`). Pour le MVP, nous allons :
1. Créer l'interface complète de demande d'accès
2. Simuler la détection des applications populaires
3. Préparer l'architecture pour intégrer un vrai plugin plus tard

---

## Phase 1 : Créer le modal "Accès aux applications"

### Design (inspiré de ChatGPT - Image 2)

```text
┌─────────────────────────────────────────┐
│                                         │
│  Accès aux applications                 │
│                                         │
│  Pour personnaliser ton expérience Mouv │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│ ⟳  Identifier tes applications         │
│    de divertissement                    │
│    Mouv analyse uniquement les          │
│    applications liées au                │
│    divertissement et aux réseaux        │
│    sociaux (réseaux, vidéos, jeux)      │
│    afin de t'aider à mieux gérer        │
│    ton temps.                           │
│                                         │
│ ⚙  Aucune lecture de contenu           │
│    Mouv ne lit ni tes messages,         │
│    ni tes contenus. Seuls les noms      │
│    des applications et leur             │
│    catégorie sont utilisés.             │
│                                         │
│ 🛡  Tu gardes le contrôle               │
│    Tu peux désactiver cet accès à       │
│    tout moment depuis les réglages      │
│    Mouv.                                │
│                                         │
│                                         │
│                    ┌────────────────┐   │
│                    │ Activer l'accès│   │
│                    └────────────────┘   │
│                                         │
│                    Plus tard            │
│                                         │
└─────────────────────────────────────────┘
```

### Structure du composant

**Nouveau fichier : `src/components/AppAccessModal.tsx`**

- Style : fond sombre avec coins arrondis (rounded-3xl)
- Titre principal en blanc, gras
- Sous-titre en gris clair
- 3 blocs d'information avec icônes minimalistes (outline)
- Titres des blocs en gras blanc
- Textes explicatifs en gris
- Bouton principal "Activer l'accès" (blanc avec texte noir)
- Lien secondaire "Plus tard" (texte gris, discret)

---

## Phase 2 : Système de détection simulée

### Nouveau fichier : `src/hooks/useInstalledApps.ts`

Ce hook va gérer :
1. L'état de permission (a-t-on demandé l'accès ?)
2. La liste des applications "détectées" (simulées pour le MVP)
3. La persistance via localStorage

### Logique de détection simulée

Quand l'utilisateur accepte l'accès :
1. Marquer la permission comme accordée
2. Simuler une liste d'applications catégorisées :
   - **Réseaux sociaux** : Instagram, TikTok, Snapchat, Discord, Reddit, X
   - **Vidéo & streaming** : YouTube, Twitch, Netflix
   - **Messagerie** : WhatsApp, Facebook

### Structure des données

```typescript
interface InstalledApp {
  id: string;
  name: string;
  category: "social" | "video" | "messaging" | "games";
  isInstalled: boolean; // Simulé pour le MVP
}
```

---

## Phase 3 : Intégration dans l'interface

### Modification de `Index.tsx`

1. Vérifier si l'accès a été accordé au premier chargement
2. Si non accordé : afficher le modal `AppAccessModal`
3. Si accordé : afficher la liste des applications détectées

### Modification de `AppList.tsx`

Remplacer l'utilisation de `apps` (liste fixe) par les applications réellement "détectées" via `useInstalledApps`.

---

## Phase 4 : Préparation pour la vraie détection (futur)

### Architecture prête pour Capacitor

Créer un fichier `src/services/appDetectionService.ts` avec :
- Une fonction `detectInstalledApps()` abstraite
- Mode "simulation" par défaut
- Préparé pour intégrer un plugin Capacitor plus tard

### Plugin Capacitor recommandé (pour plus tard)

```bash
npm install capacitor-plugin-get-app-info
```

Ce plugin permet sur Android de :
- Récupérer la liste des apps installées
- Obtenir le nom et l'icône de chaque app
- Lancer des apps

---

## Fichiers à créer/modifier

| Action | Fichier | Description |
|--------|---------|-------------|
| Créer | `src/components/AppAccessModal.tsx` | Modal de demande d'accès style ChatGPT |
| Créer | `src/hooks/useInstalledApps.ts` | Hook pour gérer les apps détectées |
| Créer | `src/services/appDetectionService.ts` | Service abstrait pour la détection |
| Modifier | `src/pages/Index.tsx` | Afficher le modal au premier lancement |
| Modifier | `src/data/apps.ts` | Ajouter les catégories aux apps |
| Modifier | `src/components/AppList.tsx` | Utiliser les apps détectées |

---

## Détails techniques

### AppAccessModal.tsx

- Utilise le composant Dialog de Radix UI existant
- Animation d'entrée fluide
- Fond semi-transparent avec backdrop
- Boutons avec hover states appropriés
- Typographie Inter (déjà utilisée dans le projet)

### useInstalledApps.ts

```typescript
// Clés localStorage
const ACCESS_GRANTED_KEY = "mov-app-access-granted";
const DETECTED_APPS_KEY = "mov-detected-apps";

// États
- hasAccessGranted: boolean
- detectedApps: InstalledApp[]
- isDetecting: boolean

// Méthodes
- grantAccess(): void
- denyAccess(): void
- detectApps(): Promise<void>
```

### Simulation réaliste

Pour rendre la simulation crédible :
- Délai artificiel de 1.5s lors de la "détection"
- Animation de chargement pendant la détection
- Affichage progressif des apps trouvées

---

## Comportement utilisateur attendu

1. L'utilisateur arrive sur l'app pour la première fois
2. Le modal "Accès aux applications" s'affiche
3. L'utilisateur lit les 3 blocs d'information
4. Il clique sur "Activer l'accès"
5. Une animation de détection s'affiche brièvement
6. Les applications sont affichées dans la liste principale
7. Les apps connectées apparaissent aussi dans le menu hamburger

Si l'utilisateur clique "Plus tard" :
- Le modal se ferme
- La liste affiche les apps par défaut (comme actuellement)
- Le modal réapparaîtra au prochain lancement
