**README - Projet JADE**

Bienvenue dans le projet JADE, une plateforme de visualisation des données électorales liées aux élections législatives en France. Ce README fournit des informations détaillées sur l'installation, la structure des fichiers, les scripts, et les technologies utilisées dans le cadre de ce projet.

### EXIGENCES

Les scripts de ce projet ont été développés en Python, en utilisant le framework Django.

#### Installation de Python:
Assurez-vous que Python est installé sur votre système. Le projet JADE a été développé et testé avec Python 3.6.

#### Installation de Django:
Pour exécuter les scripts du projet JADE, utilisez le fichier requirements.txt en exécutant la commande suivante :
```bash
pip install -r requirements.txt
```

### FICHIERS ET SCRIPTS

#### Dossier `JADE`

- `__init__.py`: Fichier indiquant à Python que le répertoire est un package.
- `asgi.py`: Configuration de l'interface asynchrone du serveur.
- `settings.py`: Configuration principale de Django.
- `urls.py`: Définition des URL de l'application.
- `wsgi.py`: Configuration de l'interface du serveur web.

#### Dossier `media`

- `Decisions_AN`: Dossier organisé des décisions électorales de 1958 à 2023.
- `décisions.csv`: Tableau des informations sur des décisions.

#### Fichier `db.sqlite3`

- Base de données SQLite utilisée dans le projet Django.

#### Fichier `manage.py`

- Script de gestion des commandes administratives Django.

#### Dossier `static`

- `bootstrap-5.0.2-dist`: Fichiers CSS et JavaScript du framework Bootstrap.
- `echarts.js`: Bibliothèque JavaScript ECharts.
- `jquery-3.6.1.min.js`: Bibliothèque JavaScript jQuery.

#### Dossier `web`

##### Dossier `migrations`

- `__init__.py`: Fichier d'initialisation.
- `0001_initial.py`: Fichier de migration initiale.

##### Dossier `static`

- Dossier `css`: Fichiers CSS pour styliser les pages HTML.
- Dossier `geojson`: Fichiers JSON pour la géographie.
- Dossier `image`: Images et icônes.
- Dossier `js`: Scripts JavaScript pour les fonctionnalités interactives :
1. **`common.js` :**
   - **Fonction principale (`switchPage`):** Appelée lorsqu'un bouton de navigation est cliqué. Elle extrait l'ID du bouton, puis utilise une instruction `switch` pour rediriger l'utilisateur vers la page correspondante en modifiant la propriété `window.location.pathname`. Chaque cas de l'instruction `switch` correspond à un bouton spécifique de la barre de navigation, redirigeant ainsi l'utilisateur vers la page appropriée.

2. **`table.js` :**
   - **Fonction principale (`changePage`):** Utilisée dans le contexte de la pagination sur la page du tableau. Lorsqu'elle est appelée avec un numéro de page en paramètre, la fonction vérifie si l'URL actuelle contient déjà un paramètre de page. Si c'est le cas, elle le met à jour avec le nouveau numéro de page et modifie l'URL pour refléter ce changement, redirigeant ainsi l'utilisateur vers la nouvelle page. Si l'URL ne contient pas déjà un paramètre de page, la fonction l'ajoute simplement à l'URL actuelle, effectuant ensuite la redirection.

3. **`map_init.js` :**
   - **Fonction principale (`initEcharts`):** Initialise une carte ECharts pour la visualisation cartographique des décisions. La fonction prend en paramètre un objet `mapData` représentant les données à afficher sur la carte. Le script utilise le framework ECharts pour créer une carte géographique de la France, chargeant également des données géographiques au format JSON du fichier `departments.json` situé dans le dossier `static/geojson`. Ces données sont utilisées pour définir les frontières et les noms des départements. La fonction configure divers styles pour la carte, y compris les couleurs, les bordures et les étiquettes. Elle utilise également des icônes colorées dans la fonction de formatage de l'info-bulle (`tooltip`) pour afficher des informations spécifiques à chaque département. La fonction configure une instance d'ECharts avec les options définies et les données fournies, puis affiche la carte dans l'élément HTML ayant l'ID `map`. L'événement de clic sur la carte est géré pour permettre la redirection vers une page de tableau avec des filtres spécifiques, tels que la solution, l'article 38, la période, et le département sélectionnés. Ces informations sont extraites de l'URL pour maintenir la cohérence de l'état d'affichage lors de la redirection.

4. **`circs.js` :**
   - **Fonction principale (`initCircsEcharts`):** Initialise un graphique ECharts de type "pie" (camembert) pour la visualisation des données relatives aux circonscriptions. La fonction prend deux paramètres : `solutionData` pour les données relatives aux solutions et `decisionData` pour les données de décision spécifiques aux circonscriptions. Le script définit également une fonction utilitaire `getRandomColor` qui génère une couleur aléatoire à chaque appel. Cette couleur est utilisée pour le style des éléments du graphique. La fonction utilise le framework ECharts pour créer un camembert avec des données dynamiques fournies. Elle configure divers aspects du graphique, y compris les légendes, les couleurs, les styles de texte, et l'aspect de l'info-bulle. La légende est positionnée en bas et centrée, affichant les différentes solutions. Chaque tranche du camembert représente une circonscription avec des sous-catégories telles que "Inéligibilité", "Rejet", "Annulation", "Non lieu à prononcer l'inéligibilité", et affiche le nombre correspondant.

