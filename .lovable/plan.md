
# Refonte du Challenge Modal - Style TradingView

## Concept
Remplacer le modal actuel (liste de challenges avec checkboxes) par une carte premium qui remonte du bas de l'ecran, style TradingView. Chaque defi s'affiche individuellement en plein ecran avec une image hero, du texte descriptif, et un bouton d'action. Une fleche permet de naviguer entre les deux defis.

## Structure du nouveau modal

```text
+----------------------------------+
|  [Image hero plein cadre]     -> |  <- fleche pour passer au defi suivant
|  (image sportive adaptee au      |
|   type de defi, haute qualite)   |
|                                  |
+----------------------------------+
|                                  |
|  Titre du defi (gras, grand)     |
|                                  |
|  Description detaillee du defi   |
|  expliquant en quoi il consiste  |
|  et comment il fonctionne.       |
|                                  |
|  [====  Choisir ce defi  ====]   |  <- bouton blanc arrondi
|                                  |
|         Renoncer                 |
+----------------------------------+
```

## Modifications prevues

### 1. Refonte complete de ChallengeModal.tsx
- Supprimer la liste de challenges avec checkboxes
- Creer un affichage "une carte a la fois" avec un index courant (0 = Defi du matin, 1 = Defi de duree)
- En haut : zone image hero (environ 45% de la hauteur) avec une image sportive generee pour chaque defi
  - Defi du matin : image d'un lever de soleil / reveil sportif
  - Defi de duree : image d'un athlete en action / chronometre
- En haut a droite de l'image : fleche (icone ChevronRight) pour passer au defi suivant, au lieu de la croix de TradingView
- Sous l'image : titre en gras, description detaillee
- Bouton "Choisir ce defi" (blanc, arrondi, style TradingView "Faites un essai gratuit")
- Lien "Renoncer" en dessous

### 2. Animation d'entree
- Le modal remonte du bas avec une animation slide-in-from-bottom fluide
- L'animation de flammes (FireEmojiAnimation) reste active et tombe depuis le haut de l'ecran par-dessus le modal

### 3. Navigation entre defis
- Clic sur la fleche : transition horizontale fluide (slide) vers le defi suivant
- Quand on est au dernier defi, la fleche ramene au premier (boucle)
- Indicateur de pagination discret (2 petits points en bas de l'image)

### 4. Assets images
- Creer 2 images hero de haute qualite pour chaque type de defi, stockees dans src/assets/

## Details techniques

### Fichiers modifies
- **src/components/ChallengeModal.tsx** : Refonte complete du composant
  - useState pour `currentIndex` (0 ou 1)
  - Transition CSS entre les slides (transform translateX avec transition-all)
  - Zone image avec gradient overlay vers le noir en bas pour fusion avec le texte
  - Bouton fleche positionne en absolute en haut a droite de l'image
  - Animation d'entree : `animate-in slide-in-from-bottom-4 duration-500`

### Fichiers crees
- **src/assets/challenge-morning.jpg** : Image hero pour le defi du matin
- **src/assets/challenge-duration.jpg** : Image hero pour le defi de duree

### Aucun changement dans
- **src/pages/AppDetail.tsx** : La logique d'ouverture reste identique
- **src/components/FireEmojiAnimation.tsx** : Aucun changement, reste tel quel
