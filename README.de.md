[ 🌐 عربي ](README.ar.md) | [ 🇩🇪 Deutsch ](README.de.md) | [ 🇫🇷 Français ](README.fr.md) | [ 🇳🇱 Nederlands ](README.nl.md) | 🇪🇸 [ Español ](README.sp.md) | [ 🇬🇧 English ](README.md)

# Optimieren Sie Einzelhandels-SKU-Sortimentsentscheidungen mit dynamischer Umsatzbeitragsanalyse

![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)
![Platform](https://img.shields.io/badge/Platform-Browser%20%7C%20Excel-green.svg)
![Tool](https://img.shields.io/badge/Tool-Decision%20Support-orange.svg)

**Identifizieren Sie die kleinste Menge von SKUs, die 60 %/80 %/90 % des Umsatzes ausmachen, legen Sie versteckte Long-Tail-Lagerkosten offen und unterstützen Sie SKU-Rationalisierungsentscheidungen — mit einem kostenlosen Browser-Tool oder Excel-Arbeitsmappe, ohne Installation oder Registrierung.**

**Keine Registrierung. Keine Installation. Kostenlos in Ihrem Browser.**

Testen Sie die Browser-Version kostenlos. Wenn Sie die Excel-Version benötigen, können Sie sie mit einer 30-tägigen Geld-zurück-Garantie ohne Rückfragen erwerben.
>
> 🌐 **Im Browser öffnen** → [*HTML-Live-Demo*](https://hyvoid.github.io/Retail-SKU-Concentration-Assortment-Diagnostic-Console/)
>
> 📥 **Excel herunterladen** → *GitHub-Release / [Website](https://www.theseusworkshop.com/)-Download (demnächst)*

---

## Was es Ihnen hilft zu verfolgen

* Anzahl aktiver SKUs, die erforderlich sind, um 60 %, 80 % und 90 % des Kategorieumsatzes zu erreichen.
* Produktkategorien, in denen übermäßige SKU-Vielfalt Lagerbelastung erzeugt.
* Tote Lagerbestände mit Bestand, aber null Umsatzbeitrag.
* Unterschiede bei der SKU-Konzentration über Filialen, Kategorien und Preisbänder.
* Sortimentseffizienz-Quoten, die die Verschlechterung der Kategoriegesundheit offenlegen.
* Kandidatenlisten für SKU-Eliminierung vor Rabatt- oder Abverkaufsentscheidungen.

---

## Warum ich dies gebaut habe

Die meisten Einzelhandelsorganisationen wissen bereits, dass Umsätze typischerweise einer 80/20-Verteilung folgen. Das Problem ist, dass nur sehr wenige Teams genau berechnen können, was das operativ auf Filial- und Kategorieebene bedeutet.

In der Praxis erhalten Kategoriemanager oft monatliche BI-Berichte mit Gesamtumsätzen nach Kategorie, Lagerumschlag oder SKU-Zahlen. Diese Berichte beantworten, was passiert ist, erklären aber selten, warum sich die Sortimentseffizienz verschlechtert.

Ein typisches Fehlerszenario sieht so aus:

| Beobachtung                       | Schlussfolgerung                                |
| --------------------------------- | ----------------------------------------- |
| Kategorie enthält 150 aktive SKUs | Sortiment erscheint gesund                |
| Lagerumschlag sinkt      | Nachfrageschwäche annehmen                    |
| Mehrere neue SKUs gestartet         | Sortimentserweiterung als vorteilhaft annehmen |

Nach der Rekonstruktion der tatsächlichen kumulativen Umsatzbeitragskurve ändert sich das Bild jedoch oft:

| Tatsächliche Erkenntnis                               | Operative Implikation            |
| -------------------------------------------- | ---------------------------------- |
| 18 SKUs generieren 80 % des Umsatzes                | Kernsortiment existiert bereits     |
| 76 SKUs tragen weniger als 5 % bei              | Regalfläche wird verschwendet        |
| 24 SKUs haben Bestand, aber keine Verkäufe          | Betriebskapital ist gebunden         |
| Long-Tail-Produkte erstrecken sich über mehrere Preisbänder | Preisstrategie erfordert Neugestaltung |

Ich habe dieses Tool gebaut, weil traditionelle BI-Systeme Berichterstattung optimieren, nicht Diagnose. Das Ziel war nicht, ein weiteres Dashboard zu erstellen, sondern ein wiederholbares Reasoning-Framework zu produktisieren, um eine operative Frage zu beantworten:

> **"Wie viele Produkte brauchen wir tatsächlich, um den Großteil unseres Umsatzes zu erzielen?"**

Das Ergebnis ist eine leichte Entscheidungsunterstützungs-Sandbox, die SKU-Rationalisierung von Intuition in messbare Evidenz verwandelt.

---

## Häufige Einzelhandels-Sortimentsprobleme, die dies löst

| Problem                        | Ohne dieses Tool                                                          | Mit diesem Tool                                                 |
| ------------------------------ | -------------------------------------------------------------------------- | -------------------------------------------------------------- |
| SKU-Proliferation              | Produktzahlen steigen ohne Sichtbarkeit der Beitragskonzentration | Erforderliche SKU-Zahl für 60 %/80 %/90 % Umsatz wird sichtbar |
| Anhäufung toter Lagerbestände    | Bestand bleibt in aggregierten Berichten verborgen                          | SKUs mit Null-Verkäufen aber Bestand werden automatisch isoliert |
| Schlechte Sortimentsentscheidungen      | SKU-Eliminierung beruht auf Intuition                                        | SKU-Entfernungsentscheidungen werden evidenzbasiert |
| Preisband-Verzerrung      | Hochpreisige Produkte verdecken die Sortimentseffizienz                          | Konzentrationsanalyse wird preisbandspezifisch |
| Inkonsistenz des Filialsortiments | Filialen nutzen unterschiedliche SKU-Mixes ohne Messung                     | Sortimentseffizienz auf Filialebene wird vergleichbar |
| Langsame Kategoriereviews         | Manuelle Sortierung und kumulative Berechnungen dauern Stunden                      | Analyse aktualisiert sich automatisch nach Datenimport |

---

## Für wen dies ist

Dieses Tool wurde entwickelt für:

* Einzelhandels-Kategoriemanager, verantwortlich für Sortimentsoptimierung.
* Warenplaner, die SKU-Produktivität analysieren.
* Filialbetriebsteams, die Lagereffizienz überprüfen.
* Einzelhandelsanalysten, die Pareto- und Long-Tail-Analysen durchführen.
* Berater, die Sortimentsrationalisierungsprojekte leiten.
* Power BI-Benutzer, die eine lokale Diagnose-Sandbox benötigen.

Dieses Tool wurde **nicht** entwickelt für:

* Data Warehousing auf Unternehmensebene.
* Vollständigen Ersatz des Einzelhandels-ERP.
* Kontinuierliche Echtzeit-Berichtssysteme.
* Historische Analysen mit Milliarden von Zeilen.

Keine Tabellenkalkulations-Expertise erforderlich. Öffnen Sie die Browser-Version oder fügen Sie exportierte Daten in Excel ein und beginnen Sie sofort mit der Analyse.

---

## Über mich

Ich baue leichte Entscheidungsunterstützungs-Tools für Situationen, in denen zu viele bewegliche Teile vorhanden sind, um sie alle im Kopf zu behalten.

Die zentrale Frage hinter diesen Tools ist immer:

> **"What information needs to exist in one place to make the next decision confidently?"**

Dieses SKU-Konzentrationsanalyse-Tool ist ein Beispiel für diesen Ansatz: die Umwandlung eines wiederkehrenden Geschäftsanalyseproblems in ein wiederverwendbares operatives Entscheidungs-Framework anstatt eines weiteren statischen Berichts.

---

## Technische Details

<details>
<summary>Für technische Prüfer, Excel-Praktiker und Mitarbeiter</summary>

### Arbeitsmappen-Architektur

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

| Arbeitsblatt          | Zweck                             |
| ------------------ | ----------------------------------- |
| Readme & Config    | Parameter, Schwellen, Preisbänder |
| Raw_Data_Paste     | Benutzereingabedaten                     |
| Calculation_Engine | Dynamische Berechnungsschicht           |
| Dashboard          | Interaktive Entscheidungsschnittstelle      |

---

### Drei Fallen, die selbst erfahrene Kategoriemanager fangen

#### Falle 1: Alle SKUs zählen statt aktive SKUs

**Getroffene Entscheidung:**
Eine Kategorie mit 120 SKUs gilt als überassortiert.

**Versteckter Fehler:**
Inaktive SKUs wurden in den Nenner aufgenommen.

| Kennzahl            | Falsch | Richtig |
| ----------------- | --------- | ------- |
| Gesamte SKU-Zahl   | 120       | 73      |
| Aktive SKU-Zahl  | ignoriert   | 73      |
| SKU-Konzentration | 15%       | 25%     |

**Warum das Reasoning scheitert:**
Produkte mit null Verkäufen und null Bestand haben keine operative Relevanz.

**Korrekter Ansatz:**
Klassifizieren Sie SKUs nur dann als aktiv, wenn:

```text
Sales > 0 OR Inventory > 0
```

<details>
<summary>Formelreferenz</summary>

```excel
=IF(OR(Sell_Qty>0,Stock_Qty>0),1,0)
```

</details>

---

#### Falle 2: Kategorieleistung ohne Sortierung des Beitrags messen

**Getroffene Entscheidung:**
Alle SKUs tragen gleichermaßen zum Sortimentswert bei.

**Versteckter Fehler:**
Es wurde keine kumulative Beitragsanalyse durchgeführt.

| SKU    | Umsatz | Kumuliert % |
| ------ | ----- | ------------ |
| SKU-01 | 30000 | 32%          |
| SKU-02 | 18000 | 51%          |
| SKU-03 | 14000 | 66%          |
| SKU-04 | 12000 | 79%          |

**Warum das Reasoning scheitert:**
Umsatzkonzentration ist nichtlinear.

**Korrekter Ansatz:**
Vor kumulativer Berechnung absteigend sortieren.

<details>
<summary>Formelreferenz</summary>

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

#### Falle 3: Long-Tail-Produkte ohne Lageranalyse entfernen

**Getroffene Entscheidung:**
Alle gering verkaufenden Produkte sollten entfernt werden.

**Versteckter Fehler:**
Die Lagerexposition wurde ignoriert.

| SKU | Umsatz | Bestand | Empfehlung |
| --- | ----- | --------- | -------------- |
| A   | 0     | 250       | Abverkauf      |
| B   | 0     | 0         | Entfernen         |
| C   | 12    | 420       | Aktion      |
| D   | 4     | 0         | Beobachten        |

**Warum das Reasoning scheitert:**
Die Lagerkosten bestimmen die Handlungspriorität.

**Korrekter Ansatz:**
Beitragsanalyse mit Lagerexposition kombinieren.

<details>
<summary>Formelreferenz</summary>

```excel
=IF(
 AND(Sales=0,Inventory>0),
 "Clearance Candidate",
 ""
)
```

</details>

---

### Beispielszenario

Eine Einzelhandelskette betreibt:

* 300 Filialen
* 800 Produktkategorien
* 4 Preisbänder
* Ungefähr 16.000 aktive SKUs

Die Körperpflegekategorie einer Filiale enthält:

| Kennzahl          | Wert    |
| --------------- | -------- |
| Verfügbare SKUs  | 84       |
| Wochenumsatz    | $52.400  |
| Lagerwert | $137.000 |

Nach Rangordnung aller SKUs nach Umsatzbeitrag:

| Schwelle  | Erforderliche SKU-Zahl |
| ---------- | ------------------ |
| 60 % Umsatz  | 7                  |
| 80 % Umsatz  | 15                 |
| 90 % Umsatz  | 26                 |
| 100 % Umsatz | 84                 |

Weitere Analyse identifiziert:

* 21 SKUs mit Bestand, aber null Verkäufen.
* 33 SKUs, die zusammen weniger als 2 % des Umsatzes beitragen.
* Premium-Preisbänder, die nur 8 % des Umsatzes, aber 34 % der Lagerinvestition ausmachen.

Empfehlung:

1. 21 tote Lager-SKUs entfernen.
2. 18 Long-Tail-Varianten konsolidieren.
3. Regalfläche an Top-Performer umverteilen.
4. Premium-Sortimentsstrategie neu gestalten.

Erwartete Auswirkung:

* Reduzierter Betriebskapitalbedarf.
* Verbesserter Lagerumschlag.
* Erhöhte Regalproduktivität.
* Schnellere Kategoriereview-Zyklen.

---

### Formelreferenz

<details>
<summary>Verfügbarkeitsvalidierung</summary>

```excel
=IF(OR(Sell_Qty>0,Stock_Qty>0),1,0)
```

</details>

<details>
<summary>Dynamische Filterung</summary>

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
<summary>Sortierung</summary>

```excel
=SORT(Data,Sales_Column,-1)
```

</details>

<details>
<summary>Kumulierter Beitrag</summary>

```excel
=SCAN(
 0,
 SortedSales,
 LAMBDA(a,b,a+b)
)
```

</details>

<details>
<summary>Schwellenerkennung</summary>

```excel
=MATCH(
 TRUE,
 CumulativePct>=0.8,
 0
)
```

</details>

---

### Validierungsregeln

| Feld        | Regel                 | Fehlerverhalten           |
| ------------ | -------------------- | ------------------------ |
| Week         | Erforderlich             | Berechnung ablehnen       |
| Store_ID     | Erforderlich             | Zeile ausschließen      |
| Group_ID     | Erforderlich             | Zeile ausschließen      |
| SKU_ID       | Erforderlich             | Zeile ausschließen      |
| Price        | >=0                  | Validierungswarnung       |
| Sell_Qty     | >=0                  | Validierungswarnung       |
| Stock_Qty    | >=0                  | Validierungswarnung       |
| Price Band   | Muss in Config existieren | Klassifikationsfehler     |
| Availability | Sell>0 OR Stock>0    | Aus Nenner ausschließen |

</details>

---

## Weitere Tools dieser Serie

* **Inventory Planning & Replenishment Sandbox** — Nachbestellzeitpunkt und Lagerinvestition optimieren.
* **DTC Fashion Inventory Governance Console** — Long-Tail-Sortimentsrisiko über Kanäle verwalten.
* **Cross-Border VAT Compliance Dashboard** — Monatliche VAT-Berechnungsworkflows standardisieren.
* **Marketing Attribution Audit Framework** — Irreführende ROI-Messannahmen identifizieren.

Weitere Tools: *GitHub-Profil / [Website](https://www.theseusworkshop.com/)*

---

## License

Dieses Projekt ist lizenziert unter der **Apache License 2.0**.

Siehe die LICENSE-Datei für Details.