5. **`statistics.js` :**
   - **Fonction principale (`initCharts`):** Définit deux graphiques ECharts (`graphic1` et `graphic2`) dans deux éléments HTML distincts. Les instances des graphiques sont créées avec `echarts.init` et stockées dans les variables `myChart1` et `myChart2`. Le script contient une fonction utilitaire `getRandomLightColor` qui génère une couleur claire aléatoire à chaque appel. Cette couleur est utilisée pour le style des éléments des graphiques.

#### Dossier `templates`

- `table.html`: Page du tableau global des données électorales.
- `home.html`: Page d'accueil du projet.
- `common.html`: Modèle commun partagé entre plusieurs pages.
- `departments.html`: Page de la carte des départements.
- `circonscriptions.html`: Page des circonscriptions.
- `mentions.html`: Page des mentions légales et droits d'auteur.

#### Fichier `__init__.py`

- Fichier vide indiquant que le répertoire doit être considéré comme un package Python.

#### Fichier `admin.py`

- Configuration de l'interface d'administration Django.

#### Fichier `apps.py`

- Configuration de l'application Django.

#### Fichier `models.py`

- Définition des modèles de données Django.

#### Fichier `tests.py`

- Fichier destiné à contenir des tests pour l'application Django.

#### Dossier `views`

- Scripts Python gérant les vues des différentes pages de l'interface utilisateur : 
1. **`database_creater.py`**:
   - Ce script a pour objectif de créer et d'initialiser la base de données du projet JADE en analysant les fichiers XML et CSV fournis.
   - La fonction `create_link` supprime tous les liens existants dans la base de données, puis appelle la fonction `corpus_parser` pour créer de nouveaux liens en explorant les fichiers XML dans le dossier spécifié.
   - La fonction `corpus_parser` explore les fichiers XML dans le dossier spécifié et crée des objets de modèle Django pour les liens entre les décisions.
   - La fonction `file_parser` analyse un fichier XML spécifique pour extraire le numéro et l'URL de la décision.
   - La fonction `create_database` lit le fichier CSV et crée des objets de modèle Django pour les décisions, en utilisant les liens créés précédemment.

2. **`homepage.py`**:
   - Ce script contient la fonction `home_render` qui gère le rendu de la page d'accueil (`home.html`) en utilisant le modèle Django `home.html`.
   - La fonction utilise le module Django `render` pour générer la réponse HTML, avec un contexte spécifiant le bouton actif sur la barre de navigation.

3. **`tablepage.py`**:
   - Ce script contient la classe de formulaire (`DecisionFilterForm`) qui représente un formulaire de filtre pour les décisions.
   - La fonction `table_render` gère le rendu de la page de tableau (`table.html`). Elle utilise le modèle de filtre pour permettre la recherche et le filtrage des décisions.
   - La pagination est également mise en œuvre pour afficher un nombre limité de décisions par page.

4. **`mappage.py`**:
   - Ce script gère le rendu de la page de la carte (`departments.html`). Il utilise un formulaire de filtre (`MapFilterForm`) pour permettre la recherche et le filtrage des décisions.
   - La fonction `map_render` récupère les décisions en fonction des filtres spécifiés et génère une carte montrant les statistiques des décisions par département.
   - La classe `MapFilterForm` est un formulaire de filtre spécifique à la page de la carte, permettant de filtrer les décisions en fonction de certains critères.

5. **`circspage.py`**:
   - Ce script gère le rendu de la page des circonscriptions (`circonscriptions.html`). Il utilise un formulaire de filtre (`CircsFilterForm`) pour permettre la recherche et le filtrage des décisions.
   - La fonction `circs_render` récupère les décisions en fonction des filtres spécifiés et génère une visualisation des décisions par circonscription.
   - La classe `CircsFilterForm` est un formulaire de filtre spécifique à la page des circonscriptions, permettant de filtrer les décisions en fonction de certains critères.

6. **`statisticspage.py`**:
   - Ce script gère le rendu de la page des statistiques (`statistics.html`). Il récupère et organise les données nécessaires pour générer des visualisations des graphes statistiques basées sur les décisions enregistrées dans la base de données.

7. **`mentionpage.py`**:
   - Ce script contient la fonction `mention_render`, qui gère le rendu de la page des mentions légales en utilisant le modèle Django `mentions.html`. Elle prend en charge la personnalisation de l'affichage en définissant le bouton actif (`mentions`) dans le contexte de la page.

### UTILISATION

Pour exécuter le projet, utilisez la commande :
```bash
python manage.py runserver
```
Accédez à l'interface depuis votre navigateur à l'URL qui vous sera donnée sur votre console.

Explorez les fonctionnalités de visualisation des données électorales, du tableau global aux pages spécifiques sur les départements, les circonscriptions, les statistiques, et plus encore.
