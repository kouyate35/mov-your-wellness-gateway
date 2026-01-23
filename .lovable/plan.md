
# Plan de correction - Icones et Modal de connexion

## Problemes identifies

### 1. Icones sans couleurs de fond
**Probleme actuel :**
- Les icones sur la page detail (images 1-3) s'affichent en blanc/monochrome
- Le composant `AppIcons.tsx` utilise `fill="currentColor"` sans fond
- La page `AppDetail.tsx` affiche les icones sans leur `bgColor`

**Correction :**
- Modifier `AppIcons.tsx` pour que chaque icone inclue son fond authentique (TikTok = fond noir, Instagram = degrade, etc.)
- Creer des variantes "full" avec fond integre pour l'affichage en grand

### 2. Modal de connexion style ChatGPT x Booking
**Nouveau composant a creer :**
- Un modal qui s'ouvre au clic sur "Connecter"
- En-tete avec degrade (style ChatGPT)
- Deux icones : [App] | [MOV]
- Titre : "Connecter [AppName] a MOV"
- Sous-titre explicatif
- Boutons "Connecter" et "Annuler"
- Sections d'explication (donnees, vie privee, etc.)

---

## Fichiers a modifier/creer

### 1. `src/components/AppIcons.tsx`
- Modifier chaque composant d'icone pour inclure le fond authentique
- Exemple TikTok : fond noir avec logo blanc
- Exemple Instagram : fond degrade rose/violet/orange avec logo blanc
- Exemple WhatsApp : fond vert avec logo blanc
- etc.

### 2. `src/components/ConnectAppModal.tsx` (nouveau fichier)
- Modal style ChatGPT x Booking
- Structure :
  - Header avec degrade bleu/violet
  - Zone icones : [Icone App] | [Icone MOV]
  - Titre : "Connecter {app.name} a MOV"
  - Sous-titre : "MOV utilise {app.name} pour comprendre vos habitudes et personnaliser votre programme."
  - Boutons : "Connecter" (blanc) | "Annuler" (transparent)
  - Sections scrollables :
    - "Utilisation des donnees par MOV"
    - "Vous avez la main"
    - "Donnees partagees avec cette appli"

### 3. `src/pages/AppDetail.tsx`
- Importer et utiliser le nouveau modal
- Gerer l'etat d'ouverture du modal (`showConnectModal`)
- Au clic sur "Connecter" : ouvrir le modal au lieu de connecter directement
- Correction de l'affichage des icones pour utiliser les versions avec fond

### 4. `src/assets/mov-icon.png` (copie du fichier upload)
- Copier l'icone MOV fournie par l'utilisateur (image 7)
- Utiliser dans le modal de connexion

---

## Details techniques

### Structure du modal ConnectAppModal

```text
+----------------------------------------+
|  [X]                                   |  (bouton fermer)
|                                        |
|   [degrade bleu/violet en haut]        |
|                                        |
|     [ICON APP]  |  [ICON MOV]          |
|                                        |
|     Connecter Instagram                |
|           a MOV                        |
|                                        |
|   MOV utilise Instagram pour...        |
|                                        |
|   [Connecter]    [Annuler]             |
|                                        |
+----------------------------------------+
|                                        |
|  Utilisation des donnees par MOV       |
|  MOV peut analyser certains signaux... |
|                                        |
|  Vous avez la main                     |
|  MOV respecte toujours vos...          |
|                                        |
|  Donnees partagees avec cette appli    |
|  En connectant Instagram a MOV...      |
|                                        |
+----------------------------------------+
```

### Icones avec fond integre

Pour chaque app, creer un composant qui inclut :
- Le conteneur avec `bgColor` (rounded-xl ou rounded-2xl selon taille)
- L'icone SVG en `fill="white"` ou la couleur appropriee

Exemple pour TikTok :
```tsx
export const TikTokIconWithBg = ({ size = "md" }) => (
  <div className={`${sizeClasses[size]} bg-black rounded-xl flex items-center justify-center`}>
    <svg ... fill="white" />
  </div>
);
```

### Textes adaptes pour MOV

**Titre :**
"Connecter {AppName} a MOV"

**Sous-titre :**
"MOV utilise {AppName} pour mieux comprendre vos habitudes numeriques et vous proposer un programme de bien-etre adapte."

**Section "Utilisation des donnees" :**
- Identifier votre niveau d'exposition aux contenus
- Comprendre vos rythmes d'utilisation
- Adapter votre programme MOV (Move, Breath, Focus)
- Aucun contenu prive n'est publie ou modifie

**Section "Vous avez la main" :**
- Vous pouvez deconnecter {AppName} a tout moment
- Vos preferences sont respectees
- MOV n'utilise les donnees que pour ameliorer votre experience

**Section "Donnees partagees" :**
- Informations generales d'utilisation (frequence, types d'interactions)
- Donnees necessaires a la personnalisation de votre programme
- Utilisees conformement a la Politique de confidentialite de MOV

---

## Ordre d'implementation

1. Copier l'icone MOV dans src/assets/
2. Modifier `AppIcons.tsx` pour ajouter les variantes avec fond
3. Creer `ConnectAppModal.tsx` avec le design ChatGPT
4. Modifier `AppDetail.tsx` pour utiliser le modal et les icones corrigees
