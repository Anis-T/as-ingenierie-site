# AS Ingénierie — version améliorée

## Installation

1. Copie le dossier `assets` de ton projet actuel dans ce dossier.
2. Remplace les fichiers HTML existants par ceux de cette version.
3. Remplace `css/style.css`.
4. Ajoute `js/main.js`.
5. Teste `index.html` en local dans WebStorm.
6. Envoie les fichiers sur OVH dans le dossier `/www` avec FileZilla.

## Fichiers fournis

- `index.html`
- `particuliers.html`
- `professionnels.html`
- `mentions-legales.html`
- `politique-confidentialite.html`
- `cookies.html`
- `cgu.html`
- `404.html`
- `css/style.css`
- `js/main.js`

## Attention

Les images ne sont pas incluses dans ce ZIP, car elles n’ont pas été uploadées dans la conversation. Garde ton dossier `assets` actuel.


## Ajout

- `presentation.html` : page de présentation d’AS Ingénierie, équipe, fondateur et références récentes.

## Mise à jour — 8 septembre 2026

Fichiers modifiés (à envoyer sur OVH dans `/www`) :

- `index.html` — nouvelle présentation du process en parcours connecté (01 / 02 / 03), cartes de profil entièrement cliquables.
- `presentation.html` — équipe offshore « Turquie », grille de références refondue (détail dépliable sous la carte cliquée).
- `js/main.js` — menu mobile amélioré (Échap, clic extérieur, verrouillage du scroll) et nouveau comportement des références.
- `css/style.css` — styles du parcours méthode, du panneau de détail des chantiers et améliorations ergonomiques desktop / mobile.
- `assets/projet-coredif-le-chesnay-54.webp` et `assets/projet-coredif-le-chesnay-32.webp` — nouvelles images chantiers (à créer sur le serveur).
- Pages secondaires : ajout de `id="main-nav"` / `aria-controls` sur le menu.

Références : chantier TPCB retiré, chantiers COREDIF (54 et 32 logements collectifs, Le Chesnay) ajoutés.
Les fichiers sources `new_COREDIF_*.jpeg` à la racine ne sont plus utilisés (versions optimisées dans `assets/`).
