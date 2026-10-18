[ 🌐 عربي ](README.ar.md) | [ 🇩🇪 Deutsch ](README.de.md) | [ 🇫🇷 Français ](README.fr.md) | [ 🇳🇱 Nederlands ](README.nl.md) | 🇪🇸 [ Español ](README.sp.md) | [ 🇬🇧 English ](README.md)

# Optimisez les décisions d'assortiment de SKU de détail avec une analyse dynamique de contribution aux ventes

![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)
![Platform](https://img.shields.io/badge/Platform-Browser%20%7C%20Excel-green.svg)
![Tool](https://img.shields.io/badge/Tool-Decision%20Support-orange.svg)

**Identifiez le plus petit ensemble de SKU produisant 60 %/80 %/90 % des ventes, exposez les coûts de stock cachés de la longue traîne et soutenez les décisions de rationalisation des SKU — à l'aide d'un outil navigateur gratuit ou d'un classeur Excel, sans installation ni inscription.**

**Aucune inscription. Aucune installation. Gratuit dans votre navigateur.**

Essayez gratuitement la version navigateur. Si vous avez besoin de la version Excel, vous pouvez l'acheter avec une garantie de remboursement de 30 jours sans poser de questions.
>
> 🌐 **Ouvrir dans le navigateur** → [*Démo HTML en direct*](https://hyvoid.github.io/Retail-SKU-Concentration-Assortment-Diagnostic-Console/)
>
> 📥 **Télécharger Excel** → *Version GitHub / [Site web](https://www.theseusworkshop.com/) Téléchargement (bientôt disponible)*

---

## Ce qu'il vous aide à suivre

* Nombre de SKU actifs nécessaires pour atteindre 60 %, 80 % et 90 % des ventes de la catégorie.
* Catégories de produits où une variété excessive de SKU crée une traînée de stock.
* Articles de stock mort avec des holdings mais une contribution nulle aux ventes.
* Différences de concentration des SKU entre magasins, catégories et gammes de prix.
* Ratios d'efficacité d'assortiment qui révèlent la détérioration de la santé de la catégorie.
* Listes de SKU candidats à l'élimination avant les décisions de démarque ou de liquidation.

---

# Pourquoi j'ai conçu ceci

La plupart des organisations de détail savent déjà que les ventes suivent généralement une distribution 80/20. Le problème est que très peu d'équipes peuvent calculer avec précision ce que cela signifie opérationnellement au niveau du magasin et de la catégorie.

En pratique, les gestionnaires de catégorie reçoivent souvent des rapports BI mensuels montrant les ventes totales par catégorie, la rotation des stocks ou le nombre de SKU. Ces rapports répondent à ce qui s'est passé mais expliquent rarement pourquoi l'efficacité de l'assortiment se détériore.

Un scénario d'échec typique ressemble à ceci :

| Observation                       | Conclusion                                |
| --------------------------------- | ----------------------------------------- |
| La catégorie contient 150 SKU actifs | L'assortiment semble sain                |
| La rotation des stocks décline      | Supposer une faiblesse de la demande                    |
| Plusieurs nouveaux SKU lancés         | Supposer que l'expansion de l'assortiment est bénéfique |

Cependant, après avoir reconstruit la courbe réelle de contribution cumulée aux ventes, l'image change souvent :

| Constat réel                               | Implication opérationnelle            |
| -------------------------------------------- | ---------------------------------- |
| 18 SKU génèrent 80 % des ventes                | L'assortment de base existe déjà     |
| 76 SKU contribuent à moins de 5 %              | L'espace en rayon est gaspillé        |
| 24 SKU ont du stock mais aucune vente          | Le fonds de roulement est piégé         |
| Les produits de longue traîne couvrent plusieurs gammes de prix | La stratégie de prix nécessite une refonte |

J'ai conçu cet outil parce que les systèmes BI traditionnels optimisent le reporting, pas le diagnostic. L'objectif n'était pas de créer un autre tableau de bord, mais de productiser un cadre de raisonnement reproductible pour répondre à une question opérationnelle :

> **"Combien de produits nous faut-il réellement pour réaliser l'essentiel de nos ventes ?"**

Le résultat est un bac à sable léger d'aide à la décision qui transforme la rationalisation des SKU d'une intuition en preuves mesurables.

---

## Les problèmes courants d'assortiment de détail que cela résout

| Problème                        | Sans cet outil                                                          | Avec cet outil                                                 |
| ------------------------------ | -------------------------------------------------------------------------- | -------------------------------------------------------------- |
| Prolifération des SKU              | Les nombres de produits augmentent sans visibilité sur la concentration des contributions | Le nombre exact de SKU requis pour 60 %/80 %/90 % des ventes devient visible |
| Accumulation de stock mort    | Le stock reste caché dans les rapports agrégés                          | Les SKU à ventes nulles mais en stock sont isolés automatiquement |
| Mauvaises décisions d'assortiment      | L'élimination des SKU repose sur l'intuition                                        | Les décisions de retrait de SKU deviennent fondées sur des preuves |
| Distorsion des gammes de prix      | Les produits haut de gamme masquent l'efficacité de l'assortiment                          | L'analyse de concentration devient spécifique à la gamme de prix |
| Incohérence de l'assortiment en magasin | Les magasins utilisent des mixes de SKU différents sans mesure                     | L'efficacité de l'assortiment au niveau magasin devient comparable |
| Revues de catégorie lentes         | Le tri manuel et les calculs cumulés prennent des heures                      | L'analyse se rafraîchit automatiquement après l'import des données |

---

## À qui cet outil est destiné

Cet outil est conçu pour :

* Les gestionnaires de catégorie de détail responsables de l'optimisation de l'assortiment.
* Les planificateurs de marchandises analysant la productivité des SKU.
* Les équipes d'exploitation en magasin examinant l'efficacité des stocks.
* Les analystes de détail effectuant des analyses de Pareto et de longue traîne.
* Les consultants menant des projets de rationalisation d'assortiment.
* Les utilisateurs de Power BI ayant besoin d'un bac à sable de diagnostic local.

Cet outil n'est **pas** conçu pour :

* L'entreposage de données à l'échelle de l'entreprise.
* Le remplacement complet de l'ERP de détail.
* Les systèmes de reporting continu en temps réel.
* L'analytique historique de plusieurs milliards de lignes.

Aucune expertise tableur n'est requise. Ouvrez la version navigateur ou collez les données exportées dans Excel et commencez l'analyse immédiatement.

---

## À propos

Je conçois des outils légers d'aide à la décision pour des situations où il y a trop de pièces mobiles à garder en tête en même temps.

La question centrale derrière ces outils est toujours :

> **"What information needs to exist in one place to make the next decision confidently?"**

Cet outil d'analyse de concentration des SKU est un exemple de cette approche : transformer un problème récurrent d'analyse commerciale en un cadre de décision opérationnel réutilisable plutôt qu'un autre rapport statique.

---

## Détails techniques

<details>
<summary>Pour les réviseurs techniques, les praticiens Excel et les collaborateurs</summary>

## ### Architecture du classeur

```text
Raw Sales Data
        │
        ▼
Inventory Data Integration
        │
        ▼
Availability Validation
(Sell >0 OR Stock >0)
        │
        ▼
Price Band Classification
        │
        ▼
Dynamic Filtering Engine
(Store + Week + Category + Price Band)
        │
        ▼
Descending SKU Ranking
        │
        ▼
Running Contribution Calculation
        │
        ▼
60% / 80% / 90% Threshold Detection
        │
        ▼
Dashboard + Decision Lists
```

| Feuille de calcul          | Objectif                             |
| ------------------ | ----------------------------------- |
| Readme & Config    | Paramètres, seuils, gammes de prix |
| Raw_Data_Paste     | Données d'entrée utilisateur                     |
| Calculation_Engine | Couche de calcul dynamique           |
| Dashboard          | Interface de décision interactive      |

---

## ### Trois pièges qui surprennent même les gestionnaires de catégorie expérimentés

### Piège 1 : Compter tous les SKU au lieu des SKU actifs

**Décision prise :**
Une catégorie de 120 SKU est considérée comme sur-assortie.

**Erreur cachée :**
Les SKU inactifs ont été inclus dans le dénominateur.

| Métrique            | Incorrect | Correct |
| ----------------- | --------- | ------- |
| Nombre total de SKU   | 120       | 73      |
| Nombre de SKU actifs  | ignoré   | 73      |
| Concentration des SKU | 15%       | 25%     |

**Pourquoi le raisonnement échoue :**
Les produits avec zéro vente et zéro stock n'ont aucune pertinence opérationnelle.

**Approche correcte :**
Ne classer les SKU comme actifs que lorsque :

```text
Sales > 0 OR Inventory > 0
```

<details>
<summary>Référence de formule</summary>

```excel
=IF(OR(Sell_Qty>0,Stock_Qty>0),1,0)
```

</details>

---

### Piège 2 : Mesurer la performance de catégorie sans trier la contribution

**Décision prise :**
Tous les SKU contribuent également à la valeur de l'assortiment.

**Erreur cachée :**
Aucune analyse de contribution cumulée n'a été effectuée.

| SKU    | Ventes | Cumulé % |
| ------ | ----- | ------------ |
| SKU-01 | 30000 | 32%          |
| SKU-02 | 18000 | 51%          |
| SKU-03 | 14000 | 66%          |
| SKU-04 | 12000 | 79%          |

**Pourquoi le raisonnement échoue :**
La concentration des ventes est non linéaire.

**Approche correcte :**
Trier par ordre décroissant avant le calcul cumulé.

<details>
<summary>Référence de formule</summary>

```excel
=SORT(Data,Sales_Column,-1)

=SCAN(
   0,
   Sorted_Sales,
   LAMBDA(a,b,a+b)
)
```

</details>

---

### Piège 3 : Retirer les produits de longue traîne sans analyse des stocks

**Décision prise :**
Tous les produits à faible vente devraient être retirés.

**Erreur cachée :**
L'exposition aux stocks a été ignorée.

| SKU | Ventes | Stock | Recommandation |
| --- | ----- | --------- | -------------- |
| A   | 0     | 250       | Liquidation      |
| B   | 0     | 0         | Retrait         |
| C   | 12    | 420       | Promotion      |
| D   | 4     | 0         | Observer        |

**Pourquoi le raisonnement échoue :**
Le coût du stock détermine la priorité d'action.

**Approche correcte :**
Combiner l'analyse de contribution avec l'exposition aux stocks.

<details>
<summary>Référence de formule</summary>

```excel
=IF(
 AND(Sales=0,Inventory>0),
 "Clearance Candidate",
 ""
)
```

</details>

---

## ### Scénario d'exemple

Une chaîne de détail exploite :

* 300 magasins
* 800 catégories de produits
* 4 gammes de prix
* Environ 16 000 SKU actifs

La catégorie de soins personnels d'un magasin contient :

| Métrique          | Valeur    |
| --------------- | -------- |
| SKU disponibles  | 84       |
| Ventes hebdomadaires    | 52 400 $  |
| Valeur du stock | 137 000 $ |

Après avoir classé tous les SKU par contribution aux ventes :

| Seuil  | Nombre de SKU requis |
| ---------- | ------------------ |
| 60 % des ventes  | 7                  |
| 80 % des ventes  | 15                 |
| 90 % des ventes  | 26                 |
| 100 % des ventes | 84                 |

Une analyse plus poussée identifie :

* 21 SKU avec du stock mais zéro vente.
* 33 SKU contribuant à moins de 2 % du chiffre d'affaires combiné.
* Les gammes de prix haut de gamme ne représentent que 8 % des ventes mais 34 % de l'investissement en stock.

Recommandation :

1. Retirer les 21 SKU à stock mort.
2. Consolider 18 variantes de longue traîne.
3. Réaffecter l'espace en rayon aux produits les plus performants.
4. Repenser la stratégie d'assortiment haut de gamme.

Impact attendu :

* Réduction des besoins en fonds de roulement.
* Amélioration de la rotation des stocks.
* Augmentation de la productivité des rayons.
* Cycles de revue de catégorie plus rapides.

---

## ### Référence des formules

<details>
<summary>Validation de disponibilité</summary>

```excel
=IF(OR(Sell_Qty>0,Stock_Qty>0),1,0)
```

</details>

<details>
<summary>Filtrage dynamique</summary>

```excel
=FILTER(
 Raw_Data,
 (Store=Selected_Store)*
 (Category=Selected_Category)*
 (Price_Band=Selected_Band)*
 (Available=1)
)
```

</details>

<details>
<summary>Tri</summary>

```excel
=SORT(Data,Sales_Column,-1)
```

</details>

<details>
<summary>Contribution cumulée</summary>

```excel
=SCAN(
 0,
 SortedSales,
 LAMBDA(a,b,a+b)
)
```

</details>

<details>
<summary>Détection de seuil</summary>

```excel
=MATCH(
 TRUE,
 CumulativePct>=0.8,
 0
)
```

</details>

---

## ### Règles de validation

| Champ        | Règle                 | Comportement en cas d'erreur           |
| ------------ | -------------------- | ------------------------ |
| Week         | Requis             | Rejeter le calcul       |
| Store_ID     | Requis             | Exclure la ligne      |
| Group_ID     | Requis             | Exclure la ligne      |
| SKU_ID       | Requis             | Exclure la ligne      |
| Price        | >=0                  | Avertissement de validation       |
| Sell_Qty     | >=0                  | Avertissement de validation       |
| Stock_Qty    | >=0                  | Avertissement de validation       |
| Price Band   | Doit exister dans Config | Erreur de classification     |
| Availability | Sell>0 OR Stock>0    | Exclure du dénominateur |

</details>

---

## Autres outils de cette série

* **Inventory Planning & Replenishment Sandbox** — optimiser le calendrier de réapprovisionnement et l'investissement en stock.
* **DTC Fashion Inventory Governance Console** — gérer le risque d'assortiment de longue traîne sur tous les canaux.
* **Cross-Border VAT Compliance Dashboard** — standardiser les flux de calcul mensuel de la TVA.
* **Marketing Attribution Audit Framework** — identifier les hypothèses trompeuses de mesure du ROI.

Plus d'outils : *Profil GitHub / [Site web](https://www.theseusworkshop.com/)*

---

## License

Ce projet est sous licence **Apache License 2.0**.

Voir le fichier LICENSE pour plus de détails.
