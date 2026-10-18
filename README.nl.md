[ 🌐 عربي ](README.ar.md) | [ 🇩🇪 Deutsch ](README.de.md) | [ 🇫🇷 Français ](README.fr.md) | [ 🇳🇱 Nederlands ](README.nl.md) | 🇪🇸 [ Español ](README.sp.md) | [ 🇬🇧 English ](README.md)

# Optimaliseer beslissingen over retail-SKU-assortimenten met dynamische verkoopbijdrage-analyse

![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)
![Platform](https://img.shields.io/badge/Platform-Browser%20%7C%20Excel-green.svg)
![Tool](https://img.shields.io/badge/Tool-Decision%20Support-orange.svg)

**Identificeer de kleinste set SKU's die 60%/80%/90% van de verkoop voortbrengt, leg verborgen lange-staart-voorraadkosten bloot en ondersteun SKU-rationalisatiebeslissingen — met een gratis browsertool of Excel-werkmappen, zonder installatie of registratie.**

**Geen registratie. Geen installatie. Gratis in je browser.**

Probeer de browserversie gratis. Heb je de Excel-versie nodig, dan kun je die kopen met een 30-dagen geld-terug-garantie zonder vragen te stellen.
>
> 🌐 **Openen in browser** → [*HTML Live Demo*](https://hyvoid.github.io/Retail-SKU-Concentration-Assortment-Diagnostic-Console/)
>
> 📥 **Excel downloaden** → *GitHub Release / [Website](https://www.theseusworkshop.com/) download (binnenkort beschikbaar)*

---

## Wat het je helpt bijhouden

* Aantal actieve SKU's dat nodig is om 60%, 80% en 90% van de categorieverkoop te bereiken.
* Productcategorieën waarin overmatige SKU-variëteit voorraaddruk creëert.
* Dode voorraadartikelen met voorraad maar nul verkoopbijdrage.
* Verschillen in SKU-concentratie over winkels, categorieën en prijsbanden.
* Assortimentsefficiëntiequotiënten die de verslechtering van de categoriegezondheid onthullen.
* Kandidaat-SKU-eliminatielijsten vóór kortings- of uitverkoopbeslissingen.

---

## Waarom ik dit heb gebouwd

De meeste retailorganisaties weten al dat verkoop doorgaans een 80/20-verdeling volgt. Het probleem is dat zeer weinig teams nauwkeurig kunnen berekenen wat dat operationeel betekent op winkel- en categorieniveau.

In de praktijk ontvangen categoriebeheerders vaak maandelijkse BI-rapporten met totale verkoop per categorie, voorraadomloop of SKU-aantallen. Deze rapporten beantwoorden wat er is gebeurd, maar verklaren zelden waarom de assortimentsefficiëntie verslechtert.

Een typisch faalscenario ziet er zo uit:

| Observatie                       | Conclusie                                |
| --------------------------------- | ----------------------------------------- |
| Categorie bevat 150 actieve SKU's | Assortiment lijkt gezond                |
| Voorraadomloop daalt      | Neem vraagzwakte aan                    |
| Verschillende nieuwe SKU's gelanceerd         | Neem aan dat assortimentsuitbreiding gunstig is |

Na reconstructie van de werkelijke cumulatieve verkoopbijdragecurve verandert het beeld echter vaak:

| Werkelijke bevinding                               | Operationele implicatie            |
| -------------------------------------------- | ---------------------------------- |
| 18 SKU's genereren 80% van de verkoop                | Kernassortiment bestaat al     |
| 76 SKU's dragen minder dan 5% bij              | Schapruimte wordt verspild        |
| 24 SKU's hebben voorraad maar geen verkoop          | Werkkapitaal zit vast         |
| Lange-staart-producten beslaan meerdere prijsbanden | Prijsstrategie vereist herontwerp |

Ik heb deze tool gebouwd omdat traditionele BI-systemen rapportage optimaliseren, niet diagnose. Het doel was niet om nog een dashboard te maken, maar om een herhaalbaar redeneerraamwerk te productiseren om één operationele vraag te beantwoorden:

> **"Hoeveel producten hebben we eigenlijk nodig om het grootste deel van onze verkoop te halen?"**

Het resultaat is een lichte sandbox voor besluitondersteuning die SKU-rationalisatie van intuïtie naar meetbaar bewijs transformeert.

---

## Veelvoorkomende retail-assortimentproblemen die dit oplost

| Probleem                        | Zonder deze tool                                                          | Met deze tool                                                 |
| ------------------------------ | -------------------------------------------------------------------------- | -------------------------------------------------------------- |
| SKU-proliferatie              | Productaantallen stijgen zonder zicht op bijdrageconcentratie | Vereist SKU-aantal voor 60%/80%/90% verkoop wordt zichtbaar |
| Accumulatie van dode voorraad    | Voorraad blijft verborgen in geaggregeerde rapporten                          | SKU's met nul verkoop maar voorraad worden automatisch geïsoleerd |
| Slechte assortimentbeslissingen      | SKU-eliminatie berust op intuïtie                                        | SKU-verwijderingsbeslissingen worden bewijsgebaseerd |
| Prijsbandvervorming      | Highend-producten verhullen assortimentsefficiëntie                          | Concentratieanalyse wordt prijsbandspecifiek |
| Inconsistentie van winkelassortiment | Winkels gebruiken verschillende SKU-mixes zonder meting                     | Assortimentsefficiëntie op winkelniveau wordt vergelijkbaar |
| Langzame categoriereviews         | Handmatig sorteren en cumulatieve berekeningen duren uren                      | Analyse ververst automatisch na gegevensimport |

---

## Voor wie deze tool is

Deze tool is ontworpen voor:

* Retailcategoriebeheerders verantwoordelijk voor assortimentsoptimalisatie.
* Merchandiseplanners die SKU-productiviteit analyseren.
* Winkeloperationele teams die voorraadefficiëntie beoordelen.
* Retailanalisten die Pareto- en lange-staart-analyses uitvoeren.
* Consultants die assortimentsrationalisatieprojecten uitvoeren.
* Power BI-gebruikers die een lokale diagnosesandbox nodig hebben.

Deze tool is **niet** ontworpen voor:

* Data warehousing op ondernemingsschaal.
* Volledige vervanging van retail-ERP.
* Continue realtime rapportagesystemen.
* Historische analyses met miljarden rijen.

Geen spreadsheet-expertise vereist. Open de browserversie of plak geëxporteerde gegevens in Excel en begin direct met analyseren.

---

## Over

Ik bouw lichte tools voor besluitondersteuning voor situaties waarin er te veel bewegende delen zijn om ze allemaal in je hoofd te houden.

De centrale vraag achter deze tools is altijd:

> **"What information needs to exist in one place to make the next decision confidently?"**

Deze SKU-concentratieanalysetool is één voorbeeld van deze benadering: een terugkerend bedrijfsanalyseprobleem omzetten in een herbruikbaar operationeel besluitraamwerk in plaats van nog een statisch rapport.

---

## Technische details

<details>
<summary>Voor technische reviewers, Excel-beoefenaars en medewerkers</summary>

### Werkmappenarchitectuur

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

| Werkblad          | Doel                             |
| ------------------ | ----------------------------------- |
| Readme & Config    | Parameters, drempels, prijsbanden |
| Raw_Data_Paste     | Gebruikersinvoergegevens                     |
| Calculation_Engine | Dynamische berekeningslaag           |
| Dashboard          | Interactieve beslissingsinterface      |

---

### Drie valkuilen die zelfs ervaren categoriebeheerders vangen

#### Valkuil 1: Alle SKU's tellen in plaats van actieve SKU's

**Genomen beslissing:**
Een categorie met 120 SKU's wordt als overassortiment beschouwd.

**Verborgen fout:**
Inactieve SKU's zijn opgenomen in de noemer.

| Maatstaf            | Onjuist | Juist |
| ----------------- | --------- | ------- |
| Totaal SKU-aantal   | 120       | 73      |
| Actief SKU-aantal  | genegeerd   | 73      |
| SKU-concentratie | 15%       | 25%     |

**Waarom het redeneren faalt:**
Producten met nul verkoop en nul voorraad hebben geen operationele relevantie.

**Juiste aanpak:**
Classificeer SKU's alleen als actief wanneer:

```text
Sales > 0 OR Inventory > 0
```

<details>
<summary>Formulereferentie</summary>

```excel
=IF(OR(Sell_Qty>0,Stock_Qty>0),1,0)
```

</details>

---

#### Valkuil 2: Categorieprestaties meten zonder bijdrage te sorteren

**Genomen beslissing:**
Alle SKU's dragen gelijkelijk bij aan de assortimentswaarde.

**Verborgen fout:**
Er is geen cumulatieve bijdrageanalyse uitgevoerd.

| SKU    | Verkoop | Cumulatief % |
| ------ | ----- | ------------ |
| SKU-01 | 30000 | 32%          |
| SKU-02 | 18000 | 51%          |
| SKU-03 | 14000 | 66%          |
| SKU-04 | 12000 | 79%          |

**Waarom het redeneren faalt:**
Verkoopconcentratie is niet-lineair.

**Juiste aanpak:**
Sorteer aflopend vóór cumulatieve berekening.

<details>
<summary>Formulereferentie</summary>

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

#### Valkuil 3: Lange-staart-producten verwijderen zonder voorraadanalyse

**Genomen beslissing:**
Alle slecht verkopende producten moeten worden verwijderd.

**Verborgen fout:**
De voorraadexposure is genegeerd.

| SKU | Verkoop | Voorraad | Aanbeveling |
| --- | ----- | --------- | -------------- |
| A   | 0     | 250       | Uitverkoop      |
| B   | 0     | 0         | Verwijderen         |
| C   | 12    | 420       | Promotie      |
| D   | 4     | 0         | Observeren        |

**Waarom het redeneren faalt:**
Voorraadkosten bepalen de actieprioriteit.

**Juiste aanpak:**
Combineer bijdrageanalyse met voorraadexposure.

<details>
<summary>Formulereferentie</summary>

```excel
=IF(
 AND(Sales=0,Inventory>0),
 "Clearance Candidate",
 ""
)
```

</details>

---

### Voorbeeldscenario

Een retailketen exploiteert:

* 300 winkels
* 800 productcategorieën
* 4 prijsbanden
* Ongeveer 16.000 actieve SKU's

De persoonlijke verzorgingscategorie van een winkel bevat:

| Maatstaf          | Waarde    |
| --------------- | -------- |
| Beschikbare SKU's  | 84       |
| Wekelijkse verkoop    | $52.400  |
| Voorraadwaarde | $137.000 |

Na rangschikking van alle SKU's op verkoopbijdrage:

| Drempel  | Vereist SKU-aantal |
| ---------- | ------------------ |
| 60% verkoop  | 7                  |
| 80% verkoop  | 15                 |
| 90% verkoop  | 26                 |
| 100% verkoop | 84                 |

Verdere analyse identificeert:

* 21 SKU's met voorraad maar nul verkoop.
* 33 SKU's die samen minder dan 2% van de omzet bijdragen.
* Premium prijsbanden die slechts 8% van de verkoop maar 34% van de voorraadinvestering vertegenwoordigen.

Aanbeveling:

1. Verwijder 21 dode-voorraad-SKU's.
2. Consolideer 18 lange-staart-varianten.
3. Herverdeel schapruimte naar best presterende producten.
4. Ontwerp de premium-assortimentstrategie opnieuw.

Verwachte impact:

* Verlaagde werkkapitaalvereisten.
* Verbeterde voorraadomloop.
* Verhoogde schapproductiviteit.
* Snellere categoriereviewcycli.

---

### Formulereferentie

<details>
<summary>Beschikbaarheidsvalidatie</summary>

```excel
=IF(OR(Sell_Qty>0,Stock_Qty>0),1,0)
```

</details>

<details>
<summary>Dynamische filtering</summary>

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
<summary>Sortering</summary>

```excel
=SORT(Data,Sales_Column,-1)
```

</details>

<details>
<summary>Cumulatieve bijdrage</summary>

```excel
=SCAN(
 0,
 SortedSales,
 LAMBDA(a,b,a+b)
)
```

</details>

<details>
<summary>Drempeldetectie</summary>

```excel
=MATCH(
 TRUE,
 CumulativePct>=0.8,
 0
)
```

</details>

---

### Validatieregels

| Veld        | Regel                 | Foutgedrag           |
| ------------ | -------------------- | ------------------------ |
| Week         | Vereist             | Berekening afwijzen       |
| Store_ID     | Vereist             | Rij uitsluiten      |
| Group_ID     | Vereist             | Rij uitsluiten      |
| SKU_ID       | Vereist             | Rij uitsluiten      |
| Price        | >=0                  | Validatiewaarschuwing       |
| Sell_Qty     | >=0                  | Validatiewaarschuwing       |
| Stock_Qty    | >=0                  | Validatiewaarschuwing       |
| Price Band   | Moet bestaan in Config | Classificatiefout     |
| Availability | Sell>0 OR Stock>0    | Uit noemer uitsluiten |

</details>

---

## Andere tools in deze serie

* **Inventory Planning & Replenishment Sandbox** — optimaliseer nabesteltiming en voorraadinvestering.
* **DTC Fashion Inventory Governance Console** — beheer lange-staart-assortimentsrisico over kanalen.
* **Cross-Border VAT Compliance Dashboard** — standaardiseer maandelijkse VAT-berekeningsworkflows.
* **Marketing Attribution Audit Framework** — identificeer misleidende ROI-meetveronderstellingen.

Meer tools: *GitHub-profiel / [Website](https://www.theseusworkshop.com/)*

---

## License

Dit project is gelicentieerd onder de **Apache License 2.0**.

Zie het LICENSE-bestand voor details.
