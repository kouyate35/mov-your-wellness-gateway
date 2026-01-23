
# Plan de correction de l'interface MOV

## Resume des problemes identifies

D'apres tes captures d'ecran de reference (ChatGPT), voici ce qui doit etre corrige :

---

## 1. Carousel des categories - Refonte complete

**Problemes actuels :**
- Les cartes sont trop carrees (aspect ratio 4:5), elles doivent etre plus rectangulaires/allongees
- Les indicateurs dots sont en dehors du conteneur, ils doivent etre A L'INTERIEUR
- Il manque une fleche de navigation qui apparait quand on met le doigt
- Le carousel n'est pas contenu dans une zone encadree comme sur ChatGPT (images 2 et 3)
- Les coins ne sont pas assez arrondis

**Corrections :**
- Changer l'aspect ratio des cartes de `4:5` vers `3:4` ou `2:3` pour un format plus rectangulaire/portrait
- Envelopper le carousel dans un conteneur avec coins arrondis (`rounded-3xl`) et fond subtil
- Deplacer les indicateurs dots A L'INTERIEUR du conteneur du carousel (en bas a gauche comme sur image 3)
- Ajouter un bouton fleche a droite qui apparait sur le conteneur pour indiquer qu'on peut scroller
- Augmenter le rayon des coins arrondis des cartes

---

## 2. Barre de recherche - Ajustements

**Problemes actuels :**
- Trop large par rapport a ChatGPT (image 5 vs image 4)
- Le style n'est pas exactement le meme

**Corrections :**
- Reduire le padding horizontal (`px-6` au lieu de `px-4`) pour rendre la barre moins large visuellement
- Ajuster le padding interne pour un look plus compact
- S'assurer que la bordure est bien visible avec `border-border`

---

## 3. Liste des applications - Style minimaliste

**Problemes actuels :**
- Les icones sont des rectangles arrondis (`rounded-2xl`), doivent etre plus circulaires
- Les lignes sont trop larges/espacees
- Les icones sont fausses (emojis au lieu de vraies icones)

**Corrections :**
- Changer les icones de `rounded-2xl` vers une forme "squircle" plus arrondie (`rounded-xl` ou meme circulaire)
- Reduire la taille des icones de `w-14 h-14` a `w-12 h-12`
- Reduire le padding et l'espacement pour un look plus compact
- Utiliser de vraies images SVG pour les icones des apps les plus connues

---

## 4. Icones d'applications - Vraies icones

**Problemes identifies :**
Les icones actuelles utilisent des emojis qui ne ressemblent pas aux vraies apps :
- WhatsApp : mauvaise icone
- Instagram : mauvaise icone (emoji camera)
- Snapchat : mauvaise icone
- Discord : manquant
- Facebook : icone "f" trop basique

**Solution :**
Utiliser des icones SVG inline qui reproduisent fidelement les logos officiels :
- **Instagram** : Icone camera stylisee avec degrade rose/orange/violet
- **WhatsApp** : Telephone dans une bulle blanche sur fond vert
- **Snapchat** : Fantome blanc sur fond jaune
- **Facebook** : "f" stylise en blanc sur fond bleu
- **TikTok** : Note de musique stylisee
- **YouTube** : Triangle play sur rectangle rouge
- **X (Twitter)** : Logo X en blanc sur fond noir

---

## Fichiers a modifier

| Fichier | Modifications |
|---------|---------------|
| `src/components/CategoryCarousel.tsx` | - Conteneur englobant avec fond et coins arrondis<br>- Aspect ratio plus rectangulaire (3:4)<br>- Dots a l'interieur en bas a gauche<br>- Fleche de navigation a droite |
| `src/components/SearchBar.tsx` | - Padding horizontal plus important<br>- Style plus compact |
| `src/components/AppList.tsx` | - Icones plus rondes (squircle)<br>- Taille reduite<br>- Espacement plus compact |
| `src/data/apps.ts` | - Remplacer les emojis par du JSX pour les vraies icones SVG |

---

## Details techniques

### CategoryCarousel.tsx

```text
Structure proposee :
+------------------------------------------+
|  [CONTENEUR ARRONDI avec fond subtil]    |
|                                          |
|  +--------+    +--------+          [>]   |
|  | CARTE  |    | CARTE  |     (fleche)   |
|  | MOVE   |    | BREATH |                |
|  |        |    |        |                |
|  +--------+    +--------+                |
|                                          |
|  o o •    (dots a l'interieur)           |
+------------------------------------------+
```

- Conteneur parent : `bg-secondary/10 rounded-3xl p-4`
- Cartes : `aspect-[3/4] rounded-2xl`
- Dots : positionnement absolu en bas a gauche du conteneur
- Fleche : bouton circulaire positionne a droite au milieu

### Apps icons (SVG inline)

Pour chaque app majeure, creer un composant SVG fidele :
- Instagram : path SVG du logo camera avec gradient
- WhatsApp : path SVG du telephone + bulle
- Snapchat : path SVG du fantome
- Etc.

---

## Resultat attendu

Une interface qui ressemble exactement aux captures d'ecran ChatGPT avec :
1. Un carousel contenu dans une zone bien definie avec indicateurs integres
2. Une barre de recherche plus compacte et elegante
3. Une liste d'applications avec de vraies icones circulaires style iOS/Android
4. Un aspect general plus professionnel et minimaliste
