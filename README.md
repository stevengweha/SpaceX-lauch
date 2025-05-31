# SpaceX Explorer

Une application Vue.js moderne pour explorer les lancements et les fusées SpaceX, avec une interface responsive et élégante (Bootstrap/CSS).

## Fonctionnalités

- **Affichage du prochain lancement SpaceX** avec décompte en temps réel.
- **Filtrage des lancements** (tous, réussis, échoués).
- **Liste des fusées SpaceX** sous forme d’images cliquables.
- **Détails complets** sur chaque lancement (date, lieu, clients, payloads, vidéo, article, patch, etc).
- **Détails complets** sur chaque fusée (image, description, caractéristiques techniques).
- **Modales Bootstrap** pour une expérience utilisateur fluide.
- **Données en temps réel** via l’API officielle SpaceX.

## Installation

1. **Cloner le dépôt**
   ```bash
   git clone <url-du-repo>
   cd spacex-app
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Lancer le serveur de développement**
   ```bash
   npm run dev
   ```

4. **Accéder à l’application**
   - Ouvre [http://localhost:5173](http://localhost:5173) dans ton navigateur.

## Structure du projet

- `src/components/UpcomingLaunch.vue` : Composant principal, affiche le prochain lancement, les filtres, la liste des fusées et des lancements, ainsi que les modales de détails.
- `src/components/RocketModal.vue` : Composant modal pour afficher les détails d’une fusée.
- `src/views/LaunchesView.vue` et `src/views/RocketsView.vue` (si présents) : Vues pour la navigation.
- `src/main.ts` : Point d’entrée de l’application, configuration de Bootstrap et du router.
- `src/router/index.ts` : Configuration du router (navigation entre vues).
- `public/` : Fichiers statiques.

## Technologies utilisées

- [Vue 3](https://vuejs.org/)
- [Bootstrap 5](https://getbootstrap.com/)
- [SpaceX API](https://github.com/r-spacex/SpaceX-API)
- [Vite](https://vitejs.dev/)

## Rapport concis

- **Objectif** : Permettre à l’utilisateur de visualiser les prochains lancements SpaceX, filtrer les résultats, explorer les fusées et obtenir des informations détaillées sur chaque élément.
- **Approche** : Utilisation de l’API SpaceX pour récupérer dynamiquement les données, affichage sous forme de listes et de modales, gestion du décompte en temps réel côté client.
- **Points forts** :
  - Interface claire et responsive.
  - Utilisation efficace de l’API (fetch, Promise.all, etc).
  - Code découpé en composants pour la maintenabilité.
  - Expérience utilisateur moderne (modales, images, filtres).
- **Limites** :
  - Le décompte est calculé côté client à partir de la date du lancement (l’API ne fournit pas le countdown directement).
  - Si aucun lancement futur n’est planifié, un message spécifique s’affiche.

## Commentaires et documentation du code

- **Chaque fonction** est précédée d’un commentaire expliquant son rôle.
- **Les blocs importants** (fetch, calcul du countdown, gestion des modales) sont commentés pour faciliter la compréhension.
- **Les props des composants** sont typées et documentées.
- **Les variables réactives** sont nommées de façon explicite (`selectedLaunch`, `selectedRocket`, etc).
- **Les sections du template** sont séparées et commentées (`<!-- Prochain lancement -->`, `<!-- Filtres -->`, etc).

> Pour plus de détails, consulte le code source dans `src/components/UpcomingLaunch.vue` et les autres composants.

---

## Auteur

- Steven Gweha

---

## Ressources utiles

- [API SpaceX](https://github.com/r-spacex/SpaceX-API)
- [Vue 3 Documentation](https://vuejs.org/guide/introduction.html)
- [Bootstrap 5 Documentation](https://getbootstrap.com/docs/5.0/getting-started/introduction/)
